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
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SyntaxHighlighter from "react-syntax-highlighter";

import { vs2015, docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

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

  const { theme } = useTheme()

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

    <div className="shadow-sm flex flex-col border border-border rounded-lg bg-card overflow-hidden">
      <div className="px-3 py-3 md:px-5 flex items-center justify-between border-b border-border bg-muted/30">
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
              className="rounded-full ring-2 ring-transparent group-hover:ring-primary transition-all"
            />
            <h3 className="ml-2 text-muted-foreground font-semibold group-hover:text-primary transition-colors text-sm md:text-base">
              <span className="capitalize group-hover:underline transition-all ease-in-out duration-200">
                {snippet?.user?.name}
              </span>
              <span className="text-xs md:text-sm font-normal group-hover:underline transition-all ease-in-out duration-200 ml-1">
                , {formatDate(snippet?.createdAt)}
              </span>
            </h3>
          </div>
        </Link>
        <div className="flex items-center gap-2 text-foreground">
          <button
            className="w-8 h-8 md:w-10 md:h-10 rounded-md text-primary hover:bg-accent hover:text-accent-foreground text-base md:text-lg flex items-center justify-center transition-colors border border-border"
            onClick={() => {
              navigator.clipboard.writeText(codeString);
              toast.success("Code copied to clipboard");
            }}
          >
            {copy}
          </button>
          <button
            className="w-8 h-8 md:w-10 md:h-10 rounded-md text-primary hover:bg-accent hover:text-accent-foreground text-base md:text-lg flex items-center justify-center transition-colors border border-border"
          >
            {bookmarkEmpty}
          </button>
        </div>
      </div>

      <div>
        <SyntaxHighlighter
          language={snippet?.language}
          showLineNumbers={true}
          style={theme === "dark" ? vs2015 : docco}
          customStyle={{
            fontSize: window.innerWidth < 720 ? "0.8rem" : "1.1rem",
            padding: "1.5rem",
            height: window.innerWidth < 720 ? "200px" : "400px",
            scrollbarWidth: "none",
            overflow: "scroll",
            backgroundColor: "transparent", // Ensure bg matches theme
          }}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>

      <div className="flex-1 px-4 py-3 md:px-6 md:py-4 bg-muted/10 border-t border-border">
        <div className="flex justify-between gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <Link
              href={`/snippet/${snippet?.title
                .toLowerCase()
                .split(" ")
                .join("-")}-${snippet?._id}`}
              className="group"
            >
              <div className="flex items-center gap-2">
                <Image
                  width={20}
                  height={20}
                  className="opacity-80 group-hover:opacity-100 transition-opacity"
                  src={
                    languageLogo(snippet?.language) || "/logos/javascript.svg"
                  }
                  alt="lang"
                />
                <h2 className="text-sm md:text-base font-semibold text-foreground group-hover:text-primary group-hover:underline transition-all ease-in-out duration-300">
                  {snippet?.title}
                </h2>
              </div>
            </Link>
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{snippet?.description}</p>
          </div>
          <button
            onClick={handleLike}
            className={`flex flex-col items-center justify-center min-w-[50px] md:min-w-[60px] text-xl md:text-2xl transition-all duration-300 ease-in-out hover:scale-110 ${isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
              } `}
          >
            <span>{isLiked ? heart : heartOutline}</span>
            <span className="text-xs md:text-sm font-bold mt-1">
              {likeCount === 0 ? 0 : likeCount}{" "}
              {likeCount === 1 || 0 ? "like" : "likes"}
            </span>
          </button>
        </div>

        <div className="pt-4 flex justify-between items-end">
          <ul className="flex items-start gap-2 flex-wrap">
            {snippet?.tags.map((tag: ITag) => {
              return (
                <li
                  key={tag._id}
                  onClick={() => setActiveTag(tag._id)}
                  className={`px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm border rounded-full cursor-pointer transition-all hover:border-primary hover:text-primary ${activeTag === tag._id
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-background border-border text-muted-foreground"
                    }`}
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
                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-primary hover:bg-accent transition-all"
              >
                {edit}
              </button>
              <button
                onClick={() => deleteSnippet(snippet._id)}
                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
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
