"use client";
import { useUserContext } from "@/context/userContext";
import { envelope, github, linkedin } from "@/utils/Icons";
import Image from "next/image";
import React from "react";

function page() {
  const { user, updateUser, changePassword, userState } = useUserContext();

  return (
    <main className="h-[92vh] relative flex justify-center ">
      <form
        action=""
        className=" u-shadow-2 px-8 mx-8 my-8 py-8 bg-1 rounded-lg max-w-[1200px] w-full "
      >
        <label htmlFor="file-ipload" className="text-gray-200">
          Add Profile picture
        </label>
        <div>
          <label
            htmlFor="file-upload"
            className="py-4 flex items-center justify-center border-2 border-dashed border-rgba-2 rounded-lg cursor-pointer"
          >
            <Image
              width={100}
              height={100}
              src={user?.photo || "/image--user.png"}
              alt="Profile picture"
              className="rounded-lg"
            />
          </label>
          <input type="file" id="file-upload" className="hidden" />

          <label htmlFor="github" className="mt-4 text-gray-300">
            Add Social Links
          </label>
          <div className="flex-1 grid gap-4 grid-cols-[repeat(auto-fill,minmax(290px,1fr))]">
            <div className="relative w-full">
              <label
                htmlFor="github"
                className="absolute top-[50%] left-[1rem] translate-y-[-50%] text-gray-200 text-2xl"
              >
                {github}
              </label>

              <input
                id="github"
                name="github"
                type="text"
                defaultValue={user?.github}
                //onChange={(e) => handlerUserInput("github")(e)}
                placeholder="Github"
                className="w-full py-[.8rem] pl-[3.2rem] pr-[1rem] text-gray-200 bg-transparent border-[2px] border-rgba-2 rounded-md outline-none"
              />
            </div>

            <div className="relative w-full">
              <label
                htmlFor="linkedin"
                className="absolute top-[50%] left-[1rem] translate-y-[-50%] text-gray-200 text-2xl"
              >
                {linkedin}
              </label>

              <input
                id="linkedin"
                name="linkedin"
                type="text"
                defaultValue={user?.linkedin}
                //onChange={(e) => handlerUserInput("linkedin")(e)}
                placeholder="Linkedin"
                className="w-full py-[.8rem] pl-[3.2rem] pr-[1rem] text-gray-200 bg-transparent border-[2px] border-rgba-2 rounded-md outline-none"
              />
            </div>
            <div className="relative w-full">
              <label
                htmlFor="publicEmail"
                className="absolute top-[50%] left-[1rem] translate-y-[-50%] text-gray-200 text-2xl"
              >
                {envelope}
              </label>

              <input
                id="publicEmail"
                name="publicEmail"
                type="email"
                defaultValue={user?.publicEmail}
                //onChange={(e) => handlerUserInput("publicEmail")(e)}
                placeholder="Public Email"
                className="w-full py-[.8rem] pl-[3.2rem] pr-[1rem] text-gray-200 bg-transparent border-[2px] border-rgba-2 rounded-md outline-none"
              />
            </div>
          </div>

          <div className="w-full mt-4 flex gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="name" className="text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={user?.name}
                className="py-[.8rem] pl-[1rem] pr-[1rem] text-gray-200 bg-transparent border-[2px] border-rgba-2 rounded-md outline-none focus:border-[#6fcf97] "
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="email" className="text-gray-300">
                Private Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={user?.email}
                className="py-[.8rem] pl-[1rem] pr-[1rem] text-gray-200 bg-transparent border-[2px] border-rgba-2 rounded-md outline-none focus:border-[#6fcf97] "
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-1">
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="bio" className="text-gray-300">
                Add Bio
              </label>
              <textarea
                rows={3}
                name="bio"
                id="bio"
                defaultValue={user?.bio}
                className=" resize-none py-4 pl-4 pr-1 text-gray-200 bg-transparent border-[2px] border-rgba-2 rounded-md outline-none focus:border-[#6fcf97] "
              />
            </div>
            <div className="w-full mt-4 flex gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <label htmlFor="oldPassword" className="text-gray-300">
                  Old Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  className="w-full py-[.8rem] pl-4 pr-1 text-gray-200 bg-transparent border-[2px] border-rgba-2 rounded-md outline-none focus:border-[#6fcf97]"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label htmlFor="newPassword" className="text-gray-300">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="w-full py-[.8rem] pl-4 pr-1 text-gray-200 bg-transparent border-[2px] border-rgba-2 rounded-md outline-none focus:border-[#6fcf97]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-4 justify-end"></div>
      </form>
    </main>
  );
}

export default page;
