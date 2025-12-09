"use client";
import { useSnippetContext } from "@/context/SnippetsContext";
import SearchIcon from "@/public/Icons/SearchIcon";
import React, { useCallback, useEffect } from "react";
import lodash from 'lodash'
import { usePathname } from "next/navigation";
import { useUserContext } from "@/context/userContext";

interface Props {
  wFull?: boolean;
}

function SearchInput({ wFull }: Props) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const {
    getPublicSnippets,
    getPopularSnippets,
    getLikedSnippets,
    getUserSnippets,
    getLeaderboard,
  } = useSnippetContext();
  const pathname = usePathname();
  const userId = useUserContext().user?._id;

  const debouncedSearchQuery = useCallback(
    lodash.debounce((query: string) => {
      if (query) {
        switch (pathname) {
          case "/":
            getPublicSnippets("", "", query);
            break;
          case "/popular":
            getPopularSnippets("", query);
            break;
          case "/favorites":
            getLikedSnippets("", "", query);
            break;

          case "/snippets":
            getUserSnippets("", "", query);
            break;
        }
      } else {
        getPublicSnippets();
        getPopularSnippets();

        if (userId) {
          getUserSnippets();
          getLikedSnippets();
        }
        getLeaderboard();
      }
    }, 500), [pathname]
  )



  useEffect(() => {
    debouncedSearchQuery(searchQuery);
    return () => {
      debouncedSearchQuery.cancel();
    };
  }, [searchQuery, debouncedSearchQuery]);

  return (
    <form
      className={`relative flex gap-2 overflow-hidden ${wFull ? "w-full" : "md:w-[580px]"
        }`}
    >
      <div className="absolute top-[50%] left-3 translate-y-[-50%] text-muted-foreground">
        <SearchIcon />
      </div>

      <input
        className={`pl-10 pr-2 py-2 bg-secondary text-foreground font-medium border border-transparent focus:border-border rounded-lg outline-none transition-all duration-300 ease-in-out focus:w-full ${wFull ? "w-full" : "w-[90%]"
          }`}
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        type="text"
      />
      {!searchQuery && (
        <span className="absolute top-[50%] left-10 translate-y-[-50%] text-muted-foreground pointer-events-none text-nowrap ">
          Search for snippets e.g. Nested Loops etc.
        </span>
      )}
    </form>
  );
}

export default SearchInput;
