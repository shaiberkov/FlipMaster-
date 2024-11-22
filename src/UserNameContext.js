
import React, {createContext, useState} from "react";

export const UserNameContext = createContext();

export const UserNameProvider = ({children}) => {
    const [userName, setUserName] = useState("");
    const[cardCount, setCardCount] = useState("");

    return <UserNameContext.Provider value={{userName,setUserName,cardCount, setCardCount}}>
        {children}
    </UserNameContext.Provider>;
}