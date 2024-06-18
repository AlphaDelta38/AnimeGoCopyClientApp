import React from 'react';
import cl from '../modules/TypeInfoAnime.module.css'


interface TypeInfoAnimeInterface{
    type:string
    year: string
    ganres: string[]
    SetkaGridActive: string
}




const TypeInfoAnime = ({type, year, ganres, SetkaGridActive}:TypeInfoAnimeInterface) => {
    return (

        <div style={SetkaGridActive === "3x3" ? {order: 3} : {}} className={cl.container}>
            <div>
                {type}
            </div>
            <span>/</span>
            <div>
                {year}
            </div>
            <span style={SetkaGridActive === "3x3" ? {display: "none"} : {}}>/</span>
            <div style={SetkaGridActive === "3x3" ? {display: "none"} : {}}>
                {ganres.map((value,index)=><span key={index+value.length}>{`${value},`}</span>)}
            </div>
        </div>
    );
};

export default TypeInfoAnime;