import React, {useContext, useEffect, useState} from 'react';
import cl from '../modules/AnimePageModules/TranslationsSideBar.module.css'
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";


interface TranslationsSideBarInterface{

}

const TranslationsSideBar = () => {
    const {funcMassive, translationsStateMassive,}:ToggleContextProps = useContext(ToggleContext)!
    const [activeChooseBtn, setActiveChooseBtn] = useState<string>("translations")
    const [currentTranslation, setCurrentTranslation] = useState<string>(funcMassive[1])

    function setTranslation(e:string){
        setCurrentTranslation(e)
        funcMassive[0](e)
    }

    return (
        <div className={cl.container}>
            <div className={cl.chooseBtn}>
                <span onClick={()=>setActiveChooseBtn("translations")} style={activeChooseBtn === "translations" ? {backgroundColor:"#434343"} : {}}>Озвучка</span>
                <span onClick={()=>setActiveChooseBtn("player")} style={activeChooseBtn === "player" ? {backgroundColor:"#434343"} : {}}>Плеер</span>
            </div>
            <div className={cl.itemContainer}>
                {activeChooseBtn === "translations" &&
                translationsStateMassive.map((value, index, array)=>
                    <span key={index} style={currentTranslation === value ? {backgroundColor:"#ff5c57",cursor:"default"} : {}} onClick={()=>setTranslation(value)}>{value}</span>
                )}
                {activeChooseBtn === "player" &&
                    <span style={{backgroundColor:"#ff5c57",cursor:"default"}}>Kodik</span>
                }
            </div>
        </div>
    );
};

export default TranslationsSideBar;