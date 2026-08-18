// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarHeader,
//   SidebarInset,
//   SidebarMenuButton,
//   SidebarRail,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Separator } from "../ui/separator";
// import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "../ui/breadcrumb";

// export function AppSidebar() {
//   return (
//     <Sidebar side="right" collapsible="icon">
//       <SidebarHeader>
//         <SidebarMenuButton
//           size="lg"
//           className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
//         >
//           <Avatar className="h-8 w-8 rounded-lg">
//             <AvatarImage src="/images/icon_logo.jpg" alt="logo" />
//             <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//           </Avatar>
//           <div className="grid flex-1 text-left text-sm leading-tight">
//             <span className="truncate font-medium">Telegram Sender</span>
//           </div>
//         </SidebarMenuButton>
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarGroup />
//         <PostEditorPanel />
//         <SidebarGroup />
//       </SidebarContent>
//       <SidebarFooter />
//       <SidebarRail />
//       <SidebarInset>
//         <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
//           <div className="flex flex-1 items-center gap-2 px-3">
//             <SidebarTrigger />
//             <Separator
//               orientation="vertical"
//               className="mr-2 data-[orientation=vertical]:h-4"
//             />
//             <Breadcrumb>
//               <BreadcrumbList>
//                 <BreadcrumbItem>
//                   <BreadcrumbPage className="line-clamp-1">
//                     Project Management & Task Tracking
//                   </BreadcrumbPage>
//                 </BreadcrumbItem>
//               </BreadcrumbList>
//             </Breadcrumb>
//           </div>
//         </header>
//         <div className="flex flex-1 flex-col gap-4 p-4">
//           <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50" />
//           <div className="mx-auto h-[100vh] w-full max-w-3xl rounded-xl bg-muted/50" />
//         </div>
//       </SidebarInset>
//     </Sidebar>
//   );
// }
