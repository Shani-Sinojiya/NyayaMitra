import { Metadata } from "next/types";
import React, { Fragment, PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return <Fragment>{children}</Fragment>;
};

export default Layout;

export const metadata: Metadata = {
  title: "NyayaMitra - Disclaimer",
  description:
    "Understand the legal disclaimers associated with NyayaMitra's services.",
};
