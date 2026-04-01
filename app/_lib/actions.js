"use server";
import { revalidatePath } from "next/cache";
import { differenceInCalendarDays } from "date-fns";
import { auth, signIn, signOut } from "./auth";
import { createBooking, getBookings, getCabin, getGuest } from "./data-service";
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

export async function deleteReservation(bookingId) {
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
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guest = await getGuest(session.user.email);
  if (!guest) throw new Error("Guest record not found");

  const cabinId = Number(formData.get("cabinId"));
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations")?.slice(0, 1000) ?? "";

  if (!cabinId || !startDate || !endDate || !numGuests) {
    throw new Error("Missing reservation details");
  }

  const cabin = await getCabin(cabinId);
  const numNights = differenceInCalendarDays(
    new Date(endDate),
    new Date(startDate),
  );
  const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);

  if (numNights <= 0) throw new Error("Please select a valid date range");

  await createBooking({
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice: 0,
    totalPrice: cabinPrice,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
    observations,
    guestId: guest.id,
    cabinId,
  });

  revalidatePath(`/cabins/${cabinId}`);
  revalidatePath("/account/reservations");
}
