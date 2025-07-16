import { LandingPage } from "@/components/landing/landing-page";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "NyayaMitra - Get Legal Help in Your Language",
  description: "Access legal assistance in your language with NyayaMitra.",
};

const Page = () => {
  return <LandingPage />;
};

export default Page;
