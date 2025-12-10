"use client";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchInput from "../SearchInput/SearchInput";
import { login, register } from "@/utils/Icons";
import { usePathname, useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/globalContext";
import SearchIcon from "@/public/Icons/SearchIcon";

import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

function Header() {
  const { user } = useUserContext();
  const photo = user?.photo;
  const router = useRouter();
  const { openModalForSnippet, openProfileModal, openModalForSearch } = useGlobalContext();

  const pathname = usePathname();

  return (
    <div className="fixed z-20 top-0 w-full px-8 flex items-center justify-between bg-background border-b border-border h-[8vh]">
      <Link href="/" className="flex items-center space-x-2 ">
        <svg
          id="logo-35"
          width="50"
          height="39"
          viewBox="0 0 50 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <path
            d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
            className="fill-primary"
          ></path>{" "}
          <path
            d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
            className="fill-chart-1"
          ></path>{" "}
        </svg>
        <h1 className="text-foreground font-bold text-2xl">
          Code<sub className="font-medium text-primary">Drop</sub>
        </h1>
      </Link>

      {pathname !== "/" && <div className="lg:flex hidden">
        <SearchInput />
      </div>}
      {!user._id ? (
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            className="btn-hover relative py-2 px-3 bg-secondary flex items-center justify-center gap-2 rounded-xl overflow-hidden "
            onClick={() => router.push("/login")}
          >
            <span className="text-secondary-foreground ">{login}</span>
            <span className="font-semibold text-secondary-foreground">Login</span>
            <div className="blob"></div>
          </button>
          <button
            className="btn-hover relative py-2 px-3 bg-primary flex items-center justify-center gap-2 rounded-xl overflow-hidden "
            onClick={() => router.push("/register")}
          >
            <span className=" text-primary-foreground ">{register}</span>
            <span className="font-semibold text-primary-foreground">Register</span>
            <div className="blob"></div>
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={openModalForSnippet}
            className="mr-4 h-[42px] px-4 flex items-center justify-center bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 ease-in-out "
          >
            Create Snippet
          </button>
          <button
            onClick={openModalForSearch}
            className="w-[43px] h-[42px] flex items-center justify-center bg-secondary rounded-lg lg:hidden "
          >
            <SearchIcon />
          </button>
          <button className="w-[42px] h-[42px] flex items-center justify-center bg-secondary rounded-lg ">
            <Image
              src={photo}
              alt="pfp"
              width={35}
              height={35}
              onClick={openProfileModal}
              className="rounded-lg cursor-pointer"
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
