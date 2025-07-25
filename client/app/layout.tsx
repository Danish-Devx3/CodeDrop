import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserProvider from "@/providers/UserProvider";
import { Toaster } from "react-hot-toast";
import ContentProvider from "@/providers/ContentProvider";
import Header from "./Components/Header/Header";
import NextTopLoader from "nextjs-toploader";
import ModalProvider from "@/providers/ModalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeDrop || Drop your Code here",
  description: `A simple and efficient web app for
     developers to save, share, and manage code snippets.
     Paste your code, get a shareable link, and collaborate
     with ease.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.className}>
        <Toaster position="top-center" />
        <NextTopLoader showSpinner={false} color="#7263f3" height={2} />
        <UserProvider>
          <ModalProvider/>
          <div className="h-full">
            <Header/>
            <ContentProvider>{children}</ContentProvider>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
