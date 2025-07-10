import { WEB_APP_NAME } from "@/constants/web";
import { Metadata } from "next/types";
import { Fragment, PropsWithChildren } from "react";
import Header from "../../header";

export const metadata: Metadata = {
  title: "Voice Call | " + WEB_APP_NAME,
  description:
    "Start a new voice call with our AI assistant to get answers to your questions, brainstorm ideas, or just have a conversation.",
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <Header title="Voice Call" />
      {children}
    </Fragment>
  );
}
