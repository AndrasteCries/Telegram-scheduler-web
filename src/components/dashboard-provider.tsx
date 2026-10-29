"use client";
import {DashboardContext} from "./dashboard-context";
import {useDashboard} from "@/hooks/use-dashboard";


export function DashboardProvider({ children }: {
    children: React.ReactNode;
}) {
    const dashboard = useDashboard();
    return (
        <DashboardContext.Provider value={dashboard}>
                {children}
        </DashboardContext.Provider>
    );
}
