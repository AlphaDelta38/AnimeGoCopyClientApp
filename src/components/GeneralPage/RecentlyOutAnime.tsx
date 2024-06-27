import React from 'react';
import cl from  '../modules/RecentlyOutAnime.module.css'
import {RecentlyItemOjbectsInterface} from "../../types";




interface  RecentlyOutAnimeInterface{
    objects: RecentlyItemOjbectsInterface[]
}



const RecentlyOutAnime = ({objects}:RecentlyOutAnimeInterface) => {
    return (

        <div className={cl.container}>
            <div className={cl.Header}>
                <div>
                    Недавно вышедшие аниме
                </div>
                <div>
                    Все
                </div>
            </div>
            {objects.map((value,index) =>
                <div key={value.name.length + index} className={cl.mediaContainer}>
                    <div className={cl.row}>
                        <div className={cl.imgContainer}><img width="58px" height="84px " src={value.imgUrl} alt=""/></div>
                        <div className={cl.additionalInfo}>
                            <div>
                                {value.name}
                            </div>
                            <div>
                                {value.janrs.map((value,index,array) => index+1 === array.length ? `${value}` : `${value} / ` )}
                            </div>
                            <div>
                                {`${value.episode} эпизодов`}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default RecentlyOutAnime;