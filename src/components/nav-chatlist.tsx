"use client";

import {
  ArrowUpRight,
  MoreHorizontal,
  StarOff,
  Trash2,
  Link as LinkIcon,
  Plus,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "./ui/button";
import useSWR from "swr";

type ChatSummary = {
  _id: string;
  title: string;
  chatid: string;
};

export function NavChatList() {
  const { isMobile } = useSidebar();

  const { data, isLoading, error } = useSWR(
    "/api/chats",
    (url): Promise<ChatSummary[] | undefined> =>
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch chats: ${res.statusText}`);
          }
          return res.json();
        })
        .catch((error) => {
          console.error("Error fetching chats:", error);
          return { error: error.message || "Failed to load chats" };
        }),
    { refreshInterval: 1000 }
  );

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <div className="flex items-center justify-between px-2 mb-2">
        <SidebarGroupLabel>Chats</SidebarGroupLabel>
        <Button asChild variant="ghost" size="sm" className="h-7 w-7 p-0">
          <Link href="/chat/new">
            <Plus className="h-4 w-4" />
            <span className="sr-only">New Chat</span>
          </Link>
        </Button>
      </div>

      <SidebarMenu>
        {isLoading ? (
          <div className="px-3 py-2 text-sm text-gray-500">
            Loading chats...
          </div>
        ) : error ? (
          <div className="px-3 py-2 text-sm text-red-500">{error}</div>
        ) : data && data.length === 0 ? (
          <div className="px-3 py-2 text-sm text-gray-500">No chats found</div>
        ) : (
          data?.map((chat, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild>
                <Link href={`/chat/${chat.chatid}`}>
                  <span className="truncate">{chat.title}</span>
                </Link>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <StarOff className="text-muted-foreground" />
                    <span>Add to Favorites</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LinkIcon className="text-muted-foreground" />
                    <span>Copy Link</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ArrowUpRight className="text-muted-foreground" />
                    <span>Open in New Tab</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2 className="text-muted-foreground" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
