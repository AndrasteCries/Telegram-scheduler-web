import {CalendarGrid} from "./caldendar-grid";

export async function Dashboard() {
    return (
        <div className="flex-1 min-w-0 h-screen">
            <section className="flex-1 overflow-auto">
                <CalendarGrid/>
            </section>
        </div>
    );
}
