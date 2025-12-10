import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const [modalMode, setModalMode] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [activeSnippet, setActiveSnippet] = useState(null);

    React.useEffect(() => {
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    }, []);

    const openModalForSnippet = () => {
        setModalMode("add-snippet");
        setIsEditing(true);
    }

    const openProfileModal = () => {
        setModalMode("profile");
    }

    const openModalForEdit = (snippet) => {
        setActiveSnippet(snippet);
        setModalMode("edit-snippet");
        setIsEditing(true);
    }

    const openModalForSearch = () => {
        setModalMode("search");
    }

    const closeModal = () => {
        setModalMode('');
        setIsEditing(false);
        setActiveSnippet(null);
    }

    return <GlobalContext.Provider value={{
        modalMode,
        isSidebarOpen,
        isEditing,
        activeSnippet,
        openModalForEdit,
        openModalForSearch,
        openModalForSnippet,
        openProfileModal,
        closeModal,
        setIsSidebarOpen,
    }}>
        {children}
    </GlobalContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}