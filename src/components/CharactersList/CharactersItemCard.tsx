import React, {MouseEventHandler, useEffect, useRef, useState} from 'react';
import cl from "../modules/CharactersList.module.css";
import AdaptiveViewer from "./AdaptiveViewer";
import AnimeItem from "../AnimeChooseContent/AnimeItem";
import ViewerItemCharacter from "../ViewerItems/ViewerItemCharacter";




interface CharactersItemCardInterface{
    name:string
    ImgUrl:string
}









const CharactersItemCard= ({name, ImgUrl}:CharactersItemCardInterface) => {

    const [functions, setFunctions] = useState<Function[]>([])




    return (
            <div   className={cl.CharactersItem}>
                <div   onMouseLeave={(e)=>functions[1](e)}  onMouseOver={(e)=>functions[0](e)} className={cl.ImgContainer}>
                    <AdaptiveViewer  right={true} top={false} setFunctions={setFunctions}><ViewerItemCharacter/></AdaptiveViewer>
                    <img  width="100%" height="100%" src={`${ImgUrl}`} alt={""}/>
                </div>
                <div className={cl.name}>
                    {name}
                </div>
            </div>
    );
};

export default CharactersItemCard;