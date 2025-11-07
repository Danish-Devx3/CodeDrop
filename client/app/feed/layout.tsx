import ModalProvider from "@/providers/ModalProvider";
import Header from "../Components/Header/Header";
import ContentProvider from "@/providers/ContentProvider";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ModalProvider />
      <div className="h-full">
        <Header />
        <ContentProvider>{children}</ContentProvider>
      </div>
    </>
  );
}

export default layout;
