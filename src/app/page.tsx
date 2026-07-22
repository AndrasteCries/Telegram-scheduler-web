import { CalendarGrid } from "@/components/CalendarGrid";

export default async function TestPage() {
  //todo cache using with tags 
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
  //   cache: "no-store",
  // });

  // const posts: Post[] = await res.json();

  return (
    <div>
      <CalendarGrid key="calendar-grid"></CalendarGrid>
    </div>
  );
}