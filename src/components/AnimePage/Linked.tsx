import React, {FC} from 'react';
import cl from '../modules/AnimePageModules/Linked.module.css'
import MiniWindowPage from "../AdditionalComponents/MiniWindowPage";
import ViewerItemCharacter from "../ViewerItems/ViewerItemCharacter";
import ViewerItemAnimeManga from "../ViewerItems/ViewerItemAnimeManga";


 export interface LinkedItemsProps{
    type: string
    year: string
    timeline?: string
    episodes?: number
}

interface LinkedInterface{
     Items: LinkedItemsProps[]
}


const Linked: FC<LinkedInterface> = ({Items}) => {
    return (
        <div className={cl.container}>
            <div className={cl.title}>Связанное</div>
            <div className={cl.linkedContentContainer}>
                {Items.map((value,index) =>
                    <div key={index+value.year} className={cl.linkedItem}>
                        <div className={cl.linkedItem__title}>Башня Бога</div>
                        <div className={cl.linkedMediaContainer}>
                            <div className={cl.posterContainer}>
                                <MiniWindowPage
                                    styles={{width: "100%", height: "72px", display: "block"}}
                                    title={<img
                                        src={"https://img.freepik.com/free-photo/medium-shot-anime-characters-hugging_23-2150970855.jpg"}
                                        alt={""} width={"100%"} height={"100%"} style={{objectFit: "cover"}}/>}
                                    basicState={"right"}
                                >
                                    <ViewerItemAnimeManga type={"Манхва"}/>
                                </MiniWindowPage>
                            </div>
                            <div className={cl.linkeditem__info}>
                                <div className={cl.infotText}>{`${value.type}` + " / " + `${value.year}`}</div>
                                {value.episodes ?
                                    <div className={cl.infotText}>{`${value.episodes} эпизодов`}</div>
                                    :
                                    <div className={cl.infotText}>Адаптация</div>
                                }
                                {value.timeline && <div className={cl.infotText}>{`${value.timeline}`}</div>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Linked;