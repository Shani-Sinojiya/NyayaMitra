"use client";

import { Edit3, Mic, User } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "./logo";
import { WEB_APP_BASENAME } from "@/constants/web";
import { NavChatList } from "./nav-chatlist";
import { usePathname } from "next/navigation";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const navMain = [
    {
      title: "New Chat",
      url: "/chat/new",
      icon: Edit3,
      isActive: pathname === "/chat/new",
    },
    {
      title: "Voice Call",
      url: "/voice",
      icon: Mic,
      isActive: pathname === "/voice",
    },
    {
      title: "Lawyer Directory",
      url: "/lawyers",
      icon: User,
      isActive: pathname === "/lawyers",
    },
  ];

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-3 my-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
            <Logo className="w-8 h-8" />
          </div>
          {WEB_APP_BASENAME}
        </div>
        <NavMain items={navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavChatList />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
