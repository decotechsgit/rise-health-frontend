"use client";
import React, { useState, useRef, useMemo } from "react";

const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const ReadonlyDatePicker = ({
  selectedDates = [],
}: {
  selectedDates: string[];
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  const datePickerRef = useRef<HTMLDivElement>(null);

  const selectedSet = useMemo(() => {
    return new Set(
      selectedDates?.map((d) => new Date(d).toISOString().split("T")[0])
    );
  }, [selectedDates]);

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const startingDayIndex = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const goToPreviousMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="relative w-full" ref={datePickerRef}>
      <div className="absolute left-0 z-10 mt-2 w-[100%] max-w-[400px] rounded-lg border-[1px] border-[var(--color-gray-200)] bg-white p-4 shadow-lg">
        {/* Month Navigation */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={goToPreviousMonth}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            &lt;
          </button>
          <div className="text-lg font-bold text-black">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </div>
          <button
            onClick={goToNextMonth}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            &gt;
          </button>
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}

          {Array.from({ length: startingDayIndex }).map((_, index) => (
            <div key={`empty-${index}`}></div>
          ))}

          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dateKey = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day
            )
              .toISOString()
              .split("T")[0];

            const isSelected = selectedSet.has(dateKey);
            const isToday =
              day === today.getDate() &&
              currentDate.getMonth() === today.getMonth() &&
              currentDate.getFullYear() === today.getFullYear();

            return (
              <div
                key={day}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-gray-400 ${isSelected ? "bg-orange-400 text-white" : ""} ${!isSelected && isToday ? "border border-orange-400" : ""}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReadonlyDatePicker;
