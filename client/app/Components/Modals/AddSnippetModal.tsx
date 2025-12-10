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
    <div className="fixed top-0 left-0 z-40 h-full w-full bg-black/50 backdrop-blur-sm overflow-hidden flex items-center justify-center p-4 md:p-0">
      <div
        ref={ref}
        className="py-5 px-4 md:px-6 max-w-[920px] w-full bg-card border border-border flex flex-col gap-4 relative rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        <form
          onSubmit={handleSubmit}
          action="" className="flex flex-col gap-4">
          <h1 className="text-card-foreground text-lg md:text-xl font-bold border-b border-border pb-3">
            {modalMode === "edit-snippet" ? (
              <span className="flex items-center gap-3">
                {edit} Edit Snippet
              </span>
            ) : (
              <span className="flex items-center gap-3">
                {plus} Add Snippet
              </span>
            )}
          </h1>
          <div className="flex flex-col md:flex-row justify-center gap-3">
            <div className="flex-1">
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full h-10 bg-input px-3 rounded-lg text-foreground border border-border focus:border-ring outline-none transition-colors text-sm md:text-base placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1 md:w-auto">
                <select
                  name="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full md:min-w-[150px] h-10 px-3 bg-input text-foreground rounded-lg cursor-pointer border border-border focus:border-ring outline-none transition-colors text-sm md:text-base"
                >
                  <option value="" disabled>Select Language</option>
                  {languages.map((lang) => {
                    return (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex-1 md:w-auto">
                <select
                  name="isPublic"
                  value={isPublic.toString()}
                  onChange={(e) => setIsPublic(e.target.value === "true")}
                  className="w-full md:min-w-[120px] h-10 px-3 bg-input text-foreground rounded-lg cursor-pointer border border-border focus:border-ring outline-none transition-colors text-sm md:text-base"
                >
                  <option value="true">Public</option>
                  <option value="false">Private</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              rows={3}
              className="w-full py-2 px-3 bg-input text-foreground rounded-lg border border-border focus:border-ring outline-none resize-none transition-colors text-sm md:text-base placeholder:text-muted-foreground"
            ></textarea>
          </div>
          <div>
            <pre className="relative group">
              <code>
                <textarea
                  name="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full py-3 px-4 h-[250px] md:h-[300px] bg-input text-foreground rounded-lg border border-border focus:border-ring outline-none font-mono text-xs md:text-sm custom-scrollbar leading-relaxed"
                  placeholder="// Paste your code here..."
                  spellCheck={false}
                ></textarea>
              </code>
            </pre>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">Tags</label>
            <div className="flex flex-wrap gap-2 md:gap-3 max-h-[100px] overflow-y-auto custom-scrollbar p-1">
              {tags.map((tag: ITag, index: number) => {
                const isActive = activeTags.some((activeTag: { _id: string }) => activeTag._id === tag._id);
                return (
                  <Button
                    key={index}
                    type="button"
                    onClick={() => handleTags(tag)}
                    className={`py-1 px-3 text-xs md:text-sm rounded-full border transition-all duration-200 ${isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-secondary/50 dark:text-white border-border hover:border-primary/50 hover:bg-secondary/20"
                      }`}
                  >
                    {tag.name}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-border mt-2">
            <Button
              type="button"
              className="bg-destructive/10 text-destructive hover:bg-destructive/20 border border-transparent px-4 py-2 h-10"
              onClick={() => { closeModal(); resetForm() }}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 h-10 shadow-lg shadow-primary/20">
              {modalMode === "edit-snippet" ? "Update Snippet" : "Create Snippet"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSnippetModal;
