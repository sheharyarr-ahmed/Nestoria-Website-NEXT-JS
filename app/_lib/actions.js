"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { differenceInCalendarDays } from "date-fns";
import { auth, signIn, signOut } from "./auth";
import { getBookings, getCabin, getGuest } from "./data-service";
import { supabase } from "./supabase";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");
  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    // console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guest = await getGuest(session.user.email);
  if (!guest) throw new Error("Guest record not found");

  const cabin = await getCabin(bookingData.cabinId);
  const numNights = differenceInCalendarDays(
    new Date(bookingData.endDate),
    new Date(bookingData.startDate),
  );
  const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);

  if (numNights <= 0) throw new Error("Please select a valid date range");

  const newBooking = {
    ...bookingData,
    guestId: guest.id,
    numNights,
    cabinPrice,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000) ?? "",
    extrasPrice: 0,
    totalPrice: cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  console.log("bookingData", newBooking);

  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  revalidatePath("/account/reservations");

  const searchParams = new URLSearchParams({
    reservationId: String(data.id),
    cabin: `Cabin ${cabin.name}`,
    startDate: bookingData.startDate,
    endDate: bookingData.endDate,
    numGuests: String(newBooking.numGuests),
    totalPrice: String(newBooking.totalPrice),
  });

  redirect(`/thank-you?${searchParams.toString()}`);
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function createReservation(formData) {
  const cabinId = Number(formData.get("cabinId"));
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");

  if (!cabinId || !startDate || !endDate) {
    throw new Error("Missing reservation details");
  }

  const bookingData = {
    startDate,
    endDate,
    cabinId,
  };

  await createBooking(bookingData, formData);
}
