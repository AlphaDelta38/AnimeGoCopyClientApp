import React, {useContext, useEffect, useState} from 'react';
import cl from "../modules/ProfilePageModules/ProfilePage.module.css"
import SideNavigationProfile from "./SideNavigationProfile";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";
import {useTypedSelector} from "../../hooks/useTypeSelector";
import {Months} from "../../util/CurrentDate";
import {useDispatch} from "react-redux";
import {updateBackGroundPhoto, updateProfilePhoto} from "../../http/UserApi";
import {SetUserBackGroundImageCreator, SetUserProfilePhotoCreator} from "../../Store/action-creator/userActionCreator";

interface animeWatchStatisticInterface{
    watching: number
    watched: number,
    later: number,
    throw: number,
    planed: number,
    allAmount: number,
    allEpisodes: number,
    timeWatch: string,
    avgStar: number,
}

const ProfilePage = () => {

    const [btnMoreInfoActive, setBtnMoreInfoActive] = useState(false);
    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!
    const [aboutInfoMassive, setAboutInfoMassive] = useState<any[]>([])
    const [animeWatchStatistic, setAnimeWatchStatistic] = useState<animeWatchStatisticInterface>()


    const data = useTypedSelector(state => state.user)
    const dispatch = useDispatch();


    function changeBtnActive(){
        if(btnMoreInfoActive){
            setBtnMoreInfoActive(false)
        }else{
            setBtnMoreInfoActive(true)
        }
    }

    const onSiteFromdate = new Date(data.createAt);

    const year = onSiteFromdate.getUTCFullYear();
    const month = onSiteFromdate.getUTCMonth() + 1;
    const day = onSiteFromdate.getUTCDate();


    useEffect(() => {
        let tempMassive = Object.entries(
            {
                name: data.aboutData?.fullname?.split(" ")[0],
                famalyName: data.aboutData?.fullname?.split(" ")[1],
                birthday: data.aboutData?.birthday,
                country: data.aboutData?.country,
                city: data.aboutData?.city,
                gender: data.aboutData?.gender,
                ...data.aboutData!
            })
        setAboutInfoMassive(tempMassive.filter((value)=>value[1] !== undefined && value[1] !== null && value[1] !=="" && value[1] !== " " && value[0] !=="fullname"))
    }, [data]);


    function convertorToRussianText(text: string, additional?:string):string{

        if(text === "name"){
            return "Имя"
        }else if(text === "famalyName") {
            return "Фамилия"
        }else if(text === "gender"){
            return "Пол"
        }else if(text === "country"){
            return "Страна"
        }else if(text === "city"){
            return "Город"
        }else if(text === "birthday"){
            return "День рождение"
        }else if(text === "lifeStatus"){
            return "Статус"
        }else if(text === "aboutUser"){
            return "О себе"
        }

        return ""
    }

    const handleImageChange =  async  (event: any) => {
        const file = event.target.files[0];
        if(file){
            const profilePhotoUrl: string = await updateProfilePhoto({image: file, id: data.id});
            dispatch(SetUserProfilePhotoCreator(profilePhotoUrl));
        }
    };

    const handleBackGroundChange =  async  (event: any) => {
        const file = event.target.files[0];
        if(file){
            const BackGroundUrl: string = await updateBackGroundPhoto({image: file, id: data.id});
            dispatch(SetUserBackGroundImageCreator(BackGroundUrl));
        }
    };


    function trasfromMinuteToHour(amount: number): string{
            let amountSum = amount;
            let month = 0;
            let days =0;
            if((amountSum/60)/24 >= 30){
                month = Math.floor(((amount/60)/(24*30)));
                amount = amount - ((month*30)*24)*60
            }
            if((amountSum/60)/24 < 30){
                days = Math.floor(((amount/60) / 24));
                amount = amount - (days * 24)*60;
            }
            return  `${month} м. ${days} д. ${Math.round(amount/60)} ч. `
    }

    useEffect(() => {
        if(data.watchStatuses){
            let timeWatch = 0;
            let allEpisodes=0;
            let allAmount= data.watchStatuses.length;
            let avgStars = 0;
            let Watching = 0;
            let Watched = 0;
            let Later = 0;
            let Throw = 0;
            let Planned = 0;

            data.watchStatuses.forEach((value)=>{
                if(value.animePage.duration && value.animePage.maxEpisodes && value.status === "Watched"){
                    timeWatch += Number(value.animePage.duration) *  Number(value.animePage.maxEpisodes);
                }
                if(value.animePage.maxEpisodes && value.status === "Watched"){
                    allEpisodes += Number(value.animePage.maxEpisodes);
                }
            })

            if(data.userStars){
                let count = 0;
                data.userStars.forEach((value)=>{
                    let next = false;
                    data.watchStatuses?.forEach((valued)=>{
                        if(valued.animePageId === value.animePAgeId){
                            next= true;
                            count++;
                        }
                    })
                    if(next){
                        avgStars += value.raiting;
                    }
                })
                avgStars = avgStars/count;
            }

            Watching = data.watchStatuses.filter((value)=>value.status === "Watching").length;
            Watched = data.watchStatuses.filter((value)=>value.status === "Watched").length;
            Later = data.watchStatuses.filter((value)=>value.status === "Later").length;
            Throw = data.watchStatuses.filter((value)=>value.status === "Throw").length;
            Planned = data.watchStatuses.filter((value)=>value.status === "Planned").length;

            console.log(timeWatch)
            setAnimeWatchStatistic({
                allAmount: allAmount,
                allEpisodes: allEpisodes,
                avgStar: avgStars,
                watching: Watching,
                watched: Watched,
                later: Later,
                planed: Planned,
                throw: Throw,
                timeWatch: trasfromMinuteToHour(timeWatch),
            })

        }
    }, [data.watchStatuses, data.userStars]);



    return (
        <div style={ MobileNavBarActive ?  {transform:"translate3d(var(--translate-value), 0, 0)"} : {}} className={cl.container}>
            <div className={cl.row}>
                <div className={cl.MainContentContainer}>
                    <div className={cl.MainContent}>
                        <div style={data.backGroundUrl ? {backgroundImage:`url(${process.env.REACT_APP_API_URL}${data.backGroundUrl})`} : {}} className={cl.BackgroundImage}>
                            <div className={cl.ProfileImgAndBtnContainer}>
                                <div className={cl.changeBtns}>
                                    <label className={cl.LabelBtn}>
                                        <span>
                                            <svg width={"16px"} height={"16px"}>
                                                <use xlinkHref={"/sprite.svg#CameraIcon"}></use>
                                            </svg>
                                        </span>
                                        Добавить обложку
                                        <input onChange={handleBackGroundChange} type="file" placeholder="Добавить обложку"/>
                                    </label>
                                    <label className={cl.LabelBtn}>
                                        <span>
                                            <svg width={"16px"} height={"16px"}>
                                                <use xlinkHref={"/sprite.svg#CameraIcon"}></use>
                                            </svg>
                                        </span>
                                        Добавить Аватарку
                                        <input onChange={handleImageChange} type="file" placeholder="Добавить Аватарку"/>
                                    </label>
                                </div>
                                <div className={cl.ProfileImg}>
                                    <img  width={"100"} height={"100%"} src={data.profilePhoto ? `${process.env.REACT_APP_API_URL}${data.profilePhoto}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQzLhg0HDlP9pTv_UW4xk1SftSxAvz8wRSxA&s" }
                                         alt={""}/>
                                </div>
                            </div>
                        </div>
                        <div className={cl.UserInfo}>
                            <div className={cl.HeaderInfo}>
                                <h2>
                                    {data.login}
                                </h2>
                                <span>
                                    на сайте с {`${day} ${Months[month]} ${year} года`}
                                </span>
                            </div>
                            <div className={cl.MainInfo}>
                                <dl style={btnMoreInfoActive ? {maxHeight: "100%"} : {}}>
                                    {aboutInfoMassive.map((value,index)=>
                                        <>
                                            <dt key={index}>{`${convertorToRussianText(value[0], value[1])}`}:</dt>
                                            <dd>{`${value[1]}`}</dd>
                                        </>
                                  )}

                                </dl>
                                <div style={aboutInfoMassive.length >= 1 ? {} : {display:"none"}} onClick={() => changeBtnActive()} className={cl.BtnOpenMoreInfo}>
                                    <button>{btnMoreInfoActive ? "Скрыть подробную информацию" : "Показать полную информацию"}</button>
                                </div>
                            </div>
                            <div style={data.watchStatuses && data.watchStatuses?.length > 0 ? {} : {display:"none"}} className={cl.StatisticOfAnime}>
                                <div className={cl.StatisticHeader}>
                                   <h5> Статистика</h5>
                                </div>
                                <div className={cl.UnderHeaderTitle}>
                                    <h5>
                                        Аниме
                                    </h5>
                                    <div className={cl.TimeManageContainer}>
                                        <span>
                                            Время за просмотром: {animeWatchStatistic?.timeWatch}
                                        </span>
                                        <span>
                                            Средний балл: {animeWatchStatistic?.avgStar}
                                        </span>
                                    </div>
                                </div>
                                <div className={cl.ProgressiveBar}>
                                    <div style={{width:"100%"}} className={cl.Watch}></div>
                                    <div className={cl.Watched}></div>
                                    <div className={cl.ForLater}></div>
                                    <div className={cl.ThrowDown}></div>
                                    <div className={cl.Planing}></div>
                                </div>
                                <div className={cl.WatchStatistics}>
                                    <dl className={cl.StatisticsTable}>
                                        <dt>Смотрю</dt>
                                        <dd>{animeWatchStatistic?.watching}</dd>
                                        <dt>Просмотрено</dt>
                                        <dd>{animeWatchStatistic?.watched}</dd>
                                        <dt>Отложено</dt>
                                        <dd>{animeWatchStatistic?.later}</dd>
                                        <dt>Брошено</dt>
                                        <dd>{animeWatchStatistic?.throw}</dd>
                                        <dt>Запланировано</dt>
                                        <dd>{animeWatchStatistic?.planed}</dd>
                                    </dl>
                                    <dl className={cl.StatisticsTable}>
                                        <dt>Всего в списках</dt>
                                        <dd>{animeWatchStatistic?.allAmount}</dd>
                                        <dt>Эпизодов</dt>
                                        <dd>{animeWatchStatistic?.allEpisodes}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SideNavigationProfile/>
            </div>
        </div>
    );
};

export default ProfilePage;