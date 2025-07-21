"use client";
import HelpSidebar from "@/components/HelpSidebar";
import { plus } from "@/utils/Icons";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { animateY } from "@/utils/Animation";

function page() {
  const faq = [
    {
      question: "What is a snippet?",
      answer:
        "A snippet is a small piece of code or text that users can create, share, and manage within the app. It can be a useful piece of code or a reference.",
    },
    {
      question: "How do I create a snippet?",
      answer:
        "To create a snippet, navigate to the 'Add Snippet' section, fill in the required details such as title, code, and description, and click 'Submit'. Your snippet will be public by default.",
    },
    {
      question: "Can I make my snippet private?",
      answer:
        "Yes, after creating a snippet, you can toggle its visibility to 'Private' from the snippet management section.",
    },
    {
      question: "How do I like a snippet?",
      answer:
        "You can like a snippet by clicking the heart icon on any public snippet. Liked snippets will be stored in your profile.",
    },
    {
      question: "How do I update or delete a snippet?",
      answer:
        "You can update or delete any snippet you've created by going to the 'My Snippets' section, selecting the snippet, and choosing the 'Edit' or 'Delete' option.",
    },
    {
      question: "How does the leaderboard work?",
      answer:
        "The leaderboard ranks users based on their activity, which includes the number of snippets created and likes received. Higher engagement means a higher rank.",
    },
    {
      question: "Can I search for snippets created by other users?",
      answer:
        "Yes, you can use the search functionality to find snippets by title, tag, or user.",
    },
    {
      question: "Are all snippets public by default?",
      answer:
        "Yes, all snippets are public by default. However, you can change a snippet's visibility to 'Private' anytime.",
    },
    {
      question: "How do I bookmark a snippet?",
      answer:
        "You can bookmark a snippet by clicking the bookmark icon on any public snippet, and it will be saved in your profile for easy access later.",
    },
    {
      question: "Can I filter snippets by tags?",
      answer:
        "Yes, snippets can be filtered by tags, allowing you to find content related to specific topics or categories.",
    },
  ];

  const [openIdx, setOpenIdx] = useState(null);

  const toggleFaq = (idx: any) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <main>
      <div className="py-[5rem] flex flex-col gap-1 items-center">
        <h1 className="font-bold text-xl text-gray-200">How To?</h1>
        <p>Frequently asked question and answers.</p>
      </div>
      <div className="flex">
        <HelpSidebar />
        <div className="px-8 py-10 flex-1 flex flex-col gap-4 bg-2 rounded-tr-md rounded-br-md">
          {faq.map((item, idx) => (
            <motion.div
              variants={animateY}
              initial="hidden"
              animate="visible"
              key={idx}
              onClick={()=>toggleFaq(idx)}
              className="p-4 flex-col  gap-2 bg-1 border-[2px] border-rgba-3 rounded-md cursor-pointer shadow-sm"
            >
              <motion.h2 className="flex justify-between items-center font-bold text-lg">
                <span className="text-gray-200 font-bold">{item.question}</span>
                <motion.span
                 initial={false}
                 animate={{rotate: openIdx===idx ? 45 : 0}}
                >{plus}</motion.span>
              </motion.h2>
              <AnimatePresence>
                {openIdx===idx && (
                  <motion.p
                   initial={{opacity: 0, height: 0}}
                   animate={{opacity: 1, height: 'auto'}}
                   exit={{opacity: 0, height: 0}}
                   transition={{duration: 0.3}}
                   className="text-gray-300">{item.answer}</motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default page;
