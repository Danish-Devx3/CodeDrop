"use client";
import { useSnippetContext } from "@/context/SnippetsContext";
import Snippet from "../../Components/Snippet/Snippet";
import React, { useEffect, useState } from "react";
import Loading from "@/app/Components/Loading/Loading";
import { ISnippet, IUser } from "@/types/types";

interface Props {
  params: {
    id: string;
  };
}

function page({ params: { id } }: Props) {
  const snippetId = id.split("-").at(-1);
  const { getPublicSnippetById } = useSnippetContext();
  const [snippet, setSnippet] = useState({} as ISnippet);

  useEffect(() => {
    (async () => {
      const res = await getPublicSnippetById(snippetId);
      setSnippet(res);
    })();
  }, [snippetId]);

  return (
    <main className="p-8 relative min-h-[90vh]">
      {snippet.title ? (
        <Snippet snippet={snippet} height="540px"/>
      ) : (
        <Loading/>
      )}
    </main>
  );
}

export default page;
