import React from 'react';
import cl from "../modules/HeaderModules/Header.module.css"
import {ObjectsType} from "./WithLoginBar";
import { getAllFriensRequest, userMessagesInterface} from "../../types";
import MessegesComponent from "./MessegesComponent";
import FriendRequest from "./FriendRequest";



interface PopatUniversalInterface {
    Title: string,
    objects?: userMessagesInterface[],
    objects2?: getAllFriensRequest[],
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
                {
                    type === ObjectsType.messeges &&
                    objects?.map((value, index, array)=>
                        <MessegesComponent key={index+array.length}  id={value.id} imgUrl={value.animeImgUrl} AnimeName={value.name} isSaw={false} NofSeries={value.number}  VoiceOver={value.voiceOver} when={value.howLongBefore}/>
                    )
                }
                {type === ObjectsType.friends &&
                    objects2?.map((value, index, array)=><FriendRequest  profilePhoto={value.user[0].profilePhoto} id={value.user[0].id} friendName={value.user[0].name}  key={index+array.length} />)
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