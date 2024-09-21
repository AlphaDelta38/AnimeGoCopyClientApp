import React from 'react';
import cl from '../modules/AnimeChooseContentModules/TypeInfoAnime.module.css'


interface TypeInfoAnimeInterface{
    type:string
    year: string
    ganres: string[]
    SetkaGridActive: string
}




const TypeInfoAnime = ({type, year, ganres, SetkaGridActive}:TypeInfoAnimeInterface) => {
    return (

        <div style={SetkaGridActive === "3x3" ? {order: 3} : {}} className={cl.container}>
            <div className={cl.hoverEffects}>
                {type}
            </div>
            <span>/</span>
            <div className={cl.hoverEffects}>
                {year}
            </div>
            <span style={SetkaGridActive === "3x3" ? {display: "none"} : {}}>/</span>
            <div className={cl.ganresContainer} style={SetkaGridActive === "3x3" ? {display: "none"} : {}}>
                {ganres.map((value,index)=><span key={index+value.length}>{`${value},`}</span>)}
            </div>
        </div>
    );
};

export default TypeInfoAnime;