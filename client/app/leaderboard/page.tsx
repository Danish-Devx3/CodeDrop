"use client";
import { useSnippetContext } from "@/context/SnippetsContext";
import { IUser } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface LocalUser extends IUser {
    snippetCount: number
    totalLikes: number
    score: number
}

function page() {
  const { leaderboard, getLeaderboard } = useSnippetContext();

  const router = useRouter();

  const tableHeader = [
    {
      width: "20%",
      name: "Place",
      pos: "text-center",
      roundedTl: "rounded-tl-xl",
      roundedBl: "rounded-bl-xl",
    },
    {
      width: "20%",
      name: "Username",
      pos: "text-center",
    },
    {
      width: "20%",
      name: "Total Snippets",
      pos: "text-center",
    },
    {
      width: "20%",
      name: "Total Likes",
      pos: "text-center",
    },
    {
      width: "20%",
      name: "Score",
      pos: "text-center",
      roundedTr: "rounded-tr-xl",
      roundedBr: "rounded-br-xl",
    },
  ];

  useEffect(() => {
    (
        async ()=>{
           await getLeaderboard();
        }
    )();
  }, []);
  return (
    <main className="p-8">
      <h1 className="text-3xl text-white text-center font-bold">{leaderboard[0]?.name}Leaderboard</h1>
              

      <table className="w-full mt-8">
        <thead>
          <tr className="bg-rgba-2 text-gray-200">
            {tableHeader.map((header, index) => {
              return <th key={index}
              style={{width: header.width}}
              className={`py-6 text-left ${header.pos} ${header.roundedTl} ${header.roundedBl} ${header.roundedBr} ${header.roundedTr}`}
              >{header.name}</th>;
            })}
          </tr>
        </thead>
        <tbody>
            {leaderboard?.map((user:LocalUser, index: number)=>{
               return <tr 
                onClick={()=>{
                    router.push(`/user/${user.name.toLowerCase().split(" ").join("-")}-${user._id}`)
                }}
               key={index} className={`cursor-pointer text-white hover:bg-white/50 transition-all duration-300 ease-in-out
                ${index % 2 === 0 ? "bg-3" : "bg-rgba-2"}
               `}>
                    <td className="py-4 rounded-tl-xl rounded-bl-xl text-sm text-center ">
                        {index+1}
                    </td>
                    <td className="py-4 flex items-center gap-2">
                        <Image
                         src={user.photo}
                         alt="User Avatar"
                         width={40}
                         height={40}
                         className="rounded-full"
                        />
                        <span className="ml-2 font-bold text-sm">{user.name}</span>
                    </td>
                    <td className="text-center">
                        {user.snippetCount}
                    </td>
                    <td className="text-center">
                        {user.totalLikes}
                    </td>
                    <td className="text-center rounded-br-xl rounded-tr-xl">
                        {user.score}
                    </td>
                </tr>
            })}
        </tbody>
      </table>
    </main>
  );
}

export default page;
