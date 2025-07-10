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
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

type ChatSummary = {
  id: string;
  title: string;
  lastMessage: string;
  createdAt: Date;
  updatedAt: Date;
};

export function NavChatList() {
  const { isMobile } = useSidebar();
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/chats");

        if (!response.ok) {
          throw new Error(`Failed to fetch chats: ${response.statusText}`);
        }

        const data = await response.json();
        setChats(data);
      } catch (err) {
        console.error("Error fetching chats:", err);
        setError(err instanceof Error ? err.message : "Failed to load chats");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
  }, []);

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
        ) : chats.length === 0 ? (
          <div className="px-3 py-2 text-sm text-gray-500">No chats found</div>
        ) : (
          chats.map((chat) => (
            <SidebarMenuItem key={chat.id}>
              <SidebarMenuButton asChild>
                <Link href={`/chat/${chat.id}`}>
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
