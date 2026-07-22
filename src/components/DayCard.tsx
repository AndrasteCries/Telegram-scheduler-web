import { Post } from "@/types/post";
import { PostCard } from "./PostCard";
import { mockSlotTemplates } from "@/lib/mock-data";

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
    <div className="border border-gray-700 p-3 text-white">
      <p>
        {day.getDate()}.{day.getMonth()}
      </p>
      {templates.map((template) => {
        const postSlots = posts.get(template.timeOfDay);

        return postSlots ? (
          <div key={template.id}>
            <p>{template.timeOfDay}</p>
            {postSlots.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div
            key={template.id}
            className="border border-dashed border-gray-600 p-2 text-center text-gray-500"
          >
            + {template.timeOfDay}
          </div>
        );
      })}
      <p> Unplanned posts </p>
      {unslottedEntries.map(([time, posts]) => (
        <div key={time}>
          <p>{time}</p>

          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ))}
    </div>
  );
}
