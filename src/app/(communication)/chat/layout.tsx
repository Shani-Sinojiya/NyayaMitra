import { WEB_APP_NAME } from "@/constants/web";
import { Metadata } from "next/types";
import { Fragment, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Chat | " + WEB_APP_NAME,
  description:
    "Start a new chat with our AI assistant to get answers to your questions, brainstorm ideas, or just have a conversation.",
};

export default function Layout({ children }: PropsWithChildren) {
  return <Fragment>{children}</Fragment>;
}
