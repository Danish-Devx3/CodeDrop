import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSnippetContext } from "@/context/SnippetsContext";
import { useUserContext } from "@/context/userContext";
import { ITag } from "@/types/types";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function Categories() {
  const {
    tags,
    getPublicSnippets,
    getUserSnippets,
    getLikedSnippets,
    getPopularSnippets,
  } = useSnippetContext();
  const userId = useUserContext().user?._id;
  const [activeTag, setActiveTag] = useState("All");
  const [activeTagId, setActiveTagId] = useState<string | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      if (activeTagId) {
        switch (pathname) {
          case "/":
            await getPublicSnippets("", activeTagId);
            break;

          case "/snippets":
            await getUserSnippets("", activeTagId);
            break;

          case "/favorites":
            await getLikedSnippets("", activeTagId);
            break;

          case "/popular":
            await getPopularSnippets(activeTagId);
            break;

          default:
            break;
        }
      } else {
        await getPublicSnippets();

        if (userId) {
          await getUserSnippets();
          await getLikedSnippets();
        }
      }
    };
    fetchData();
  }, [pathname, userId, activeTagId]);

  return (
    <div className="fixed w-full z-10">
      <div className="pl-14 py-3 w-full bg-background border-b border-border ">
        <Carousel className="w-full lg:max-w-[1200px] xl:max-w-[1450px] ">
          <CarouselContent className="flex gap-4">
            <CarouselItem
              className={`relative text-sm px-6 py-1 rounded-full cursor-pointer border select-none transition-all duration-300 ease-in-out ${activeTag === "All"
                  ? "text-primary-foreground bg-primary border-primary"
                  : "bg-secondary text-secondary-foreground border-border hover:bg-muted hover:text-foreground"
                }`}
              onClick={() => {
                setActiveTag("All");
                setActiveTagId(null);
              }}
            >
              All
            </CarouselItem>
            {tags.map((tag: ITag) => {
              return (
                <CarouselItem
                  key={tag._id}
                  className={`relative text-[0.7rem] px-4 rounded-full cursor-pointer border select-none flex items-center justify-center transition-all duration-300 ease-in-out ${activeTag === tag.name
                      ? "text-primary-foreground bg-primary border-primary"
                      : "bg-secondary text-secondary-foreground border-border hover:bg-muted hover:text-foreground"
                    }`}
                  onClick={() => {
                    setActiveTag(tag.name);
                    setActiveTagId(tag._id);
                  }}
                >
                  {tag.name.toUpperCase()}
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export default Categories;
