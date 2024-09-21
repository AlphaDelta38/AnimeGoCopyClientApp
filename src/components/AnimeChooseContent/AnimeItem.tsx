import React from 'react';
import cl from '../modules/AnimeChooseContentModules/AnimeItem.module.css'
import TypeInfoAnime from "./TypeInfoAnime";
import {useNavigate} from "react-router-dom";



interface AnimeItemInterface {
    name: string
    secondName: string
    SetkaGridActive:string
    desctiption?: string
    type: string,
    year: string,
    genres?: string[],
    imagePath?: string,
    id:number
}





const AnimeItem = ({name, secondName, SetkaGridActive, genres,imagePath, year, type,desctiption, id}: AnimeItemInterface) => {

    const navigate = useNavigate()

    return (
        <div  style={SetkaGridActive === '3x3' ? {flex: "25%"} : SetkaGridActive === '2x2'  ? {flex: "50%"} :  {flex: "100%"}  } className={ SetkaGridActive === '3x3' ? cl.container3x3 : SetkaGridActive === '2x2'  ? cl.container2x2 :  cl.container }>
            <div className={SetkaGridActive === "2x3" ? cl.content : SetkaGridActive === "2x2" ? cl.content : cl.content3x3 }>
                <div className={SetkaGridActive === "2x3" ? cl.imageContainer : SetkaGridActive === "2x2" ? cl.imageContainer2x2 : cl.imageContainer3x3 }>
                    <div onClick={()=>navigate(`/anime/${id}`)} style={imagePath ? {backgroundImage:`url(${process.env.REACT_APP_API_URL}/${imagePath})`} : {}} className={cl.Image}>

                    </div>
                </div>
                <div className={cl.InfoContent}>
                    <div onClick={()=>navigate(`/anime/${id}`)} style={SetkaGridActive === "3x3" ? {order: 2} : {}} className={cl.Name}>
                        {name}
                    </div>
                    <div style={SetkaGridActive === "3x3" ? {order: 1, marginTop: "10px"} : {}} className={cl.SecondName}>
                        {secondName}
                    </div>
                    <TypeInfoAnime SetkaGridActive={SetkaGridActive} type={type} year={year} ganres={genres ? genres : []}/>
                    <div className={cl.descriptionContainer} style={SetkaGridActive === "3x3" || SetkaGridActive === "2x2" ? {display: "none"} : {marginTop: "10px", overflow: "hidden", maxHeight: "96px", textOverflow: "ellipsis", }}>
                        {desctiption ? desctiption : ""}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimeItem;