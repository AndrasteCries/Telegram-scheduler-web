"use client";

import { getTwoWeeksFromMonday } from "@/lib/calendar-utils";
import * as CalendarConstants from "@/constants/calendar";
import { getMockPosts } from "@/lib/calendar-utils";
import { getDayKey } from "@/lib/calendar-utils";
import { DayCard } from "./DayCard";
import { Post } from "@/types/post";

export function CalendarGrid() {
  const calendarDays = CalendarConstants.WEEKDAY_LABELS;
  const days = getTwoWeeksFromMonday();
  const calendarPosts = getMockPosts();

  return (
    <div className="grid grid-cols-7 gap-2">
      {calendarDays.map((day) => (
        <div
          key={day.toString()}
          className="border border-gray-700 p-3 text-white"
        >
          {day}
        </div>
      ))}

      {days.map((day) => {
        const dayKey = getDayKey(day);

        return (
          <DayCard
            key={day.toISOString()}
            day={day}
            posts={calendarPosts.get(dayKey) ?? new Map<string, Post[]>()}
          />
        );
      })}
    </div>
  );
}
