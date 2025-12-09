"use client";
import { useGlobalContext } from "@/context/globalContext";
import { useSnippetContext } from "@/context/SnippetsContext";
import useDetectOutside from "@/hooks/useDetectOutside";
import { ITag } from "@/types/types";
import { edit, plus } from "@/utils/Icons";
import React, { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";

function AddSnippetModal() {
  const { modalMode, closeModal, activeSnippet } = useGlobalContext();
  const { createSnippet, tags, useTagColorMemo, updateSnippet } = useSnippetContext();
  const [activeTags, setActiveTags] = useState([] as any);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const ref = useRef(null);

  useDetectOutside({
    ref,
    callback: () => {
      closeModal();
      resetForm()
    },
  });

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCode("");
    setLanguage("");
    setIsPublic(true);
    setActiveTags([]);
  };

  const languages = [
    "c",
    "c#",
    "c++",
    "css",
    "django",
    "go",
    "haskell",
    "html",
    "java",
    "javascript",
    "json",
    "kotlin",
    "lua",
    "php",
    "python",
    "r",
    "ruby",
    "rust",
    "sql",
    "swift",
    "typescript",
  ];

  const handleTags = (tag: ITag) => {
    const isTagActive = activeTags.some((activeTag: { _id: string }) => {
      return activeTag._id === tag._id;
    });


    if (isTagActive) {
      // remove from active tags
      setActiveTags(
        activeTags.filter((activeTag: { _id: string }) => {
          return activeTag._id !== tag._id;
        })
      );
    } else {
      // add to active tags
      setActiveTags([...activeTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const snippetData = {
      _id: activeSnippet?._id || "",
      title,
      description,
      code,
      language,
      isPublic,
      tags: activeTags.map((tag: ITag) => tag._id),
    };

    if (modalMode === "edit-snippet") {
      updateSnippet(snippetData);
      closeModal()
    } else if (modalMode === "add-snippet") {
      const res = createSnippet(snippetData);
      if (res._id) {
        closeModal();
        resetForm();
      }
    }
  }

  useEffect(() => {
    if (modalMode === "edit-snippet" && activeSnippet) {
      setActiveTags(activeSnippet.tags);
      setTitle(activeSnippet.title)
      setDescription(activeSnippet.description)
      setCode(activeSnippet.code)
      setLanguage(activeSnippet.language)
      setIsPublic(activeSnippet.isPublic)
    }
  }, [modalMode, activeSnippet])

  return (
    <div className="fixed top-0 left-0 z-40 h-full w-full bg-black/50 backdrop-blur-sm overflow-hidden flex items-center justify-center">
      <div
        ref={ref}
        className="py-5 px-6 max-w-[920px] w-full bg-card border border-border flex flex-col gap-4 relative rounded-lg shadow-xl max-h-[90vh] overflow-y-auto"
      >
        <form

          onSubmit={handleSubmit}
          action="" className="flex flex-col gap-4">
          <h1 className="text-card-foreground text-xl font-bold ">
            {modalMode === "edit-snippet" ? (
              <span className="flex items-center gap-4">
                {edit} Edit Snippet
              </span>
            ) : (
              <span className="flex items-center gap-4">
                {plus} Add Snippet
              </span>
            )}
          </h1>
          <div className="flex justify-center gap-3">
            <div className="flex-1">
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full h-10 bg-input p-2 rounded-lg text-foreground border border-transparent focus:border-ring outline-none"
              />
            </div>
            <div>
              <select
                name="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full h-10 px-4 bg-input text-foreground rounded-lg cursor-pointer border border-transparent focus:border-ring outline-none"
              >
                {languages.map((lang) => {
                  return (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <select
                name="isPublic"
                value={isPublic.toString()}
                onChange={(e) => setIsPublic(e.target.value === "true")}
                className="w-full h-10 px-4 bg-input text-foreground rounded-lg cursor-pointer border border-transparent focus:border-ring outline-none"
              >
                <option value="true">Public</option>
                <option value="false">Private</option>
              </select>
            </div>
          </div>
          <div>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows={2}
              className="w-full pt-2 px-4 bg-input text-foreground rounded-lg border border-transparent focus:border-ring outline-none resize-none"
            ></textarea>
          </div>
          <div>
            <pre>
              <code>
                <textarea
                  name="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full pt-2 h-[200px] px-4 bg-input text-foreground rounded-lg border border-transparent focus:border-ring outline-none font-mono"
                  placeholder="// Code here..."
                ></textarea>
              </code>
            </pre>
          </div>
          <div className="flex flex-wrap gap-4">
            {tags.map((tag: ITag, index: number) => {
              const isActive = activeTags.some((activeTag: { _id: string }) => activeTag._id === tag._id);
              return (
                <Button
                  key={index}
                  type="button"
                  onClick={() => handleTags(tag)}
                  className={`py-1 text-sm border transition-colors ${isActive
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary text-secondary-foreground border-border hover:border-primary"
                    }`}
                >
                  {tag.name}
                </Button>
              );
            })}
          </div>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => { closeModal(); resetForm() }}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              {modalMode === "edit-snippet" ? "Update Snippet" : "Add Snippet"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSnippetModal;
