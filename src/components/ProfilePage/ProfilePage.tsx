import React, {useContext, useState} from 'react';
import cl from "../modules/ProfilePageModules/ProfilePage.module.css"
import SideNavigationProfile from "./SideNavigationProfile";
import Footer from "../AdditionalComponents/Footer";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";


const ProfilePage = () => {

    const [btnMoreInfoActive, setBtnMoreInfoActive] = useState(false);
    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!

    function changeBtnActive(){
        if(btnMoreInfoActive){
            setBtnMoreInfoActive(false)
        }else{
            setBtnMoreInfoActive(true)
        }
    }







    return (
        <div style={ MobileNavBarActive ?  {transform:"translate3d(var(--translate-value), 0, 0)"} : {}} className={cl.container}>
            <div className={cl.row}>
                <div className={cl.MainContentContainer}>
                    <div className={cl.MainContent}>
                        <div className={cl.BackgroundImage}>
                            <div className={cl.ProfileImgAndBtnContainer}>
                                <div className={cl.changeBtns}>
                                    <label className={cl.LabelBtn}>
                                        <span><img  width="16px" height="16px" src={"/Camera.png"} alt={""}/></span>
                                        Добавить обложку
                                        <input type="file" placeholder="Добавить обложку"/>
                                    </label>
                                    <label className={cl.LabelBtn}>
                                        <span><img width="16px" height="16px" src={"/Camera.png"} alt={""}/></span>
                                        Добавить Аватарку
                                        <input type="file" placeholder="Добавить Аватарку"/>
                                    </label>
                                </div>
                                <div className={cl.ProfileImg}>
                                    <img src={"https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg"}
                                         alt={""}/>
                                </div>
                            </div>
                        </div>
                        <div className={cl.UserInfo}>
                            <div className={cl.HeaderInfo}>
                                <h2>
                                    AlphaDelta38
                                </h2>
                                <span>
                                    на сайте с 30 мая
                                </span>
                            </div>
                            <div className={cl.MainInfo}>
                                    <dl style={btnMoreInfoActive ? {maxHeight:"100%"} : {}}>
                                        <dt>Имя: </dt>
                                        <dd>
                                        Kiril
                                        </dd>
                                        <dt>Фамилия:</dt>
                                        <dd>
                                        Morozov
                                        </dd>
                                        <dt>Страна</dt>
                                        <dd>
                                        Ukraine
                                        </dd>
                                    </dl>
                                <div onClick={()=>changeBtnActive()} className={cl.BtnOpenMoreInfo}>
                                    <button >{btnMoreInfoActive ? "Скрыть подробную информацию" : "Показать полную информацию"}</button>
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