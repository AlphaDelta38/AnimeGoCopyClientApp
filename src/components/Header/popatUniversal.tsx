import React from 'react';
import cl from "../modules/Header.module.css"
import {ObjectsType} from "./WithLoginBar";
import {FriendsRequestInterface, MessegesInterface} from "../../types";
import MessegesComponent from "./MessegesComponent";
import FriendRequest from "./FriendRequest";



interface PopatUniversalInterface {
    Title: string,
    objects?: MessegesInterface[],
    objects2?: FriendsRequestInterface[],
    message: string,
    active:boolean,
    type:string,
    distanse: ObjectsType.friendsDistanse,
}



const PopatUniversal = ({Title,objects,objects2, message , active, type,distanse}:PopatUniversalInterface) => {





    return (
        <div style={{right: `${distanse}px`}} className={active ? cl.containerPopatActive : cl.containerPopat  }>
            <div className={cl.HeaderPopat}>
                <h5>{Title}</h5>
            </div>
            <div  style={ objects || objects2 ? {} : {justifyContent: "center", textAlign: "center"}} className={cl.ContentPopat}>
                {  objects
                    ?
                    objects?.map((value, index, array)=><MessegesComponent key={index+array.length} AnimeName={value.AnimeName} isSaw={value.isSaw} NofSeries={value.NofSeries} VoiceOver={value.VoiceOver} when={value.when} />)
                    :
                    objects2
                        ?
                        objects2?.map((value, index, array)=><FriendRequest friendName={value.friendName}  key={index+array.length} />)
                        :
                        message
                }
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