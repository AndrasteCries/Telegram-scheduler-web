import { Post } from "@/types/post";
import { PostCard } from "./post-card";
import { mockSlotTemplates } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { SlotPlaceholder } from "./slot-placeholder";

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
        <CardContent className="flex flex-col gap-3 ">
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
                  <SlotPlaceholder day={day} timeOfDay={template.timeOfDay} />
                )}
              </div>
            );
          })}
          {unslottedEntries.length === 0 ? null : (
            <>
              <Separator className={"mb-2"} />
              <CardTitle className="mb-2">Unplanned posts</CardTitle>
              {unslottedEntries?.map(([time, posts]) => (
                <div key={time}>
                  <p>{time}</p>
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ))}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
