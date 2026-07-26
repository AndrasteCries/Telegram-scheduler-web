import { Post } from "@/types/post";
import { PostCard } from "./PostCard";
import { mockSlotTemplates } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "./ui/separator";

type DayCardProps = {
  day: Date;
  posts: Map<string, Post[]>;
};

export function DayCard({ day, posts }: DayCardProps) {
  const templates = mockSlotTemplates;

  const slotTimes = new Set(templates.map((t) => t.timeOfDay));

  const unslottedEntries = [...posts.entries()].filter(
    ([time]) => !slotTimes.has(time),
  );

  return (
    <div>
      <Card className="[--card-spacing:8px] py-0 pb-3 bg-zinc-900 rounded-sm">
        <CardHeader className="[--card-spacing:8px] bg-red-900  rounded-t-sm">
          <CardTitle className="p-2">
            <p>
              {day.getDate()}.{day.getMonth()}
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {templates.map((template) => {
            const postSlots = posts.get(template.timeOfDay);
            return (
              <div key={template.id} className="flex flex-col gap-1">
                <p>{template.timeOfDay}</p>
                {postSlots ? (
                  postSlots.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <div className="flex h-10 w-full items-center justify-center rounded border border-dashed border-gray-700 text-gray-600 hover:border-gray-500 hover:text-gray-400">
                    +
                  </div>
                )}
              </div>
            );
          })}
          {unslottedEntries.length === 0 ? null : (
            <>
              <Separator className={"mb-2"} />
              <CardTitle className="mb-2">Unplanned posts</CardTitle>
            </>
          )}
          {unslottedEntries?.map(([time, posts]) => (
            <div key={time}>
              <p>{time}</p>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
