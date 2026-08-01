import { Post } from "@/types/post";
import * as MockData from "@/lib/mock-data";

export async function getPosts(from: string, to: string): Promise<Post[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts?from=${from}&to=${to}`,
    {
      next: {
        tags: ["posts"],
      },
    },
  );

  return res.json();
}

export function getMockPosts(): Map<string, Map<string, Post[]>> {
  return groupPostsByDay(MockData.mockPosts);
}

export function groupPostsByDay(
  posts: Post[],
): Map<string, Map<string, Post[]>> {
  const result = new Map<string, Map<string, Post[]>>();

  for (const post of posts) {
    const date = new Date(post.scheduledAtUtc);

    const dayKey = date.toISOString().slice(0, 10);
    const timeKey = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

    if (!result.has(dayKey)) {
      result.set(dayKey, new Map());
    }

    const dayMap = result.get(dayKey)!;

    if (!dayMap.has(timeKey)) {
      dayMap.set(timeKey, []);
    }

    dayMap.get(timeKey)!.push(post);
  }

  return result;
}

export function getTwoWeeksFromMonday(): Date[] {
  const today = new Date();
  const monday = new Date(today);

  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  monday.setDate(today.getDate() + diff);

  const days: Date[] = [];

  for (let i = 0; i < 14; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    days.push(date);
  }

  return days;
}

export function getDayKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function getPostsForDay(post: Post[], day: Date): Post[] {
  const postsForThisDay: Post[] = [];

  for (let i = 0; i < post.length; i++) {
    const date = new Date(post[i].scheduledAtUtc);
    if (isSameDay(date, day)) {
      postsForThisDay.push(post[i]);
    }
  }
  return postsForThisDay;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function groupPosts(posts: Post[]) {
  const map = new Map<string, Map<string, Post[]>>();

  for (const post of posts) {
    const date = new Date(post.scheduledAtUtc);

    const dayKey = getDayKey(date);

    const timeKey = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes(),
    ).padStart(2, "0")}`;

    if (!map.has(dayKey)) {
      map.set(dayKey, new Map());
    }

    const dayMap = map.get(dayKey)!;

    if (!dayMap.has(timeKey)) {
      dayMap.set(timeKey, []);
    }

    dayMap.get(timeKey)!.push(post);
  }

  return map;
}

export function utcToLocalInput(utc: string): string {
  if (!utc) return "";

  const date = new Date(utc);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function localInputToUtc(date: Date): string {
  return date.toISOString();
}
