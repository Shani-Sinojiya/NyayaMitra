import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { WEB_APP_NAME } from "@/constants/web";
import { SessionProvider } from "next-auth/react";
import { Metadata } from "next/types";
import { Fragment, PropsWithChildren } from "react";
import Header from "../header";

export const metadata: Metadata = {
  title: "Voice Call | " + WEB_APP_NAME,
  description:
    "Start a new voice call with our AI assistant to get answers to your questions, brainstorm ideas, or just have a conversation.",
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Fragment>
            <Header title="Voice Call" />
            {children}
          </Fragment>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
