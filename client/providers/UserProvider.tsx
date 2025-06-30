"use client";
import React from "react";
import { UserContextProvider } from "../context/userContext";
import { SnippetsProvider } from "../context/SnippetsContext";

interface Props {
  children: React.ReactNode;
}

function UserProvider({ children }: Props) {
  return <UserContextProvider>
    <SnippetsProvider>
      {children}
    </SnippetsProvider>
  </UserContextProvider>;
}

export default UserProvider;
