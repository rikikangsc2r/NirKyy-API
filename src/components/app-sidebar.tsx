import { AppLogo } from "@/components/icons";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Network, Github } from "lucide-react";
import { Separator } from "./ui/separator";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <AppLogo className="w-8 h-8 text-primary" />
          <span className="text-xl font-semibold text-sidebar-foreground">
            NirKyy API
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive tooltip="API Reference">
              <Network />
              <span>API Reference</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
         <Separator className="my-2 bg-sidebar-border" />
         <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild variant="ghost" className="justify-start">
                    <a href="https://github.com/firebase/genkit-js" target="_blank" rel="noopener noreferrer">
                        <Github />
                        <span>GitHub</span>
                    </a>
                </SidebarMenuButton>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
