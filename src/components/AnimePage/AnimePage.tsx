import React, {useEffect, useState} from 'react';
import cl from '../modules/AnimePageModules/AnimePage.module.css'
import InPeopleListAnime from "./InPeopleListAnime";
import HeaderGeneralInfo from "./HeaderGeneralInfo";






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
                            </div>




                        </div>

                    </div>


                </div>
            </div>
        </div>
    );
};

export default AnimePage;