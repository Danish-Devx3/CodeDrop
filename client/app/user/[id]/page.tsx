"use client";
import Snippet from "@/app/Components/Snippet/Snippet";
import { useSnippetContext } from "@/context/SnippetsContext";
import { useUserContext } from "@/context/userContext";
import useRedirect from "@/hooks/useUserRedirect";
import { ISnippet, IUser } from "@/types/types";
import { joinedOn } from "@/utils/Date";
import { envelope, github, linkedin } from "@/utils/Icons";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useState } from "react";

interface Props {
  params: {
    id: string;
  };
}

function page({ params: { id } }: Props) {
  const [createrData, setCreaterData] = useState({} as IUser);
  const { getPublicSnippets } = useSnippetContext();
  const { getUserById } = useUserContext();
  const createrId = id.split("-").at(-1);

  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserById(createrId);
        setCreaterData(data);
      } catch (error) {
        console.log("Error in getUserById", error);
      }
    })();
  }, [createrId]);

  useEffect(() => {
    if (createrId) {
      (async () => {
        try {
          const res = await getPublicSnippets(createrId);
          setSnippets(res);
        } catch (error) {
          console.log("Error in getUserSnippet", error);
        }
      })();
    }
  }, [createrId]);
  
  return (
    <main className="p-8">
      <section className="py-8 px-[12rem] bg-2 rounded-lg ">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-[#6fcf97] ">
            {createrData.name}
          </h1>
          <p className="text-[#699246]">{joinedOn(createrData.createdAt)}</p>
        </div>
        <div className="mt-12 flex justify-between gap-14">
          <div className="">
            <h3 className="text-lg font-bold">User Bio</h3>
            <p>{createrData.bio}</p>
          </div>
          <div className="px-16 py-8 bg-1 flex flex-col gap-6 rounded-lg text-lg text-gray-300 ">
            <Link
              target="_blank"
              href={createrData?.github || "#"}
              className="grid grid-cols-[40px_1fr] items-center pr-[5rem] "
            >
              <span className="text-2xl">{github}</span>
              <span>GitHub</span>
            </Link>
            <Link
              target="_blank"
              href={createrData?.linkedin || "#"}
              className="grid grid-cols-[40px_1fr] items-center pr-[5rem] "
            >
              <span className="text-2xl">{linkedin}</span>
              <span>LinkedIn</span>
            </Link>
            <Link
              target="_blank"
              href={`mailto:${createrData?.publicEmail || "#"}`}
              className="grid grid-cols-[40px_1fr] items-center pr-[5rem] "
            >
              <span className="text-2xl">{envelope}</span>
              <span>Email</span>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h1 className="text-center text-2xl font-bold mt-12">
          Snippet created by{" "}
          <span className="text-3xl font-bold text-[#6fcf97]">
            {createrData?.name}
          </span>
        </h1>
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {snippets.map((snippet: ISnippet) => {
            return <Snippet key={snippet._id} snippet={snippet} />
          })}
        </div>
      </section>
    </main>
  );
}

export default page;
