import { ApiExplorer } from "@/components/api-explorer";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-5xl w-full">
            <ApiExplorer />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
