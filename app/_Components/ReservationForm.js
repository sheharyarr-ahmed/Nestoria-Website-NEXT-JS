"use client";

import { differenceInCalendarDays } from "date-fns";
import { createReservation } from "../_lib/actions";
import { useReservation } from "./ReservationContext";

function ReservationForm({ cabin, user }) {
  const { range } = useReservation();
  const { maxCapacity, regularPrice, discount } = cabin;
  const numNights =
    range?.from && range?.to
      ? differenceInCalendarDays(range.to, range.from)
      : 0;
  const cabinPrice = numNights * (regularPrice - discount);
  const isDateRangeSelected = numNights > 0;

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={createReservation}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <input type="hidden" name="cabinId" value={cabin.id} />
        <input
          type="hidden"
          name="startDate"
          value={range?.from?.toISOString() ?? ""}
        />
        <input
          type="hidden"
          name="endDate"
          value={range?.to?.toISOString() ?? ""}
        />
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {isDateRangeSelected ? (
            <p className="text-primary-300 text-base">
              {numNights} night{numNights > 1 ? "s" : ""} for ${cabinPrice}
            </p>
          ) : (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          )}

          <button
            type="submit"
            disabled={!isDateRangeSelected}
            className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
          >
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
