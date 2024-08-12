import React, {useEffect, useState} from 'react';
import cl from '../modules/AnimePageModules/AnimePage.module.css'
import InPeopleListAnime from "./InPeopleListAnime";
import HeaderGeneralInfo from "./HeaderGeneralInfo";
import GeneralInfoAboutAnime from "./GeneralInfoAboutAnime";
import PhotoAndVideowiever from "./PhotoAndVideowiever";
import Linked, { LinkedItemsProps} from "./Linked";






const AnimePage = () => {

    const [chosenWatchStatuses, setChosenWatchStatuses] = useState<string>("none");
    const [openStatusMenu, setOpenStatusMenu] = useState<boolean>(false);
    const temporaryForStatistic = [
        {title:"В списках у людей"},
        {ColumNameOne: "Пользователей", ColumNameTwo: "Процент" , ColumNameThree: "Список", styles:[{fontWeight:"400"},{},{fontWeight:"400"}]},
        {ColumDateOne: "8603", ColumDateTwo: "72.3" , ColumDateThree: "Запланировано", styles:[{fontWeight:"400"},{},{fontWeight:"400"}]},
        {ColumDateOne: "25083", ColumDateTwo: "0.4" , ColumDateThree: "Смотрю", styles:[{fontWeight:"400"},{},{fontWeight:"400"}]},
        {ColumDateOne: "151", ColumDateTwo: "0.4" , ColumDateThree: "Просмотрено", styles:[{fontWeight:"400"},{},{fontWeight:"400"}]},
        {ColumDateOne: "162", ColumDateTwo: "1.7" , ColumDateThree: "Брошено", styles:[{fontWeight:"400"},{},{fontWeight:"400"}]},
        {ColumDateOne: "609", ColumDateTwo: "24.8" , ColumDateThree: "Отложено",styles:[{fontWeight:"400"},{},{fontWeight:"400"}]},
        {footer: "В списках у 34648 человек"}
    ]

    const testImagesForViewer = [
        "https://img.freepik.com/free-photo/medium-shot-anime-characters-hugging_23-2150970855.jpg",
        "data:image/jpeg;base64,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",
        "https://img1.akspic.ru/previews/3/2/0/8/7/178023/178023-temnaya_ubijca_akame-akame-multik-ubijca_akame-rukav-550x310.jpg",
        "https://img1.akspic.ru/previews/1/9/3/4/6/164391/164391-rycari-multfilm-art-temnota-elektrik-550x310.jpg",
        "https://img1.akspic.ru/previews/1/5/2/4/6/164251/164251-illustracia-anime-cifrovoe_iskusstvo-atmosfera-oblako-550x310.jpg",
    ]

    const testVideoForViewer = [
    "https://www.youtube.com/embed/gS8puFPc0F0",
        "https://www.youtube.com/embed/t9GqF-oeIl0?si=ISm2G5Xee55DdoUj",
        "https://www.youtube.com/embed/26WmZyhobzs?si=Re5T-nNV3QkEpIg4",
    ]

    const LinkedTestMassive: LinkedItemsProps[] = [
        {type:"Манхва",year:"2010"},
        {type:"ТВ Сериал",year:"2010", timeline:"Предыстория", episodes: 12},
    ]


    function CheckActiveStatusMenu(){
        if(openStatusMenu){
            setOpenStatusMenu(false)
        }else{
            setOpenStatusMenu(true)
        }
    }



    useEffect(()=>{
            setOpenStatusMenu(false)
    }, [chosenWatchStatuses])

    return (
        <div className={cl.container}>
            <div className={cl.row}>
                <div className={cl.contentContainer}>
                    <div className={cl.headerContainer}>
                        <div className={cl.mainInfo}>
                            <div className={cl.sideImageAndActions}>
                                <div className={cl.imageContainer}>
                                    <img width="100%" height="100%" src={"https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg"} alt={""}/>
                                </div>
                                <div className={cl.actionsContainer}>
                                    <button className={cl.watchOnlineBtn}>
                                        <span className={cl.watchOnlineBtn__icon}><div></div></span>
                                        Смотреть онлайн
                                    </button>
                                    <button className={cl.writeFeedbackBtn}>
                                        <svg className={cl.penIcon} fill={"black"}>
                                            <use xlinkHref={"/sprite.svg#PenIcon"}></use>
                                        </svg>
                                        Написать отзыв
                                    </button>
                                    <div style={openStatusMenu ? {maxHeight: "400px",} : {}} className={cl.statusList}>
                                        <button style={chosenWatchStatuses !== "none" ? {display: "none"} : {}} onClick={() => CheckActiveStatusMenu()} className={cl.statusList__openerBtn}>
                                            <span>
                                                <svg width={"10px"} height={"10px"} fill={"black"} style={{marginRight: "8px"}}>
                                                    <use xlinkHref={"/sprite.svg#PlusIcon"}></use>
                                                </svg>
                                            </span>
                                            <span
                                                onClick={() => setChosenWatchStatuses("Watching")}>Добавить в список</span>
                                            <span>
                                                <svg width={"12px"} height={"12px"} fill={"black"} style={{transform: "rotate(90deg)", marginLeft: "8px"}}>
                                                    <use xlinkHref={"/sprite.svg#ShevronIcon"}></use>
                                                </svg>
                                            </span>
                                        </button>

                                        <button style={chosenWatchStatuses !== "Watching" ? {display: "none"} : {}} onClick={() => CheckActiveStatusMenu()} className={cl.statusList__openerBtn}>
                                            <span>
                                                <svg width={"20px"} height={"20px"} fill={"#0c5460"}
                                                     style={{marginRight: "4px", marginTop: "3px"}}>
                                                    <use xlinkHref={"/sprite.svg#EyeIcon"}></use>
                                                </svg>
                                            </span>
                                            <span>Смотрю</span>
                                            <span>
                                                <svg width={"10px"} height={"10px"} fill={"#0c5460"} style={{transform: "rotate(90deg)"}}>
                                                    <use xlinkHref={"/sprite.svg#ShevronIcon"}></use>
                                                </svg>
                                            </span>
                                        </button>

                                        <button style={chosenWatchStatuses !== "Watched" ? {display: "none"} : {}} onClick={() => CheckActiveStatusMenu()} className={cl.statusList__openerBtn}>
                                            <span>
                                                <svg width={"14px"} height={"14px"} fill={"#155724"} strokeWidth={"8px"} strokeMiterlimit={"10"} style={{marginRight: "10px", marginTop: "4px"}}>
                                                    <use xlinkHref={"/sprite.svg#ReadyIcon"}></use>
                                                </svg>
                                            </span>
                                            <span>Просмотрено</span>
                                            <span>
                                                <svg width={"10px"} height={"10px"} fill={"#155724"} style={{transform: "rotate(90deg)"}}>
                                                    <use xlinkHref={"/sprite.svg#ShevronIcon"}></use>
                                                </svg>
                                            </span>
                                        </button>

                                        <button style={chosenWatchStatuses !== "Later" ? {display: "none"} : {}} onClick={() => CheckActiveStatusMenu()} className={cl.statusList__openerBtn}>
                                            <span>
                                                <svg width={"14px"} height={"14px"} fill={"black"} strokeWidth={"8px"} strokeMiterlimit={"10"} style={{marginRight: "10px", marginTop: "4px"}}>
                                                    <use xlinkHref={"/sprite.svg#ReadyIcon"}></use>
                                                </svg>
                                            </span>
                                            <span>Отложено</span>
                                            <span>
                                                <svg width={"10px"} height={"10px"} fill={"black"} style={{transform: "rotate(90deg)"}}>
                                                    <use xlinkHref={"/sprite.svg#ShevronIcon"}></use>
                                                </svg>
                                            </span>
                                        </button>

                                        <button style={chosenWatchStatuses !== "Throw" ? {display: "none"} : {}} onClick={() => CheckActiveStatusMenu()} className={cl.statusList__openerBtn}>
                                            <span>
                                                <svg width={"10px"} height={"10px"} stroke={"#721c24"} strokeWidth={"2px"} style={{marginRight: "10px", marginTop: "3px"}}>
                                                    <use xlinkHref={"/sprite.svg#CloseBtnIcon"}></use>
                                                </svg>
                                            </span>
                                            <span>Брошено</span>
                                            <span>
                                                <svg width={"10px"} height={"10px"} fill={"#721c24"} style={{transform: "rotate(90deg)"}}>
                                                    <use xlinkHref={"/sprite.svg#ShevronIcon"}></use>
                                                </svg>
                                            </span>
                                        </button>

                                        <button style={chosenWatchStatuses !== "Planned" ? {display: "none"} : {}} onClick={() => CheckActiveStatusMenu()} className={cl.statusList__openerBtn}>
                                            <span>
                                                <svg width={"14px"} height={"14px"} fill={"#856404"} style={{marginRight: "10px", marginTop: "3px"}}>
                                                    <use xlinkHref={"/sprite.svg#ClockIcon"}></use>
                                                </svg>
                                            </span>
                                            <span>Запланировано</span>
                                            <span>
                                                <svg width={"10px"} height={"10px"} fill={"#856404"} style={{transform: "rotate(90deg)"}}>
                                                    <use xlinkHref={"/sprite.svg#ShevronIcon"}></use>
                                                </svg>
                                            </span>
                                        </button>

                                        <button style={chosenWatchStatuses !== "ReWatching" ? {display: "none"} : {}} onClick={() => CheckActiveStatusMenu()} className={cl.statusList__openerBtn}>
                                            <span>
                                                <svg width={"14px"} height={"14px"} fill={"#0c5460"} style={{marginRight: "10px", marginTop: "3px"}}>
                                                    <use xlinkHref={"/sprite.svg#RefreshIcon"}></use>
                                                </svg>
                                            </span>
                                            <span>Пересматриваю</span>
                                            <span>
                                                <svg width={"10px"} height={"10px"} fill={"#0c5460"} style={{transform: "rotate(90deg)"}}>
                                                    <use xlinkHref={"/sprite.svg#ShevronIcon"}></use>
                                                </svg>
                                            </span>
                                        </button>
                                        <ul className={cl.statusChoose}>
                                            <li style={chosenWatchStatuses === "Watching" ? {display: "none"} : {}}
                                                onClick={() => setChosenWatchStatuses("Watching")}>Смотрю
                                            </li>
                                            <li style={chosenWatchStatuses === "Watched" ? {display: "none"} : {}}
                                                onClick={() => setChosenWatchStatuses("Watched")}>Просмотрено
                                            </li>
                                            <li style={chosenWatchStatuses === "Later" ? {display: "none"} : {}}
                                                onClick={() => setChosenWatchStatuses("Later")}>Отложено
                                            </li>
                                            <li style={chosenWatchStatuses === "Throw" ? {display: "none"} : {}}
                                                onClick={() => setChosenWatchStatuses("Throw")}>Брошено
                                            </li>
                                            <li style={chosenWatchStatuses === "Planned" ? {display: "none"} : {}}
                                                onClick={() => setChosenWatchStatuses("Planned")}>Запланировано
                                            </li>
                                            <li style={chosenWatchStatuses === "ReWatching" ? {display: "none"} : {}}
                                                onClick={() => setChosenWatchStatuses("ReWatching")}>Пересматриваю
                                            </li>
                                        </ul>
                                    </div>
                                    <InPeopleListAnime UiSettings={temporaryForStatistic} children={"В списках у людей"}/>
                                    <span className={cl.readReviewText}>Читать все рецензии</span>
                                </div>
                            </div>
                            <div className={cl.generalInfo}>
                                <HeaderGeneralInfo/>
                                <hr className={cl.hr}></hr>
                                <GeneralInfoAboutAnime/>
                            </div>
                        </div>
                        <div className={cl.description}>
                            {
                                "Алиса — ученица из русско-японской семьи, пользующаяся большой популярностью в школе. " +
                                "Холодная и равнодушная к окружающим, она прекрасно учится и хороша в спорте. " +
                                "Обычно она очень строга к своему однокласснику Масатике, но иногда заигрывает с н" +
                                "им на русском языке, не подозревая, что на самом деле он понимает русский."
                            }
                        </div>
                        <div className={cl.animeMediaContentContainer}>
                            <div className={cl.photoContainer}>
                                <div className={cl.title}>Кадры</div>
                                <div className={cl.containerForPtotoItem}>
                                    <div className={cl.imgContainerForViewer}>
                                        <PhotoAndVideowiever type={"img"} imgUrl={testImagesForViewer} basePhotoPage={0}/>
                                    </div>
                                    <div className={cl.imgContainerForViewer}>
                                        <PhotoAndVideowiever type={"img"} imgUrl={testImagesForViewer} basePhotoPage={1}/>
                                    </div>
                                    <div className={cl.imgContainerForViewer}>
                                        <PhotoAndVideowiever type={"img"} imgUrl={testImagesForViewer} basePhotoPage={2}/>
                                    </div>

                                </div>
                            </div>
                            <div className={cl.trailerContainer}>
                                <div className={cl.title}>Трейлер</div>
                                <div className={cl.videoContaineRForViewer}>
                                    <PhotoAndVideowiever type={"video"} imgUrl={testVideoForViewer} basePhotoPage={0}/>
                                </div>
                            </div>
                        </div>
                        <Linked Items={LinkedTestMassive}/>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default AnimePage;