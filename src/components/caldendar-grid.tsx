"use client";

import {groupPosts, getDayKey, getDaysRange} from "@/lib/calendar-utils";
import * as CalendarConstants from "@/constants/calendar";
import {DayCard} from "./postCalendar/day-card";
import {Post} from "@/entities/post";
import {CardHeader} from "@/components/ui/card";
import {useDashboardContext} from "@/hooks/use-dashboard-context";

export function CalendarGrid() {
    const {posts} = useDashboardContext();
    const calendarDays = CalendarConstants.WEEKDAY_LABELS;
    const today = new Date();

    const end = new Date(today);
    end.setDate(end.getDate() + 13);

    const {days} = getDaysRange(today, end);
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
