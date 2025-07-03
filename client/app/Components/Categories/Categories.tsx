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
  const { tags, getPublicSnippets } = useSnippetContext();
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

          default:
            break;
        }
      } else {
        await getPublicSnippets();
      }
    };
    fetchData();
  }, [pathname, userId, activeTagId]);

  return (
    <div className="fixed w-full z-10">
      <div className="pl-14 pr-[14rem] py-5 w-full bg-3 border-b-2 border-rgba-2 ">
        <Carousel className="w-full  lg:max-w-[1200px] xl:max-w-[1450px] ">
          <CarouselContent className="flex gap-4">
            <CarouselItem
              className={`relative text-sm px-6 py-1 rounded-full cursor-pointer border-[0.1rem] border-rgba-1 select-none  ${
                activeTag === "All"
                  ? "text-white bg-purple-400"
                  : "b-g-[#3a3b3c] text-white hover:text-gray-800 hover:bg-white transition-all duration-300 ease-in-out"
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
                  className={`relative text-sm px-6 py-1 rounded-full cursor-pointer border-[0.1rem] border-rgba-1 select-none  ${
                    activeTag === tag.name
                      ? "text-white bg-purple-400"
                      : "b-g-[#3a3b3c] text-white hover:text-gray-800 hover:bg-white transition-all duration-300 ease-in-out"
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
          <CarouselPrevious className="bg-red-500" />
          <CarouselNext className="bg-red-500" />
        </Carousel>
      </div>
    </div>
  );
}

export default Categories;
