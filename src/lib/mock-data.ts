import type { Post } from "@/types/post";
import type { SlotTemplate } from "@/types/slot-template";

export const mockSlotTemplates: SlotTemplate[] = [
  {
    id: 1,
    timeOfDay: "09:00",
    label: "Morning",
    sortOrder: 0,
  },
  {
    id: 2,
    timeOfDay: "20:00",
    label: "Evening",
    sortOrder: 1,
  },
];

export const mockPosts: Post[] = [
  {
    id: 1,
    chatId: 429976711,
    text: "Good morning! Here's today's first update.",
    scheduledAtUtc: "2026-07-23T06:00:00Z", // 09:00 local
    hangfireJobId: null,
    isSent: false,
  },
  {
    id: 67,
    chatId: 429976711,
    text: "second Good morning! Here's today's first update.",
    scheduledAtUtc: "2026-07-23T06:00:00Z", // 09:00 local
    hangfireJobId: null,
    isSent: false,
  },
  {
    id: 20,
    chatId: 429976711,
    text: "Good morning! Here's today's first update.",
    scheduledAtUtc: "2026-07-23T17:00:00Z", // 20:00 local
    hangfireJobId: null,
    isSent: false,
  },
  {
    id: 22,
    chatId: 429976711,
    text: "eqwewqewqewqewqewqewqe morning! Here's today's first update.",
    scheduledAtUtc: "2026-07-23T19:00:00Z", // 20:00 local
    hangfireJobId: null,
    isSent: false,
  },
  {
    id: 2,
    chatId: 429976711,
    text: "Evening news roundup is now available.",
    scheduledAtUtc: "2026-07-25T17:00:00Z", // 20:00 local
    hangfireJobId: null,
    isSent: false,
  },
  {
    id: 3,
    chatId: 429976711,
    text: "Don't forget to join today's livestream.",
    scheduledAtUtc: "2026-07-27T06:00:00Z", // 09:00 local
    hangfireJobId: null,
    isSent: false,
  },
  {
    id: 4,
    chatId: 429976711,
    text: "Unexpected maintenance announcement.",
    scheduledAtUtc: "2026-07-29T17:00:00Z", // 20:00 local
    hangfireJobId: null,
    isSent: false,
  },
  {
    id: 5,
    chatId: 429976711,
    text: "Special event starts in one hour!",
    scheduledAtUtc: "2026-07-31T06:00:00Z", // 09:00 local
    hangfireJobId: null,
    isSent: false,
  },
  {
    id: 6,
    chatId: 429976711,
    text: "Weekly digest is ready to read.",
    scheduledAtUtc: "2026-08-02T17:00:00Z", // 20:00 local
    hangfireJobId: null,
    isSent: false,
  },
  {
    id: 7,
    chatId: 429976711,
    text: "New feature has just been released.",
    scheduledAtUtc: "2026-08-04T06:00:00Z", // 09:00 local
    hangfireJobId: null,
    isSent: false,
  },
  {
    id: 8,
    chatId: 429976711,
    text: "Reminder: check out the latest article.",
    scheduledAtUtc: "2026-08-06T17:00:00Z", // 20:00 local
    hangfireJobId: null,
    isSent: false,
  },
  {
    id: 9,
    chatId: 429976711,
    text: "Community Q&A starts in 30 minutes.",
    scheduledAtUtc: "2026-08-09T06:00:00Z", // 09:00 local
    hangfireJobId: null,
    isSent: false,
  },
  {
    id: 10,
    chatId: 429976711,
    text: "Thank you for staying with us! More updates coming soon.",
    scheduledAtUtc: "2026-08-12T17:00:00Z", // 20:00 local
    hangfireJobId: null,
    isSent: false,
  },
];
