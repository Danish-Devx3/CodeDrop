"use client";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import React from "react";

function page() {
  const { user, updateUser, changePassword, userState } = useUserContext();

  return (
    <main className="h-[92vh] relative flex justify-center ">
      <form action="" className=" u-shadow-2 px-8 mx-8 my-8 py-8 bg-1 rounded-lg max-w-[1200px] w-full ">
          <label htmlFor="file-ipload" className="text-gray-200">
            Add Profile picture
          </label>
          <div>
            <label htmlFor="file-upload" className="py-4 flex items-center justify-center border-2 border-dashed border-rgba-2 rounded-lg cursor-pointer">
              <Image width={100} height={100} src={user?.photo||"/image--user.png"} alt="Profile picture" className="rounded-lg"/>
            </label>
            <input type="file" id="file-upload" className="hidden" />

            <label htmlFor="github" className="mt-4 text-gray-300">Add Social Links</label>
            <div className="flex-1 grid gap-4 grid-cols-[repeat(auto-fill, minmax(290px, 1fr))]">
                <div className="relative w-full">
                    <label htmlFor="github" className="absolute top-[50%] "></label>
                </div>
            </div>
          </div>
      </form>
    </main>
  );
}

export default page;
