import React, {useState} from 'react';
import cl from '../modules/AnimeContent.module.css'
import SortingContent from "./SortingContent";
import AnimeItem from "./AnimeItem";
import AdpativeFilters from "./AdpativeFilters";


 interface AnimeContentInterface{
     header: string
 }


const AnimeContent = ({header}:AnimeContentInterface ) => {
    const [SetkaGridActive, setSetkaGridActive] = useState("2x3");

    return (
        <div className={cl.container}>
            <div className={cl.content_container}>
                <div className={cl.content}>
                    <div className={cl.Header}>
                        <h1>{header}</h1>
                    </div>
                    <SortingContent SetkaGridActive={SetkaGridActive} setSetkaGridActive={setSetkaGridActive} />
                    <div className= {SetkaGridActive === "2x3" ? cl.AnimeWContent2x3 : SetkaGridActive === "3x3" ? cl.AnimeWContent3x3 : cl.AnimeWContent2x2}>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"} secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"} secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"} secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"} secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"} secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"} secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"} secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"} secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"} secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"} secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"} secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"} secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"} secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                        <AnimeItem SetkaGridActive={SetkaGridActive} name={"Этот не совершенный мир"} secondName={"Kono Sekai wa Fukanzen Sugiru"}/>
                    </div>
                </div>
                    <AdpativeFilters/>
            </div>
        </div>
    );
};

export default AnimeContent;