"use client";
import { useGlobalContext } from "@/context/globalContext";
import { useSnippetContext } from "@/context/SnippetsContext";
import { useUserContext } from "@/context/userContext";
import { ISnippet, ITag, IUser } from "@/types/types";
import { formatDate } from "@/utils/Date";
import {
  bookmarkEmpty,
  copy,
  edit,
  heart,
  heartOutline,
  trash,
} from "@/utils/Icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface Props {
  snippet: ISnippet & { user: IUser };
  height?: string;
}

function Snippet({ snippet, height = "400px" }: Props) {
  const {
    useBtnColorMemo,
    useTagColorMemo,
    deleteSnippet,
    likeSnippet,
    getPublicSnippets,
  } = useSnippetContext();

  const { openModalForEdit } = useGlobalContext();
  const router = useRouter();

  const codeString = `${snippet?.code}`;

  const languageLogo = (language: string) => {
    return `/logos/${language.toLowerCase()}.svg`;
  };

  const userId = useUserContext().user._id;

  const [isLiked, setIsLiked] = useState(Boolean);
  const [likeCount, setLikeCount] = useState(snippet.likedBy.length);
  const [activeTag, setActiveTag] = useState("");

  const handleLike = () => {
    if (!userId) {
      return router.push("/login");
    }

    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    likeSnippet(snippet._id);
  };

  useEffect(() => {
    if (activeTag) {
      getPublicSnippets("", activeTag);
    }
    setIsLiked(snippet.likedBy.includes(userId));
  }, [snippet.likedBy, userId, activeTag, getPublicSnippets]);


  return (
    <div className="shadow-sm flex flex-col border-2 border-rgba-3 rounded-lg">
      <div className="px-5 py-3 flex items-center justify-between rounded-t-lg border-b-2 border-rgba-3">
        <Link
          href={`/user/${snippet?.user?.name
            ?.toLowerCase()
            .split(" ")
            .join("-")}-${snippet?.user?._id}`}
          className="group"
        >
          <div className="flex items-center">
            <Image
              src={snippet?.user?.photo || "/image/user.png"}
              alt="user"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h3 className="ml-2 text-gray-400 font-semibold group-hover:text-green-400 ">
              <span className="capitalize group-hover:underline transition-all ease-in-out duration-200">
                {snippet?.user?.name}
              </span>
              <span className="text-sm text-gray-400 font-normal group-hover:underline group-hover:text-green-400 transition-all ease-in-out duration-200">
                , {formatDate(snippet?.createdAt)}
              </span>
            </h3>
          </div>
        </Link>
        <div className="flex items-center gap-2 text-gray-200">
          <button
            className="w-10 h-10 rounded-md text-green-400 text-lg flex items-center justify-center "
            style={{ background: useBtnColorMemo }}
          >
            {copy}
          </button>
          <button
            className="w-10 h-10 rounded-md text-green-400 text-lg flex items-center justify-center "
            style={{ background: useTagColorMemo }}
          >
            {bookmarkEmpty}
          </button>
        </div>
      </div>

      <div>
        <SyntaxHighlighter
          language={snippet?.language}
          showLineNumbers={true}
          style={vs2015}
          customStyle={{
            fontSize: "1.1rem",
            background: "#181818",
            borderRadius: "0 0 6px 6px",
            height: height,
            scrollbarWidth: "none",
            overflow: "scroll",
          }}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>

      <div className="flex-1 px-6 py-2 bg-4 ronded-b-lg border-t-2 border-rgba-3`">
        <div className="flex justify-between gap-2">
          <div className="flex-1 flex flex-col">
            <Link
              href={`/snippet/${snippet?.title
                .toLowerCase()
                .split(" ")
                .join("-")}-${snippet?._id}`}
            >
              <div className="flex items-center gap-2">
                <Image
                  width={20}
                  height={20}
                  className=""
                  src={
                    languageLogo(snippet?.language) || "/logos/javascript.svg"
                  }
                  alt="lang"
                />
                <h2 className="text-xl font-semibold text-gray-300 cursor-pointer hover:text-green-400 hover:underline transition-all ease-in-out duration-300">
                  {snippet?.title}
                </h2>
              </div>
            </Link>
            <p className="pb-1 text-gray-400 ">{snippet?.description}</p>
          </div>
          <button
            onClick={handleLike}
            className={`flex flex-col items-center text-2xl text-gray-300 transition-bg duration-300 ease-in-out ${
              isLiked && "text-red-500"
            } `}
          >
            <span>{isLiked ? heart : heartOutline}</span>
            <span className="text-sm font-bold text-gray-300">
              {likeCount === 0 ? 0 : likeCount}{" "}
              {likeCount === 1 || 0 ? "like" : "likes"}
            </span>
          </button>
        </div>

        <div className="pt-2 pb-3 flex justify-between">
          <ul className="flex items-start gap-2 flex-wrap">
            {snippet?.tags.map((tag: ITag) => {
              return (
                <li
                  style={{
                    background:
                      activeTag === tag._id ? "#7263f3" : useTagColorMemo,
                  }}
                  onClick={() => setActiveTag(tag._id)}
                  className="tag-item px-4 py-1 border border-rgba-2 text-gray-300 rounded-md cursor-pointer "
                >
                  {tag.name}
                </li>
              );
            })}
          </ul>
          {snippet.user._id === userId && (
            <div className="flex gap-2">
              <button
                onClick={() => openModalForEdit(snippet)}
                style={{ background: useBtnColorMemo }}
                className="w-10 h-10 flex items-center justify-center rounded-md text-sky-400 text-xl"
              >
                {edit}
              </button>
              <button
                onClick={() => deleteSnippet(snippet._id)}
                style={{ background: useBtnColorMemo }}
                className="w-10 h-10 flex items-center justify-center rounded-md text-sky-400 text-xl"
              >
                {trash}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Snippet;
