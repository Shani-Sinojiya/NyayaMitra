import { WEB_APP_NAME } from "@/constants/web";
import { Metadata } from "next";
import Header from "@/app/header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Fragment } from "react";
import { LawyerCard } from "./LawyerCard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export type Lawyer = {
  row_number: number;
  "Full Name": string;
  Specialization: string;
  Location: string;
  "Contact No": number;
  Email: string;
  "Winning Cases (Highlights)": string;
  "Profile Pic URL": string;
  "Available Days/Time": string;
};

export type LawyerList = Array<Lawyer>;

const getLawyers = async (): Promise<LawyerList> => {
  const res = await fetch(`${process.env.API_URL}/lawyers`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch lawyers");
  }

  return await res.json();
};

const Page = async () => {
  const session = await auth();
  
  if (!session) {
    return redirect("/login?callbackUrl=/lawyers");
  }

  const lawyers = await getLawyers();

  return (
    <Fragment>
      <Header title="Lawyer Directory" />
      <ScrollArea className="sm:p-6 p-2 h-[calc(100vh-48px)] sm:h-[calc(100vh-56px)] w-full overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {lawyers.map((lawyer) => (
            <LawyerCard key={lawyer.row_number} lawyer={lawyer} />
          ))}
        </div>
      </ScrollArea>
    </Fragment>
  );
};

export default Page;

export const metadata: Metadata = {
  title: `Lawyers | ${WEB_APP_NAME}`,
  description: "Find legal professionals to assist with your case.",
};
