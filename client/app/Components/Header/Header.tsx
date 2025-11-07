"use client";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchInput from "../SearchInput/SearchInput";
import { login, register } from "@/utils/Icons";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/globalContext";
import SearchIcon from "@/public/Icons/SearchIcon";

function Header() {
  const { user } = useUserContext();
  const photo = user?.photo;
  const router = useRouter();
  const { openModalForSnippet, openProfileModal, openModalForSearch } =
    useGlobalContext();

  return (
    <div className="fixed z-20 top-0 w-full px-8 flex items-center justify-between bg-1 border-b-[2px] border-rgba-2 h-[8vh]">
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
            class="ccompli1"
            fill="#007AFF"
          ></path>{" "}
          <path
            d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
            class="ccustom"
            fill="#312ECB"
          ></path>{" "}
        </svg>
        <h1 className="text-white font-bold text-2xl">
          Code<sub className="font-medium text-sky-300">Drop</sub>
        </h1>
      </Link>

      <div className="lg:flex hidden">
        <SearchInput />
      </div>
      {!user._id ? (
        <div className="flex items-center gap-4">
          <button
            className="btn-hover relative py-2 px-3 bg-[#3a3b3c] flex items-center justify-center gap-2 rounded-xl overflow-hidden "
            onClick={() => router.push("/login")}
          >
            <span className="text-gray-200 ">{login}</span>
            <span className="font-semibold text-white">Login</span>
            <div className="blob"></div>
          </button>
          <button
            className="btn-hover relative py-2 px-3 bg-[#7263f3] flex items-center justify-center gap-2 rounded-xl overflow-hidden "
            onClick={() => router.push("/register")}
          >
            <span className=" text-gray-200 ">{register}</span>
            <span className="font-semibold text-white">Register</span>
            <div className="blob"></div>
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={openModalForSnippet}
            className="mr-4 h-[42px] px-4 flex items-center justify-center bg-white rounded-lg font-semibold hover:bg-white/80 transition-all duration-200 ease-in-out "
          >
            Create Snippet
          </button>
          <button
            onClick={openModalForSearch}
            className="w-[43px] h-[42px] flex items-center justify-center bg-rgba-3 rounded-lg lg:hidden "
          >
            <SearchIcon stroke="rgba(249,249,249,0.6)" />
          </button>
          <button className="w-[42px] h-[42px] flex items-center justify-center bg-rgba-3 rounded-lg ">
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
