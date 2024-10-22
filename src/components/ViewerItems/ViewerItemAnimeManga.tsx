import React, {ReactNode, useEffect, useState} from 'react';
import cl from '../modules/ViewerItemsModules/ViewerItemAnimeManga.module.css'
import InfoToolTip from "../AdditionalComponents/InfoToolTip";
import RedirectionText from "../AnimePage/RedirectionText";
import TextWithAdditionalInfo from "../AdditionalComponents/TextWithAdditionalInfo";
import {getOneAnimePage} from "../../http/AnimePageItemApi";
import {getALlAnimeItems, ScheduleItemType} from "../../types";
import {animeItemsInerface, getNamesOfSeriesAndDateOfOut} from "../../http/anilibriaApi";
import {Months} from "../../util/CurrentDate";


interface ViewerItemAnimeManga{
    id?: number
    type:string
}

const ViewerItemAnimeManga = ({id,type}:ViewerItemAnimeManga) => {

    const [hidingBtnActive, setHidingBtnActive] = useState(false);
    const [dataOfAnime, setDataOfAnime] = useState<getALlAnimeItems>();
    const  [seriesData,setSeriesData] = useState<animeItemsInerface>();


    function getAdditionalInfo(type:string): ReactNode{
        let textWillReturn:string = "";
        if(type === "Манга"){
            textWillReturn = "Японские комиксы, иногда называемые комикку."
        }else if(type === "Манхва"){
            textWillReturn = "Корейские комиксы. Термин означает и анимационные мультфильмы, карикатуру, а за пределами Кореи обычно употребляется для обозначения исключительно корейских манг."
        }else if(type === "Ранобэ"){
            textWillReturn = "Ранобе, ранобэ — разновидность популярной японской литературы различных жанров (от любовных романов и научной фантастики до ужасов), " +
                "отличающейся преимущественно фантазийным сюжетом, обилием диалогов, иллюстрациями в стиле аниме и манга, " +
                "и ориентированной в основном на подростковую и юношескую аудиторию."
        }

        return <InfoToolTip cssProperties={{marginLeft:"4px"}} message={textWillReturn}/>
    }


    async function getAnimePage(){
        try {
            if(id){
                const data = await getOneAnimePage({id: id});
                if(data){
                    setDataOfAnime(data)

                }
            }
        }catch (e){

        }

    }

    async function getallSeriesInfo(){
        try {
            if(dataOfAnime?.mainName){
                const data: animeItemsInerface = await getNamesOfSeriesAndDateOfOut(dataOfAnime.mainName);
                setSeriesData(data)

            }
        }catch(e){

        }
    }


    useEffect(()=>{
        if(id !== 0 && !dataOfAnime?.mainName){
            getAnimePage();

        }
        if(dataOfAnime?.mainName){
            getallSeriesInfo();

        }
    }, [dataOfAnime])

    return (
        <div className={cl.container}>
            <div className={cl.contentContainer}>
                <div className={cl.header}>
                    <h4 className={cl.mainName}>{dataOfAnime?.mainName}</h4>
                    <ul className={cl.otherNames}>
                        <li>{dataOfAnime?.secondName}</li>
                    </ul>
                </div>
                <hr className={cl.hr}/>
                <div className={cl.descriptionContainer}>
                    <div style={hidingBtnActive ? {maxHeight:"100%"} : {}} className={cl.description}>
                        {dataOfAnime?.description}
                    </div>
                    <button style={dataOfAnime?.description ? dataOfAnime.description.length > 225 ? {} : {display:"none"} : {display:"none"}} className={cl.hidingBtn} onClick={()=>hidingBtnActive ? setHidingBtnActive(false) : setHidingBtnActive(true)}>
                        {hidingBtnActive ?
                            "Скрыть"
                            :
                            "Читать дальше"
                        }
                        <svg className={hidingBtnActive ? cl.closedIcon : cl.openIcon}>
                            <use xlinkHref={"/sprite.svg#ShevronIcon"}></use>
                        </svg>
                    </button>
                </div>
                <div className={cl.infoAboutItem}>
                    <dl className={cl.tableWithInfo}>
                        <dt>Тип</dt>
                        <dd>
                            {type}
                            {type !== "ТВ Сериал"
                                &&
                                getAdditionalInfo(type!)
                            }
                        </dd>
                        <dt>Эпизоды</dt>
                        <dd>
                            {Number(seriesData?.player.episodes.string.split("-")[1] ) === dataOfAnime?.lastEpisode!
                                ? seriesData?.player.episodes.string.split("-")[1]
                                : `${dataOfAnime?.lastEpisode!} / ${seriesData?.player.episodes.string.split("-")[1]}`
                            }
                        </dd>
                        <dt>Статус</dt>
                        <dd> <RedirectionText>{Number(seriesData?.player.episodes.string.split("-")[1]) === dataOfAnime?.lastEpisode! ? "Вышел" : "Онгоинг"}</RedirectionText></dd>
                        <dt>Жанр</dt>
                        <dd>
                            {dataOfAnime?.genres.map((value)=>
                                <RedirectionText>{value.genre},</RedirectionText>
                            )}
                        </dd>
                        <dt>Первоисточник</dt>
                        <dd>{dataOfAnime?.originalSource}</dd>
                        <dt>Сезон</dt>
                        <dd><RedirectionText>{dataOfAnime?.season.season ? dataOfAnime.season.season : ""}</RedirectionText></dd>
                        <dt>Выпуск</dt>
                        <dd>с
                            {  seriesData &&
                            `
                            ${ new Date(seriesData?.player.list[1].created_timestamp!).getDate()}
                            ${Months[new Date(seriesData?.player.list[1].created_timestamp!).getMonth() + 1]}
                            ${new Date(seriesData?.player.list[1].created_timestamp!*1000).getFullYear()}
                            `
                        }
                        </dd>
                        <dt>Студия</dt>
                        <dd><RedirectionText>{dataOfAnime?.studio.studios}</RedirectionText></dd>
                        <dt>Рейтинг MPAA
                            <span className={cl.raitingMpaaSpanForHide}>
                                <InfoToolTip cssProperties={{marginLeft: "6px"}}
                                             message={"Принятая в США система оценки содержания фильма, введённая Американской киноассоциацией (MPAA). Для расшифровки значений иконки, наведите на нее курсор мыши."}/>
                            </span>
                        </dt>
                        <dd>
                            <TextWithAdditionalInfo mainstyles={{maxHeight: "28px",color:"black"}}
                                                    textAbove={"дети до 13 лет допускаются на фильм только с родителями"}
                                                    title={`PG-${dataOfAnime?.raitingMPAA}`}/>
                        </dd>
                        <dt>Длительность</dt>
                        <dd>{dataOfAnime?.duration} мин. ~ серия</dd>
                        <dt>Озвучка <InfoToolTip cssProperties={{marginLeft: "4px"}}
                                                 message={"Создаётся в основном любителями-фандабберами, зачастую при помощи лишь микрофона, компьютера и текста."}/>
                        </dt>
                        <dd>
                            {dataOfAnime?.voiceOvers.map((value)=>
                                <RedirectionText>{value.name},</RedirectionText>
                            )}
                        </dd>
                        <dt style={{marginTop:"1rem"}}>Снят по манге</dt>
                        <dd style={{marginTop:"1rem"}}>DADADA</dd>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default ViewerItemAnimeManga;