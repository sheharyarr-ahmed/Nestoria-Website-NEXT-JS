"use client";
import { differenceInCalendarDays, isWithinInterval } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

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
  const [range, setRange] = useState();
  const { regularPrice, discount } = cabin;

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;
  const numNights =
    range?.from && range?.to
      ? differenceInCalendarDays(range.to, range.from)
      : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  function handleSelect(nextRange) {
    if (isAlreadyBooked(nextRange, bookedDates)) {
      setRange(undefined);
      return;
    }

    setRange(nextRange);
  }

  function resetRange() {
    setRange(undefined);
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
          disabled={bookedDates}
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
