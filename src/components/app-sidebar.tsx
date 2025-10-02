"use client";

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
import { Network } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function AppSidebar() {
  const { t } = useLanguage();
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
            <SidebarMenuButton isActive tooltip={t('api_reference')}>
              <Network />
              <span>{t('api_reference')}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  );
}
