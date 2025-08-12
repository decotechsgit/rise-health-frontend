"use client";
import React, { useState, useEffect, useRef } from "react";

import { altform } from "@/app/fonts/altform";
import TextElement from "@components/shared/typography/TextElement.typo";
import moment from "moment";

const CalendarIcon = () => (
  <svg
    className="h-5 w-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    ></path>
  </svg>
);

const StyledDatePicker = ({
  onDateSelect,
  value,
}: {
  onDateSelect: (date: Date) => void;
  value?: Date | null;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) setSelectedDate(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const today = new Date();

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

  const handleDateClick = (day: number) => {
    const newSelectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(newSelectedDate);
    onDateSelect(newSelectedDate);
    setIsOpen(false);
  };

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
      <label>
        <TextElement as="span" className={`${altform.className}`}>
          Date
        </TextElement>
        <div className="relative">
          <input
            type="text"
            readOnly
            value={moment(selectedDate).format("YYYY-MM-DD")}
            onClick={() => setIsOpen(!isOpen)}
            className="mx-auto h-[65px] w-full cursor-pointer rounded-lg border border-[#525558] px-4"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <CalendarIcon />
          </div>
        </div>
      </label>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-[100%] max-w-[320px] rounded-lg bg-white p-4 shadow-lg">
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
              const isSelected =
                selectedDate &&
                day === selectedDate.getDate() &&
                currentDate.getMonth() === selectedDate.getMonth() &&
                currentDate.getFullYear() === selectedDate.getFullYear();

              const isToday =
                day === today.getDate() &&
                currentDate.getMonth() === today.getMonth() &&
                currentDate.getFullYear() === today.getFullYear();

              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-black ${isSelected ? "bg-orange-400 text-white" : ""} ${!isSelected && isToday ? "border border-orange-400" : ""} ${!isSelected && !isToday ? "hover:bg-gray-100" : ""} `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default StyledDatePicker;
