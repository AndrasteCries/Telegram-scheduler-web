import {Post} from "@/entities/post";
import {PostCard} from "./post-card";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "../ui/separator";
import {SlotPlaceholder} from "@/components/postCalendar/slot-placeholder";
import {useDashboardContext} from "@/hooks/use-dashboard-context";

type DayCardProps = {
    day: Date;
    posts: Map<string, Post[]>;
};

function normalizeTime(time: string): string {
    return time.slice(0, 5);
}

export function DayCard({day, posts}: DayCardProps) {
    const {templates} = useDashboardContext();

    const slotTimes = new Set(
        templates.map((t) => normalizeTime(t.timeOfDay))
    );

    const unslottedEntries = [...posts.entries()].filter(
        ([time]) => !slotTimes.has(normalizeTime(time))
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
                        const normalizedTemplateTime = normalizeTime(template.timeOfDay);
                        const postSlots = [...posts.entries()]
                            .find(([time]) => normalizeTime(time) === normalizedTemplateTime)?.[1];
                        return (
                            <div key={template.id} className="flex flex-col gap-1">
                                <p>{template.timeOfDay}</p>
                                {postSlots ? (
                                    postSlots.map((post) => (
                                        <PostCard key={post.id} post={post}/>
                                    ))
                                ) : (
                                    <SlotPlaceholder day={day} timeOfDay={template.timeOfDay}/>
                                )}
                            </div>
                        );
                    })}
                    {unslottedEntries.length === 0 ? null : (
                        <>
                            <Separator className={"mb-2"}/>
                            <CardTitle className="mb-2">Unplanned posts</CardTitle>
                                {unslottedEntries?.map(([time, posts]) => (
                                <div key={time}>
                                    <p>{time}</p>
                                    {posts.map((post) => (
                                        <PostCard key={post.id} post={post}/>
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
