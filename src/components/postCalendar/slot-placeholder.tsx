import {useDashboardContext} from "@/hooks/use-dashboard-context";
import {localDateTimeToUtcIso} from "@/lib/mock-data";
import {emptyDraft} from "@/entities/post";

export function SlotPlaceholder({
                                    day,
                                    timeOfDay,
                                }: {
    day: Date;
    timeOfDay: string;
}) {
    const {setDraft} = useDashboardContext();

    function handleClick() {
        const draft = structuredClone(emptyDraft);

        const date = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;

        draft.scheduledAtUtc = localDateTimeToUtcIso(date, timeOfDay);

        setDraft(draft);
    }

    return (
        <div
            onClick={handleClick}
            className="flex h-10 w-full items-center justify-center rounded border border-dashed text-gray-600 transition-colors"
        >
            +
        </div>
    );
}