"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/context/language-context";

export function AppHeader() {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-xl font-semibold md:text-2xl font-headline">{t('api_reference')}</h1>
      <div className="ml-auto flex items-center gap-2">
        <LanguageSwitcher />
      </div>
    </header>
  );
}
