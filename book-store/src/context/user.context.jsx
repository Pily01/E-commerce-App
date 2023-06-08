import { createContext, useState } from "react";

export const UserContext = createContext({

});

// This provider allows all of the children components to accesss
// the values inside the useState
export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser};


    return <UserContext.Provider value={value}> {children} </UserContext.Provider>
}
