import React from 'react';
import {MessegesInterface} from "../../types";
import cl from '../modules/HeaderModules/Messeges.module.css'


const MessegesComponent = (obj : MessegesInterface) => {
    return (
        <div className={cl.MessegeContainer}>
            <div className={cl.ImageContainer}>
                <img style={{borderRadius: "50%"}} width="100%" height="100%" src={' https://animego.org/media/cache/thumbs_60x60/upload/anime/images/662d1d89c4a1d034870587.jpg'}/>
            </div>
            <div className={cl.InfoContainer}>
                <div>
                    {"Аниме"} <span style={{fontWeight: "600"}}>{obj.AnimeName}</span>
                    {` - добавлена ${obj.NofSeries}-я серия с русской озвучкой ${obj.VoiceOver}`}
                </div>
                <div style={{position:"relative", display: "flex"}} >
                    {obj.when}
                </div>
            </div>
        </div>
    );
};

export default MessegesComponent;