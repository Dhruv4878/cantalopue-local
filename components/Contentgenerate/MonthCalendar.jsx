"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MonthCalendar = () => {
  const [viewDate, setViewDate] = useState(dayjs());

  const firstDay = viewDate.startOf("month");
  const lastDay = viewDate.endOf("month");

  const daysInMonth = lastDay.date();
  const startWeekday = firstDay.day(); // 0-6

  const prevMonth = () => setViewDate(viewDate.subtract(1, "month"));
  const nextMonth = () => setViewDate(viewDate.add(1, "month"));

  const today = dayjs();

  let cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);

  return (
    <div className="bg-black/20 border border-white/10 rounded-2xl p-5 h-full flex flex-col">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="hover:text-orange-400 transition">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold tracking-wide">
          {viewDate.format("MMMM YYYY")}
        </h2>
        <button onClick={nextMonth} className="hover:text-orange-400 transition">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 text-center text-gray-300 text-sm mb-2">
        {weekdays.map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm flex-1">
        {cells.map((day, index) => {
          const isToday =
            day &&
            today.date() === day &&
            today.month() === viewDate.month() &&
            today.year() === viewDate.year();

          return (
            <div
              key={index}
              className={`flex justify-center items-center py-2 rounded-xl cursor-pointer transition
                ${
                  !day
                    ? ""
                    : isToday
                    ? "bg-orange-500 text-white font-semibold shadow-orange-500/40 shadow-md"
                    : "hover:bg-white/10 bg-white/5"
                }
              `}
            >
              {day ?? ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthCalendar;
