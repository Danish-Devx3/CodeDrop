import React, { useContext } from "react";

export const GlobalContext = ({children}) =>{
    return <GlobalContext.Provider>
        {children}
    </GlobalContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}