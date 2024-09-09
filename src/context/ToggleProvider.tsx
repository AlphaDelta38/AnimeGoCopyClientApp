
import React, { createContext, useState, FC, ReactNode } from 'react';


interface ToggleProviderProps {
    children: ReactNode;
}

export interface ToggleContextProps {
    MobileNavBarActive: boolean;
    setMobileNavBarActive: (e:boolean)=> void;
    TranslationsSideBarActive: boolean;
    setTranslationsSideBarActive: (e:boolean)=> void;
    translationsStateMassive: string[]
    setTranslationsStateMassive: (e: string[])=>void
    funcMassive: any[]
    setFunmassive: ([]:any)=>void
    setFilterBarActive: (e:boolean)=> void;
    FilterBarActive: boolean;

}

const ToggleContext = createContext<ToggleContextProps | undefined>(undefined);


const ToggleProvider: FC<ToggleProviderProps> = ({ children }) => {

    const [MobileNavBarActive, setMobileNavBarActive] = useState(false);
    const [TranslationsSideBarActive, setTranslationsSideBarActive] = useState<boolean>(false);
    const [translationsStateMassive, setTranslationsStateMassive] = useState<string[]>([]);
    const [funcMassive, setFunmassive] =useState<any[]>([])
    const [FilterBarActive, setFilterBarActive] = useState(false);

    return (
        <ToggleContext.Provider value={{
            MobileNavBarActive,
            setMobileNavBarActive,
            TranslationsSideBarActive,
            setTranslationsSideBarActive,
            translationsStateMassive,
            setTranslationsStateMassive,
            funcMassive,
            setFunmassive,
            setFilterBarActive,
            FilterBarActive,
        }}>
            {children}
        </ToggleContext.Provider>
    );
};

export { ToggleContext, ToggleProvider };