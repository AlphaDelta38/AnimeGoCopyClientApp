import React from 'react';
import cl from '../modules/ViewerItemsModules/VoiceOverItem.module.css'
import InfoToolTip from "../AdditionalComponents/InfoToolTip";
import {calculateAge} from "../../util/CurrentDate";
import MiniWindowPage from "../AdditionalComponents/MiniWindowPage";
import ViewerItemAnimeManga from "./ViewerItemAnimeManga";




const VoiceOverItem = () => {

    return (
        <div className={cl.container}>
            <div className={cl.header}>
                <h4 className={cl.mainName}>Кохэй Амасаки</h4>
                <ul className={cl.othernames}>
                    <li>Amasaki Kouhei</li>
                    <li>天崎滉平</li>
                </ul>
            </div>
            <div className={cl.contentContainer}>
                <div className={cl.imgContainer}>
                    <img src={"https://animego.org/upload/people/6605352a30076948084082.jpg"} alt={""} width={"100%"} height={"100%"}/>
                </div>
                <div className={cl.content}>
                    <dl className={cl.aboutPersonContainer}>
                        <dt className={cl.personInfoItemDT}>Карьера</dt>
                        <dd className={cl.personInfoItemDD}>
                            Сейю
                            <InfoToolTip cssProperties={{marginLeft:"4px"}} message={"Актёры-сэйю, озвучивавшие персонажей аниме."}/>
                        </dd>
                        <dt className={cl.personInfoItemDT}>Дата рождения</dt>
                        <dd className={cl.personInfoItemDD}>22 октября 1990  {`(${calculateAge("22 октября 1990")})`}</dd>
                    </dl>
                    <div className={cl.lastProject}>
                        <h6 className={cl.textForLastProject}>Последние роли</h6>
                        <div className={cl.lastProjectItemContainer}>
                            <div className={cl.lastProjectItem}>
                                <div className={cl.lastAnimeContainer}>
                                    <MiniWindowPage styles={{minHeight:"60px"}} title={
                                        <img  width={"100%"} height={"100%"} src={"https://animego.org/media/cache/thumbs_60x80/upload/anime/images/668bb6719b398536161167.jpg"} alt={""}/>
                                    } basicState={"right"}
                                    >
                                        <ViewerItemAnimeManga type={"ТВ Сериал"}/>
                                    </MiniWindowPage>
                                </div>
                                <div className={cl.lastGeneralPersonContainer}>
                                    <img src={"https://animego.org/media/cache/thumbs_120x160/upload/character/6683cec0a5b4c034847508.jpg"} alt={""} width={"100%"} height={"100%"}/>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoiceOverItem;