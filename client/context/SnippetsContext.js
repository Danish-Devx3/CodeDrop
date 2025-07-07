import axios from "axios";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useGlobalContext } from "./globalContext";

const SnippetsContext = createContext();

export const SnippetsProvider = ({ children }) => {
  const serverUrl = "http://localhost:8000/api/v1";

  const [publicSnippets, setPublicSnippets] = useState([]);
  const [tags, setTags] = useState([]);

  const {closeModal} = useGlobalContext();

  const getPublicSnippets = async (userId, tagId, searchQuery, page) => {
    console.log(userId)
    try {
      const queryPrams = new URLSearchParams();

      if (userId) {
        queryPrams.append("userId", userId);
      }
      if (tagId) {
        queryPrams.append("tagId", tagId);
      }
      if (searchQuery) {
        queryPrams.append("search", searchQuery);
      }
      if (page) {
        queryPrams.append("page", page);
      }
      const res = await axios.get(`${serverUrl}/snippets/public?${queryPrams.toString()}`);
      if (res.data && res.data.snippets) {
        setPublicSnippets(res.data.snippets);
        return res.data.snippets;
      } else {
        console.log("No public snippet found");
        return res.data.snippets;
      }
    } catch (error) {
      console.log("Error in fetching public snippets", error);
      return [];
    }
  };

  const createSnippet =  async (data) => {
    try {
      const res = await axios.post(`${serverUrl}/create-snippet`, data);
      setPublicSnippets([res.data, ...publicSnippets]);
      getPublicSnippets();
      toast.success("Snippet created successfully");
      closeModal();
    } catch (error) {
      console.log("Error in createSnippet", error);
      toast.error(error.response.data.message);
    }
  };

  const updateSnippet = async (data)=>{
    try {
      await axios.patch(`${serverUrl}/snippet/${data._id}`, data)
      getPublicSnippets();
      toast.success("Snippet updated successfully")
    } catch (error) {
      console.log("Error in updateSnippet", error)
    }
  }

  const deleteSnippet = async (id) => {
    try {
      const res = await axios.delete(`${serverUrl}/snippet/${id}`);
      getPublicSnippets();
      toast.success(res.data.message)
    } catch (error) {
      console.log("Error in deleteSnippet", error)
    }
  };

  const likeSnippet = async (id) => {
    try {
      await axios.patch(`${serverUrl}/snippet/like/${id}`);
      toast.success("You liked a snippet")
    } catch (error) {
      console.log("Error in likeSnippet");
      toast.error(error.response.data.message)
    }
  }

  const getTags = async () => {
    try {
      const res = await axios.get(`${serverUrl}/tags`);
      setTags(res.data);
    } catch (error) {
      console.log("Error in getTags", error)
    }
  }

  const gradients = {
    buttonGradient1:
      "linear-gradient(110.42deg, rgba(107, 190, 146, 0.1) 29.2%, rgba(245, 102, 146, 0.1) 63.56%)",
    buttonGradient2:
      "linear-gradient(110.42deg, rgba(25, 151, 222, 0.1) 29.2%, rgba(168, 85, 247, 0.1) 63.56%)",
    buttonGradient3:
      "linear-gradient(110.42deg, rgba(25, 151, 222, 0.1) 29.2%, rgba(168, 85, 247, 0.1) 63.56%)",
    buttonGradient4:
      "linear-gradient(110.42deg, rgba(168, 85, 247, 0.1) 29.2%, rgba(245, 102, 146, 0.1) 63.56%)",
    buttonGradient5:
      "linear-gradient(110.42deg, rgba(25, 151, 222, 0.1) 29.2%, rgba(168, 85, 247, 0.1) 63.56%)",
    buttonGradient6:
      "linear-gradient(110.42deg, rgba(25, 151, 222, 0.1) 29.2%, rgba(168, 85, 247, 0.1) 63.56%)",
    buttonGradient7:
      "linear-gradient(110.42deg, rgba(41, 25, 222, 0.1) 29.2%, rgba(235, 87, 87, 0.1) 63.56%)",
    buttonGradient8:
      "linear-gradient(110.42deg, rgba(25, 151, 222, 0.1) 29.2%, rgba(168, 85, 247, 0.1) 63.56%)",
    buttonGradient9:
      "linear-gradient(110.42deg, rgba(226, 195, 33, 0.1) 29.2%, rgba(247, 104, 85, 0.1) 63.56%)",
    buttonGradient10:
      "linear-gradient(110.42deg, rgba(235, 87, 87, 0.1) 29.2%, rgba(189, 68, 166, 0.1) 53.82%, rgba(247, 85, 143, 0.1) 63.56%)",
    buttonGradient11:
      "linear-gradient(110.42deg, rgba(25, 151, 222, 0.1) 29.2%, rgba(168, 85, 247, 0.1) 63.56%)",
    buttonGradient12:
      "linear-gradient(110.42deg, rgba(226, 195, 33, 0.1) 29.2%, rgba(247, 104, 85, 0.1) 63.56%)",
    buttonGradient13:
      "linear-gradient(110.42deg, rgba(226, 195, 33, 0.1) 29.2%, rgba(99, 3, 255, 0.1) 63.56%)",
    buttonGradient14:
      "linear-gradient(110.42deg, rgba(41, 25, 222, 0.1) 29.2%, rgba(235, 87, 87, 0.1) 63.56%)",
  };

  const randomButtonColor = Object.values(gradients)[Math.floor(Math.random() * Object.values(gradients).length)]
  const randomTagColor = Object.values(gradients)[Math.floor(Math.random() * Object.values(gradients).length)]

  
  const useBtnColorMemo = useMemo(()=>randomButtonColor,[]);
  const useTagColorMemo = useMemo(()=>randomTagColor,[]);


  useEffect(() => {
    getPublicSnippets();
    getTags();
  }, []);

  return (
    <SnippetsContext.Provider value={{
        publicSnippets,
        getPublicSnippets,
        useBtnColorMemo,
        useTagColorMemo,
        createSnippet,
        tags,
        updateSnippet,
        deleteSnippet,
        likeSnippet,
    }}>
      {children}
    </SnippetsContext.Provider>
  );
};

export const useSnippetContext = () => {
  return useContext(SnippetsContext);
};
