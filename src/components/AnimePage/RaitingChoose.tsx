import React, {useEffect, useState} from 'react';
import cl from "../modules/AnimePageModules/HeaderGeneralInfo.module.css";
import {useTypedSelector} from "../../hooks/useTypeSelector";
import {useLocation} from "react-router-dom";
import {setAnimeStarForUser} from "../../http/starsApi";
import {useDispatch} from "react-redux";
import {setUserStarsActionCreator} from "../../Store/action-creator/userActionCreator";

const RaitingChoose = () => {
    const [activeTape, setActiveTape] = useState(false);
    const [tempStarRaiting, setTempStarRaiting] = useState(0);
    const [realCurrentRaiting, setRealCurrentRaiting] = useState(0);
    const StarsNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const data = useTypedSelector(state => state.user)
    const dispatch = useDispatch()
    const location = useLocation()

    function rePaitRaitingStars(e: number) {
        setTempStarRaiting(e)
    }


    async function setRaitingStar(realRaiting: number){
        const dated = await setAnimeStarForUser({raiting: realRaiting, animePAgeId: Number(location.pathname.split("/")[2]), userId:  data.id});

        const newStarDate = data.userStars

        if(newStarDate){
            newStarDate.forEach((value)=>{
                if(value.animePAgeId === Number(location.pathname.split("/")[2]) && dated?.raiting){
                    value.raiting = dated?.raiting;
                }
            })
        }

        if(dated && newStarDate){
            dispatch(setUserStarsActionCreator(newStarDate))
        }
    }

    useEffect(() => {
        setTempStarRaiting(realCurrentRaiting);
        if(!activeTape && realCurrentRaiting !== 0){
            setRaitingStar(realCurrentRaiting);
        }
    }, [realCurrentRaiting, activeTape]);


    useEffect(() => {
        if(data.userStars){
            data.userStars.forEach((value)=>{
                   if(value.animePAgeId === Number(location.pathname.split("/")[2])){
                        setRealCurrentRaiting(value.raiting)
                   }
            })
        }
    }, [data.userStars]);

    return (
        <div style={{display:"flex"}}>
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
        </div>
    );
};

export default RaitingChoose;