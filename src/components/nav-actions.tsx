"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut } from "lucide-react";
import Link from "next/link";

export function NavActions() {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 text-sm">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button className="h-8 w-8 rounded-full p-0 cursor-pointer">
            <Avatar>
              {session?.data?.user?.image ? (
                <AvatarImage src={session.data.user.image} />
              ) : null}
              <AvatarFallback className="bg-muted text-muted-foreground">
                {session.data?.user?.name
                  ? session.data.user.name.charAt(0).toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-48"
          side="bottom"
          align="end"
          sideOffset={8}
        >
          <div className="w-48 rounded-md border bg-popover p-1 shadow-md grid grid-cols-1 gap-1">
            <Button
              variant={"ghost"}
              className="justify-start text-red-500 hover:bg-red-200 hover:text-red-800 cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <LogOut /> Sign Out
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
