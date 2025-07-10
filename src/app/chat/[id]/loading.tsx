import React from "react";
import Header from "../../header";
import ChatLoader from "./chat-loader";

export default function Loading() {
  return (
    <>
      <Header title="Loading..." />
      <div className="h-[calc(100vh-48px)] sm:h-[calc(100vh-56px)] w-full overflow-hidden">
        <ChatLoader />
      </div>
    </>
  );
}
