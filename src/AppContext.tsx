import React from 'react';
import { createContext, useState, useContext } from 'react';



export const AppContext = createContext<{ 
        isConnected: boolean;
        setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
        login: string;
        setLogin: React.Dispatch<React.SetStateAction<string>>;
    }>({ 
        isConnected: false,
        setIsConnected: () => {},
        login: "",
        setLogin: () => {},
    });



export function AppProvider({ children }: { children: React.ReactNode }): JSX.Element {

    const [isConnected, setIsConnected] = useState(false);
    const [login, setLogin] = useState("");

    return (
        <AppContext.Provider value={{ isConnected, setIsConnected, login, setLogin }}>
            {children}
        </AppContext.Provider>
    )

}

export const useAppContext = () => useContext(AppContext);


export default AppContext;