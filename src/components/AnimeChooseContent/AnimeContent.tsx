import React, {CSSProperties, useState} from 'react';
import cl from '../modules/AnimeChooseContentModules/AnimeContent.module.css'
import SortingContent from "./SortingContent";
import AnimeItem from "./AnimeItem";
import AdpativeFilters from "./AdpativeFilters";


 interface AnimeContentInterface{
     header: string
     setFilterBarActive: (e:boolean)=>void
     SortingContentDisable?: boolean
     SearchButtonAvaible?: boolean
     styles?: CSSProperties
 }


const AnimeContent = ({header, setFilterBarActive, SortingContentDisable, SearchButtonAvaible, styles}:AnimeContentInterface ) => {
    const [SetkaGridActive, setSetkaGridActive] = useState("2x3");

    return (
        <div style={styles} className={cl.container}>
            <div className={cl.content_container}>
                <div className={cl.content}>
                    <div className={cl.Header}>
                        <h1>{header}</h1>
                    </div>
                    <SortingContent SortingContentDisable={SortingContentDisable}
                                    setFilterBarActive={setFilterBarActive} SetkaGridActive={SetkaGridActive}
                                    setSetkaGridActive={setSetkaGridActive}/>
                    <div
                        className={SetkaGridActive === "2x3" ? cl.AnimeWContent2x3 : SetkaGridActive === "3x3" ? cl.AnimeWContent3x3 : cl.AnimeWContent2x2}>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"}
                                   secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"}
                                   secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"}
                                   secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"}
                                   secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"}
                                   secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"}
                                   secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"}
                                   secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"}
                                   secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"}
                                   secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"}
                                   secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"}
                                   secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"}
                                   secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"}
                                   secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"}
                                   secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
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