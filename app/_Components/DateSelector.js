"use client";
import {
  differenceInCalendarDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to }),
    )
  );
}

function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();
  const { regularPrice, discount } = cabin;
  const blockedDates = bookedDates ?? [];

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;
  const numNights =
    range?.from && range?.to
      ? differenceInCalendarDays(range.to, range.from)
      : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  function handleSelect(nextRange) {
    if (!nextRange) {
      resetRange();
      return;
    }

    if (isAlreadyBooked(nextRange, blockedDates)) {
      resetRange();
      return;
    }

    setRange(nextRange);
  }

  return (
    <div className="flex min-w-0 flex-col justify-between border-r border-primary-800">
      <div className="overflow-hidden px-3 py-6">
        <DayPicker
          className="reservation-picker mx-auto"
          mode="range"
          selected={range}
          onSelect={handleSelect}
          min={minBookingLength + 1}
          max={maxBookingLength}
          fromMonth={new Date()}
          fromDate={new Date()}
          toYear={new Date().getFullYear() + 5}
          captionLayout="dropdown"
          numberOfMonths={2}
          disabled={(date) =>
            isPast(date) ||
            blockedDates.some((bookedDate) => isSameDay(bookedDate, date))
          }
          excludeDisabled
        />
      </div>

      <div className="flex min-h-[72px] flex-wrap items-center justify-between gap-3 px-5 py-3 bg-accent-500 text-primary-800">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            type="button"
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
