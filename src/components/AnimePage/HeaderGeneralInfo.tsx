import React, {useEffect, useState} from 'react';
import cl from '../modules/AnimePageModules/HeaderGeneralInfo.module.css'
import InPeopleListAnime from "./InPeopleListAnime";





const HeaderGeneralInfo = () => {
    const [activeTape, setActiveTape] = useState(false);
    const [tempStarRaiting, setTempStarRaiting] = useState(0);
    const [realCurrentRaiting, setRealCurrentRaiting] = useState(0);
    const StarsNumber = [1,2,3,4,5,6,7,8,9,10];
    const temporaryForStatistic = [
        {title:"Оценки людей", styles: {left:"-258px"}},
        {ColumNameOne: "Голосов", ColumNameTwo: "Процент" , ColumNameThree: "Список", styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400",  width: "50px"}]},
        {ColumDateOne: "8603", ColumDateTwo: "72.3" , ColumDateThree: "1", styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
        {ColumDateOne: "25083", ColumDateTwo: "0.4" , ColumDateThree: "2", styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
        {ColumDateOne: "151", ColumDateTwo: "0.4" , ColumDateThree: "3", styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
        {ColumDateOne: "162", ColumDateTwo: "1.7" , ColumDateThree: "4", styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
        {ColumDateOne: "609", ColumDateTwo: "24.8" , ColumDateThree: "5",styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
        {ColumDateOne: "8603", ColumDateTwo: "72.3" , ColumDateThree: "6", styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
        {ColumDateOne: "25083", ColumDateTwo: "0.4" , ColumDateThree: "7", styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
        {ColumDateOne: "151", ColumDateTwo: "0.4" , ColumDateThree: "8", styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
        {ColumDateOne: "162", ColumDateTwo: "1.7" , ColumDateThree: "9", styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
        {ColumDateOne: "609", ColumDateTwo: "24.8" , ColumDateThree: "10",styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
        {footer: null}
    ]



    function rePaitRaitingStars(e:number){
        setTempStarRaiting(e)
    }

    useEffect(() => {
        setTempStarRaiting(realCurrentRaiting);

    }, [realCurrentRaiting,activeTape]);


    return (
        <div className={cl.container}>
            <div className={cl.row}>
                <div className={cl.StarContainer}>
                <span className={cl.StarIcon}>
                    <svg width={"30px"} height={"30px"} fill={"#e4bb24"}>
                        <use xlinkHref={"/sprite.svg#RaitingStar"}></use>
                    </svg>
                </span>
                    <div className={cl.currentRaiting}>
                        <div className={cl.AllRaitingContainer}>
                            <span className={cl.Raiting}>9.1</span>
                            <span className={cl.PosibleRaiting}>/10</span>
                        </div>
                        <div style={{alignItems: "start", display: "flex"}}>
                            <span className={cl.allWhoVoted}>2408</span>
                        </div>
                    </div>
                </div>
                <div onMouseOver={() => {
                    setActiveTape(true)
                }} onMouseLeave={() => {
                    setActiveTape(false)
                }} className={cl.chooseStarContainer}>
                    <div className={activeTape ? cl.myChoseRaitingActive : cl.myChoseRaiting}>
                    <span style={{marginRight: "0.25rem", marginTop: "3px"}}>
                        <svg fill={tempStarRaiting !== 0 ? "#509e90" : "#d1d1d1"} className={cl.chooseStarImg}>
                            <use xlinkHref={"/sprite.svg#RaitingStar"}></use>
                        </svg>
                    </span>
                        <div className={cl.MyChosenRaiting}>
                            <div
                                className={tempStarRaiting !== 0 ? cl.ChosenRaiting : cl.NotChosenRaiting}>{tempStarRaiting !== 0 ? tempStarRaiting : "Оцените аниме"}</div>
                            <div style={tempStarRaiting !== 0 ? {} : {display: "none"}}
                                 className={cl.TextForChosenRaiting}>Моя оценка
                            </div>
                        </div>
                    </div>
                    <div className={activeTape ? cl.rateStarTapeActive : cl.rateStarTape}>
                        {StarsNumber.map((value, index) =>
                            <svg key={index + value} onClick={() => {
                                setRealCurrentRaiting(index + 1)
                                setActiveTape(false)
                            }}
                                 onMouseOver={() => rePaitRaitingStars(index + 1)}
                                 width={"22px"} height={"22px"}
                                 fill={index + 1 <= tempStarRaiting ? "#fff" : "#d1d1d1"}
                            >
                                <use xlinkHref={"/sprite.svg#RaitingStar"}></use>
                            </svg>
                        )}
                    </div>
                </div>
                <div className={cl.InfoAboutUserRaiting}>
                    <InPeopleListAnime UiSettings={temporaryForStatistic} children={
                        <svg width={"16px"} height={"16px"}>
                            <use xlinkHref={"/sprite.svg#ToolTipWordIIcon"}></use>
                        </svg>
                    }/>
                </div>
            </div>
            <div className={cl.headerName}>
                <h1 style={{fontWeight: "500", marginBottom: "6px"}}>Башня Бога 2</h1>
                <span className={cl.othersNames}>Kami no Tou: Ouji no Kikan</span>
                <span className={cl.othersNames}>Tower of God: Return of the Prince</span>
            </div>
        </div>
    );
};

export default HeaderGeneralInfo;