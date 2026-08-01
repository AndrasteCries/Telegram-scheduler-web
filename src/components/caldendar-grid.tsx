"use client";

import { getTwoWeeksFromMonday, groupPosts, getDayKey } from "@/lib/calendar-utils";
import * as CalendarConstants from "@/constants/calendar";
import { DayCard } from "./day-card";
import { Post } from "@/types/post";
import { CardHeader } from "@/components/ui/card";
import { useDashboard } from "@/hooks/use-dashboard";

export function CalendarGrid() {
  const { posts } = useDashboard();
  const calendarDays = CalendarConstants.WEEKDAY_LABELS;
  const days = getTwoWeeksFromMonday();
  const calendarPosts = groupPosts(posts);

  return (
    <div className="grid grid-cols-7 gap-2 p-2 pt-5">
      {calendarDays.map((day) => (
        <CardHeader className="ml-3" key={day.toString()}>
          {day}
        </CardHeader>
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
