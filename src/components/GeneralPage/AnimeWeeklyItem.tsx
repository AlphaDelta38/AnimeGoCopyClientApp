import React from 'react';
import cl from "../modules/GeneralPageModules/WeeklyItem.module.css"
import {WeeklyOjbectInterface} from "../../types";



const AnimeWeeklyItem = ({imgUrl, animeName, episode, additional}:WeeklyOjbectInterface) => {


    return (
        <div className={cl.AnimeWeeklyItemContainer}>
            <div className={cl.imgContainer}>
                <img width="100%" height="100%" src={`${imgUrl}`} alt={""}/>
            </div>
            <div className={cl.ItemInfoContainer}>
                <div className={cl.name}>
                    {animeName}
                </div>
                <div className={cl.AdditionalInfo}>
                    <div className={cl.Episode}>
                        {`${episode} серия`}
                    </div>
                    <div className={cl.AdaptiveInfo}>
                        {`(${additional})`}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AnimeWeeklyItem;