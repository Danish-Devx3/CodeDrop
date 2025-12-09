"use client";
import { useGlobalContext } from "@/context/globalContext";
import { useSnippetContext } from "@/context/SnippetsContext";
import { useUserContext } from "@/context/userContext";
import useDetectOutside from "@/hooks/useDetectOutside";
import { gear, signout } from "@/utils/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

function ProfileModal() {
  const { closeModal } = useGlobalContext();
  const { logoutUser } = useUserContext();
  const { getPublicSnippets, getPopularSnippets, getLeaderboard } =
    useSnippetContext();

  const ref = useRef(null);
  const router = useRouter();

  useDetectOutside({ ref, callback: closeModal });
  const menu = [
    {
      name: "Settings",
      url: "/profile/update",
      icon: gear,
      onClick: () => {
        closeModal();
        router.push("/profile/update");
      },
    },
    {
      name: "Sign Out",
      url: "/",
      icon: signout,
      onClick: () => {
        closeModal();
        getPublicSnippets();
        getPopularSnippets();
        getLeaderboard();
        logoutUser();
        router.push("/");
      },
    },
  ];
  return (
    <div
      ref={ref}
      className="shadow-md fixed z-30 right-8 top-[4.2rem] bg-card rounded-lg border border-border"
    >
      <nav>
        <ul className="py-1 min-w-[200px]">
          {menu.map((item, idx) => (
            <li
              key={idx}
              className="px-4 py-2 cursor-pointer hover:bg-muted transition-colors rounded-sm mx-1"
              onClick={item.onClick}
            >
              <Link
                href={item.url}
                className="grid grid-cols-[30px_1fr] items-center text-foreground"
              >
                <span className="text-lg text-muted-foreground">{item.icon}</span>
                <span className="">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default ProfileModal;
