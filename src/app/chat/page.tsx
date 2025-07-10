import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/login?callbackUrl=/chat/new");
  }

  // Redirect to new chat
  return redirect("/chat/new");
};

export default Page;
