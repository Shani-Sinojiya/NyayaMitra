"use client";

import { Edit3, Mic } from "lucide-react";
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

// This is sample data.
const data = {
  navMain: [
    {
      title: "New Chat",
      url: "/chat/new",
      icon: Edit3,
    },
    {
      title: "Voice Call",
      url: "/voice",
      icon: Mic,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-3 my-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
            <Logo className="w-8 h-8" />
          </div>
          {WEB_APP_BASENAME}
        </div>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavChatList />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
