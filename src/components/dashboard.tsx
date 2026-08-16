import { CalendarGrid } from "./caldendar-grid";
import { DashboardProvider } from "@/components/dashboard-provider";
import { PostEditorPanel } from "./postEditor/post-editor-panel";
import { getDaysRange, getPosts } from "@/lib/calendar-utils";

export async function  Dashboard() {
  const today = new Date();

  const end = new Date(today);
  end.setDate(end.getDate() + 13);

  const { from, to } = getDaysRange(today, end);

  const posts = await getPosts(
    from.toISOString(),
    to.toISOString(),
  );

  return (
    <div className="flex h-screen">
      <DashboardProvider initialPosts={posts}>
        <section className="flex-1 overflow-auto">
          <CalendarGrid />
        </section>

        <aside className="w-96 border-l">
          <PostEditorPanel />
        </aside>
      </DashboardProvider>
    </div>
  );
}
