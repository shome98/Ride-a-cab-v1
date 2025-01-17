import React, { createContext } from "react";

export const UserDataContext=createContext({});

export default function UserContext({children}:{children:React.ReactNode}):JSX.Element{
    return (
        <UserDataContext.Provider value={{}}>{children}</UserDataContext.Provider>
    )
}