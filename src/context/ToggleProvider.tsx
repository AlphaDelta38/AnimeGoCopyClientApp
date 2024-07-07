
import React, { createContext, useState, FC, ReactNode } from 'react';


interface ToggleProviderProps {
    children: ReactNode;
}

const ToggleContext = createContext<{ MobileNavBarActive: boolean; setMobileNavBarActive: React.Dispatch<React.SetStateAction<boolean>> } | undefined>(undefined);

const ToggleProvider: FC<ToggleProviderProps> = ({ children }) => {

    const [MobileNavBarActive, setMobileNavBarActive] = useState(false);

    return (
        <ToggleContext.Provider value={{ MobileNavBarActive, setMobileNavBarActive }}>
            {children}
        </ToggleContext.Provider>
    );
};

export { ToggleContext, ToggleProvider };