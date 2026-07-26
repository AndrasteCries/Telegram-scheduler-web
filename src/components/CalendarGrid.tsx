"use client";

import { getTwoWeeksFromMonday } from "@/lib/calendar-utils";
import * as CalendarConstants from "@/constants/calendar";
import { getMockPosts } from "@/lib/calendar-utils";
import { getDayKey } from "@/lib/calendar-utils";
import { DayCard } from "./DayCard";
import { Post } from "@/types/post";
import { CardHeader } from "@/components/ui/card";

export function CalendarGrid() {
  const calendarDays = CalendarConstants.WEEKDAY_LABELS;
  const days = getTwoWeeksFromMonday();
  const calendarPosts = getMockPosts();

  return (
    <div className="grid grid-cols-7 gap-2 p-2 pt-5">
      {calendarDays.map((day) => (
        <CardHeader className="ml-3" key={day.toString()}> {day}</CardHeader>
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
