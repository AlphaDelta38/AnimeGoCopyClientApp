import React, {CSSProperties, useContext, useEffect, useState} from 'react';
import cl from '../modules/AnimeChooseContentModules/AnimeContent.module.css'
import SortingContent from "./SortingContent";
import AnimeItem from "./AnimeItem";
import AdpativeFilters from "./AdpativeFilters";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";
import {getAllAnimeItems} from "../../http/AnimePageItemApi";
import {getALlAnimeItems} from "../../types";


 interface AnimeContentInterface{
     header: string
     SortingContentDisable?: boolean
     SearchButtonAvaible?: boolean
     styles?: CSSProperties
 }


const AnimeContent = ({header, SortingContentDisable, SearchButtonAvaible, styles}:AnimeContentInterface ) => {
    const [SetkaGridActive, setSetkaGridActive] = useState("2x3");
    const {MobileNavBarActive, setMobileNavBarActive, setFilterBarActive, FilterBarActive}:ToggleContextProps = useContext(ToggleContext)!
    const [rednerMassive, setRenderMassive] = useState<getALlAnimeItems[]>([])


    async function getALlAnimeItems(){
        const response = await getAllAnimeItems()
        if(response){
            setRenderMassive(response)
        }
        console.log(response)
    }



    useEffect(()=>{
        getALlAnimeItems()
    }, [])


    return (
        <div style={MobileNavBarActive ? { transform:"translate3d(var(--translate-value), 0, 0)", ...styles,} : {...styles}} className={cl.container}>
            <div className={cl.content_container}>
                <div className={cl.content}>
                    <div className={cl.Header}>
                        <h1>{header}</h1>
                    </div>
                    <SortingContent SortingContentDisable={SortingContentDisable}
                                    setFilterBarActive={setFilterBarActive} SetkaGridActive={SetkaGridActive}
                                    setSetkaGridActive={setSetkaGridActive}/>
                    <div className={SetkaGridActive === "2x3" ? cl.AnimeWContent2x3 : SetkaGridActive === "3x3" ? cl.AnimeWContent3x3 : cl.AnimeWContent2x2}>
                        {
                            rednerMassive.map((value,index)=>
                                <AnimeItem key={index}
                                           id={value.id}
                                           imagePath={value.imagePath}
                                           name={value.mainName}
                                           secondName={value.secondName ? value.secondName : ""}
                                           desctiption={value.description}
                                           SetkaGridActive={SetkaGridActive} type={"Тв сериал"}
                                           year={value.createdAt.slice(0,4)}
                                            genres={value.genres ? [...value.genres.map((value)=>value.genre)] : [""]}
                                />
                            )
                        }
                    </div>
                    <div style={SearchButtonAvaible ? {} : {display: "none"}} className={cl.ButtonANimeContent}>
                        <button>Весь список аниме</button>
                    </div>
                </div>
                <div  className={cl.FilterContainer}>
                    <AdpativeFilters SearchButtonAvaible={SearchButtonAvaible}/>
                </div>
            </div>
        </div>
    );
};

export default AnimeContent;