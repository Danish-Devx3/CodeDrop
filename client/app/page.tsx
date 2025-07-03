"use client"

import { useSnippetContext } from "@/context/SnippetsContext"
import Snippet from "./Components/Snippet/Snippet";
import { ISnippet } from "@/types/types";
import Categories from "./Components/Categories/Categories";

export default function Page() {

  const {publicSnippets} = useSnippetContext();


  return ( <div className="bg-1">
    <Categories/>
    <div className={`px-8 pt-[6.3rem] pb-8 grid grid-cols-1 lg:grid-cols-2 gap-6`}>
      {publicSnippets.map((snippet:ISnippet) => {
        return <Snippet key={snippet._id} snippet={snippet} />
      })}
    </div>
  </div>)
}