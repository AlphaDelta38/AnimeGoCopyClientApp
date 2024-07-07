
import React, { createContext, useState, FC, ReactNode } from 'react';


interface ToggleProviderProps {
    children: ReactNode;
}

export interface ToggleContextProps {
    MobileNavBarActive: boolean;
    setMobileNavBarActive: (e:boolean)=> void;
}

const ToggleContext = createContext<ToggleContextProps | undefined>(undefined);



const ToggleProvider: FC<ToggleProviderProps> = ({ children }) => {

    const [MobileNavBarActive, setMobileNavBarActive] = useState(false);

    return (
        <ToggleContext.Provider value={{ MobileNavBarActive, setMobileNavBarActive }}>
            {children}
        </ToggleContext.Provider>
    );
};

export { ToggleContext, ToggleProvider };