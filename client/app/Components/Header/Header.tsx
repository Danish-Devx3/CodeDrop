"use client";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchInput from "../SearchInput/SearchInput";
import { login, register } from "@/utils/Icons";
import { useRouter } from "next/navigation";

function Header() {
  const { user } = useUserContext();
  const photo = user?.photo;
  const router = useRouter();

  return (
    <div className="fixed z-20 top-0 w-full px-8 flex items-center justify-between bg-1 border-b-[2px] border-rgba-2 h-[8vh]">
      <Link href="/" className="flex items-center space-x-2 ">
        <Image
          className="ml-[1px]"
          src="/thecodedealer--logo-white.png"
          alt="logo"
          width={30}
          height={30}
        />
        <span className="">
          <h1 className="font-bold text-white text-2xl px-2">Snippy</h1>
        </span>
      </Link>

      <div className="lg:flex hidden">
        <SearchInput />
      </div>
      <div className="flex items-center gap-4">
        <button className="btn-hover relative h-[47px] px-8 bg-[#3a3b3c] flex items-center justify-center gap-4 rounded-xl overflow-hidden "
         onClick={()=>router.push("/login")}
        >
          <span className=" text-xl text-gray-200 ">{login}</span>
          <span className="font-bold text-white">Login</span>
          <div className="blob"></div>
        </button>
        <button className="btn-hover relative h-[47px] px-8 bg-[#7263f3] flex items-center justify-center gap-4 rounded-xl overflow-hidden "
         onClick={()=> router.push("/register")}
        >
          <span className=" text-xl text-gray-200 ">{register}</span>
          <span className="font-bold text-white">Register</span>
          <div className="blob"></div>
        </button>
      </div>
    </div>
  );
}

export default Header;
