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
      <Link href="/" className="flex items-center space-x-2 shadow-inner">
        <Image
          className="ml-[1px] bg-white"
          src="/logo12.png"
          alt="logo"
          width={200}
          height={200}
        />
        <span className="">
          <h1 className="font-bold text-white text-2xl px-2">CodeDrop</h1>
        </span>
      </Link>

      <div className="lg:flex hidden">
        <SearchInput />
      </div>
      {!user._id ? (
        <div className="flex items-center gap-4">
          <button
            className="btn-hover relative h-[47px] px-8 bg-[#3a3b3c] flex items-center justify-center gap-4 rounded-xl overflow-hidden "
            onClick={() => router.push("/login")}
          >
            <span className=" text-xl text-gray-200 ">{login}</span>
            <span className="font-bold text-white">Login</span>
            <div className="blob"></div>
          </button>
          <button
            className="btn-hover relative h-[47px] px-8 bg-[#7263f3] flex items-center justify-center gap-4 rounded-xl overflow-hidden "
            onClick={() => router.push("/register")}
          >
            <span className=" text-xl text-gray-200 ">{register}</span>
            <span className="font-bold text-white">Register</span>
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
              className="rounded-lg cursor-pointer"
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
