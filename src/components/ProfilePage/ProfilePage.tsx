import React, {useContext, useEffect, useState} from 'react';
import cl from "../modules/ProfilePageModules/ProfilePage.module.css"
import SideNavigationProfile from "./SideNavigationProfile";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";
import {useTypedSelector} from "../../hooks/useTypeSelector";
import {Months} from "../../util/CurrentDate";
import {useDispatch} from "react-redux";
import {updateBackGroundPhoto, updateProfilePhoto} from "../../http/UserApi";
import {SetUserBackGroundImageCreator, SetUserProfilePhotoCreator} from "../../Store/action-creator/userActionCreator";



const ProfilePage = () => {

    const [btnMoreInfoActive, setBtnMoreInfoActive] = useState(false);
    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!
    const [aboutInfoMassive, setAboutInfoMassive] = useState<any[]>([])



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
                            <div className={cl.StatisticOfAnime}>
                                <div className={cl.StatisticHeader}>
                                   <h5> Статистика</h5>
                                </div>
                                <div className={cl.UnderHeaderTitle}>
                                    <h5>
                                        Аниме
                                    </h5>
                                    <div className={cl.TimeManageContainer}>
                                        <span>
                                            Время за просмотром:
                                        </span>
                                        <span>
                                            Средний балл:
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
                                        <dd>61</dd>
                                        <dt>Просмотрено</dt>
                                        <dd>10</dd>
                                        <dt>Отложено</dt>
                                        <dd>5</dd>
                                        <dt>Брошено</dt>
                                        <dd>6</dd>
                                        <dt>Запланировано</dt>
                                        <dd>7</dd>
                                    </dl>
                                    <dl className={cl.StatisticsTable}>
                                        <dt>Всего в списках</dt>
                                        <dd>252</dd>
                                        <dt>Эпизодов</dt>
                                        <dd>3462</dd>
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