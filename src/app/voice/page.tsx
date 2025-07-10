import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import VoiceUI from "./VoiceUI";

const Page = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/login?callbackUrl=/voice");
  }

  return <VoiceUI />;
};

export default Page;
