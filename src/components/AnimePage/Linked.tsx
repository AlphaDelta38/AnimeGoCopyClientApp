import React, {FC} from 'react';
import cl from '../modules/AnimePageModules/Linked.module.css'
import MiniWindowPage from "../AdditionalComponents/MiniWindowPage";
import ViewerItemCharacter from "../ViewerItems/ViewerItemCharacter";
import ViewerItemAnimeManga from "../ViewerItems/ViewerItemAnimeManga";
import {getAllLinkedCharactersInterface} from "../../types";
import {useNavigate} from "react-router-dom";


 export interface LinkedItemsProps{
    type: string
    year: string
    timeline?: string
    episodes?: number
}

interface LinkedInterface{
     Items: getAllLinkedCharactersInterface
}






const Linked: FC<LinkedInterface> = ({Items}) => {


    const navigate = useNavigate()

    function paginationFunct(id: number){
        navigate(`/anime/${id}`)
    }


    return (
        <div className={cl.container}>
            <div className={cl.title}>Связанное</div>
            <div className={cl.linkedContentContainer}>
                {Items &&
                    <div  className={cl.linkedItem}>
                        <div className={cl.linkedItem__title}>{Items.manga.name}</div>
                        <div className={cl.linkedMediaContainer}>
                            <div  className={cl.posterContainer}>
                                <MiniWindowPage
                                    styles={{width: "100%", height: "72px", display: "block"}}
                                    title={<img
                                        src={`${process.env.REACT_APP_API_URL}/${Items.manga.image}`}
                                        alt={""} width={"100%"} height={"100%"} style={{objectFit: "cover"}}/>}
                                    basicState={"right"}
                                >
                                    <ViewerItemAnimeManga id={Items.manga.mangeId} type={"Манга"}/>
                                </MiniWindowPage>
                            </div>
                            <div className={cl.linkeditem__info}>
                                <div className={cl.infotText}>{`${"Манга"}` + " / " + `${Items.manga.realeseDate}`}</div>
                                    <div className={cl.infotText}>Адаптация</div>
                            </div>
                        </div>
                    </div>
                }
                {Items && Items.anime.map((value, index) =>
                    <div key={index + value.year} className={cl.linkedItem}>
                        <div className={cl.linkedItem__title}>{value.name}</div>
                        <div className={cl.linkedMediaContainer}>
                            <div onClick={()=>paginationFunct(Number(value.animeId))} className={cl.posterContainer}>
                                <MiniWindowPage
                                    styles={{width: "100%", height: "72px", display: "block"}}
                                    title={<img
                                        src={`${process.env.REACT_APP_API_URL}/${value.image}`}
                                        alt={""} width={"100%"} height={"100%"} style={{objectFit: "cover"}}/>}
                                    basicState={"right"}
                                >
                                    <ViewerItemAnimeManga id={value.animeId} type={"Тв Сериал"}/>
                                </MiniWindowPage>
                            </div>
                            <div className={cl.linkeditem__info}>
                                <div className={cl.infotText}>{`${"Тв Сериал"}` + " / " + `${value.year}`}</div>
                                {value.episodes ?
                                    <div className={cl.infotText}>{`${value.episodes} эпизодов`}</div>
                                    :
                                    <div className={cl.infotText}>Адаптация</div>
                                }
                                {value.chrono && <div className={cl.infotText}>{`${value.chrono}`}</div>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Linked;