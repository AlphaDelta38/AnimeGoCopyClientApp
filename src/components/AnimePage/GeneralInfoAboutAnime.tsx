import React from 'react';
import cl from '../modules/AnimePageModules/GeneralInfoAboutAnime.module.css'
import InfoToolTip from "../AdditionalComponents/InfoToolTip";
import TextWithAdditionalInfo from "../AdditionalComponents/TextWithAdditionalInfo";
import RedirectionText from "./RedirectionText";
import MiniWindowPage from "../AdditionalComponents/MiniWindowPage";
import VoiceOverItem from "../ViewerItems/VoiceOverItem";
import {charactersAnime} from "../../types";
import ViewerItemAnimeManga from "../ViewerItems/ViewerItemAnimeManga";
import ViewerItemCharacter from "../ViewerItems/ViewerItemCharacter";


interface GeneralInfoAboutAnimeInterface{
    episodes: number,
    status: string,
    ganres: string[],
    originalSource: string,
    season: string,
    studio: string,
    raitingMPAA: number,
    ageLimit: number,
    duration: number,
    characters: charactersAnime[]
    titleManga: string,
    idManga: number

}

const GeneralInfoAboutAnime = ({duration, ageLimit, originalSource,raitingMPAA, season,status,studio, episodes,ganres, characters, idManga,titleManga}:GeneralInfoAboutAnimeInterface) => {




    return (
        <dl className={cl.tableData}>
            <dt>
                Следующий эпизод
                <span>
                    <InfoToolTip cssProperties={{marginLeft: "4px"}} width={18} height={18} message={"Указана дата выхода Эпизода на телеэкранах Японии. На сайте появится в течении нескольких часов"}/>
                </span>
            </dt>
            <dd>
                <TextWithAdditionalInfo textAbove={"Через 6 дней"} title={"7 авг. 2024 ср 17.30"}/>
                ожидается выход 6 серии
            </dd>
            <dd className={cl.hr}></dd>
            <dt>Тип</dt>
            <dd>ТВ Сериал</dd>
            <dt>Эпизоды</dt>
            <dd>{episodes}</dd>
            <dt>Статус</dt>
            <dd>
                <RedirectionText>{status}</RedirectionText>
            </dd>
            <dt>Жанр</dt>
            <dd>
                {ganres &&
                    ganres.map((value)=><RedirectionText>{value},</RedirectionText>)
                }
            </dd>
            <dt>Первоисточник</dt>
            <dd>{originalSource}</dd>
            <dt>Сезон</dt>
            <dd>
                <RedirectionText>{season}</RedirectionText>
            </dd>
            <dt>Выпуск</dt>
            <dd>с 3 июля 2024</dd>
            <dt>Студия</dt>
            <dd>
                <RedirectionText>{studio}</RedirectionText>
            </dd>
            <dt>Рейтинг MPAA
                <span className={cl.raitingMpaaSpanForHide}><InfoToolTip cssProperties={{marginLeft:"6px"}} message={"Принятая в США система оценки содержания фильма, введённая Американской киноассоциацией (MPAA). Для расшифровки значений иконки, наведите на нее курсор мыши."}/></span>
            </dt>
            <dd>
                <TextWithAdditionalInfo mainstyles={{maxHeight:"24px"}} textAbove={"дети до 13 лет допускаются на фильм только с родителями"} title={`PG-${raitingMPAA}`}/>
            </dd>
            <dt>Возрастные ограничения</dt>
            <dd>
                <span style={{background:"black", borderRadius:"8px", color:"white", padding:"0 6px 0 6px", fontWeight:"700", maxHeight:"24px"}}>{ageLimit}+</span>
            </dd>
            <dt>
                Длительность
            </dt>
            <dd>{duration} мин. ~ серия</dd>
            <dt style={{marginTop:"10px"}}>Снят по ранобэ</dt>
            <dd style={{marginTop:"10px"}}>
                <MiniWindowPage basicState={"bottom"} title={titleManga}>
                    <ViewerItemAnimeManga id={idManga} type={"Manga"}/>
                </MiniWindowPage>
            </dd>
            <dt>Главные герои</dt>
            <dd style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
                {
                    characters.map((value) =>
                            <div className={cl.generalPerson}>
                                <MiniWindowPage title={value.name} basicState={"top"}><ViewerItemCharacter id={value.id}/></MiniWindowPage>
                                <span  style={ value.voicer ? {marginLeft: "6px"} : {display:"none"}}>
                                    (озвучивает <MiniWindowPage title={value.voicer?.name} basicState={"top"}><VoiceOverItem id={value.voicer?.id ? value.voicer.id : 0}/></MiniWindowPage>)
                                </span>
                            </div>
                    )
                }
            </dd>
        </dl>

    );
};

export default GeneralInfoAboutAnime;