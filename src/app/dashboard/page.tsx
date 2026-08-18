import { Dashboard } from "@/components/dashboard";
import { DashboardProvider } from "@/components/dashboard-provider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getDaysRange, getPosts } from "@/lib/calendar-utils";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@base-ui/react";
import { SidebarLeft } from "@/components/sidebar/sidebar-left";
import { SidebarRight } from "@/components/sidebar/sidebar-right";
import { getMockTemplates } from "@/lib/mock-data";

export default async function Workspace() {
  const today = new Date();
  const slotTemplates = getMockTemplates();

  const end = new Date(today);
  end.setDate(end.getDate() + 13);

  const { from, to } = getDaysRange(today, end);

  const posts = await getPosts(from.toISOString(), to.toISOString());

  return (
    <div>
      <SidebarProvider leftSidebarWidth="16rem" rightSidebarWidth="24rem" defaultOpen={false}>
        <DashboardProvider slotTemplates={slotTemplates} initialPosts={posts}>
          <SidebarLeft />
          <SidebarInset>
            <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
              <div className="flex flex-1 items-center gap-2 px-3">
                <SidebarTrigger />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="line-clamp-1">
                        Scheduler
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>

            <Dashboard key={"dashboard"} />
        
          </SidebarInset>
          <SidebarRight />
        </DashboardProvider>
      </SidebarProvider>
    </div>
  );
}
