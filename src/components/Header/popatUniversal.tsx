import React from 'react';
import cl from "../modules/Header.module.css"
import {ObjectsType} from "./WithLoginBar";



interface PopatUniversalInterface {
    Title: string
    objects?: []
    message: string
    active:boolean
    type:string
    distanse: ObjectsType.friendsDistanse
}



const PopatUniversal = ({Title,objects, message , active, type,distanse}:PopatUniversalInterface) => {



    return (
        <div style={{right: `${distanse}px`}} className={active ? cl.containerPopatActive : cl.containerPopat  }>
            <div className={cl.HeaderPopat}>
                <h5>{Title}</h5>
            </div>
            <div  className={cl.ContentPopat}>
                {message}
            </div>
            <div className={cl.btnContainerPopat}>
                <div>
                    <button>Показать все</button>
                </div>
            </div>
        </div>
    );
};

export default PopatUniversal;