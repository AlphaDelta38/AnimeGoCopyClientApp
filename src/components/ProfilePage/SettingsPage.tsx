import React, {useContext, useEffect, useState} from 'react';
import cl from '../modules/ProfilePageModules/SettingsPage.module.css'
import SettingsInput from "./SettingsInput";
import SettingsSelect from "./SettingsSelect";
import axios, {AxiosResponse} from "axios";
import SettingsDateInput from "./SettingsDateInput";
import SettingsHeader from "./SettingsHeader";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";




const SettingsPage = () => {

    const [countries, setCountries] = useState<string[]>([]);
    const [currentSettingsState, setCurrentSettingsState] = useState<string>("account");
    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!

    useEffect(()=>{
        async function FetchApiCountries(){
            const url = 'https://restcountries.com/v3.1/all?fields=name';
            let countries:string[] = [];
            try {
                const response: AxiosResponse = await axios.get(url);
                response.data.forEach((value: {name: {common:string}})=> countries.push(value.name.common))
                if(countries.length){
                    let sortedMassive =  countries.sort((a: string, b: string) => a[0].localeCompare(b[0]));
                    setCountries(sortedMassive)
                }

            } catch (error) {
                console.error(error);
            }
        }
        FetchApiCountries()
    },[])



    return (
        <div style={ MobileNavBarActive ?  {transform:"translate3d(var(--translate-value), 0, 0)"} : {}} className={cl.container}>
            <div className={cl.row}>
                <SettingsHeader currentSettings={currentSettingsState} setCurrentSettings={setCurrentSettingsState}/>
                { currentSettingsState === "account" &&
                <div className={cl.contentContainer}>
                    <div className={cl.LeftColumSettingsContainer}>
                        <SettingsInput labelDate={"Логин"} notice={"Логин можно менять не чаще 1-го раза в неделю."}/>
                        <SettingsInput labelDate={"Электронная почта"}/>
                        <div className={cl.aboutContainer}>
                            <label>Обо мне</label>
                            <textarea className={cl.textAreaAbout}></textarea>
                        </div>
                        <div style={{marginTop: "auto"}}>
                            <button className={cl.RefreshBtn}>
                                Обновить
                            </button>
                        </div>
                    </div>
                    <div className={cl.RightColumSettingsContainer}>
                        <SettingsInput labelDate={"Имя"}/>
                        <SettingsInput labelDate={"Фамилия"}/>
                        <SettingsInput labelDate={"Статус"}/>
                        <SettingsDateInput labelDate={"Дата рождения"}/>
                        <SettingsSelect labelDate={"Пол"} object={["Мужской", "Женский"]} defaultSelected={"Не указан"}/>
                        <SettingsSelect labelDate={"Страна"} object={countries} defaultSelected={"Выберите страну"}/>
                        <SettingsInput labelDate={"Город"}/>
                        <button className={cl.RefreshBtnRightSide}>
                            Обновить
                        </button>
                    </div>
                </div>
                }
                {currentSettingsState === "profile" &&
                    <div className={cl.contentContainer}>
                        <div className={cl.LeftColumSettingsContainer}>
                            <SettingsSelect labelDate={"Могут видеть мой список"} object={["Зарегестрированные пользователи","Только мои друзья","Никто кроме меня"]} defaultSelected={"Все посетители"}/>
                            <SettingsSelect labelDate={"Могут присылать заявки в друзья"} object={["Никто"]} defaultSelected={"Все поситители"}/>
                            <div style={{marginTop: "auto"}}>
                                <button className={cl.RefreshBtn}>
                                    Обновить
                                </button>
                            </div>
                        </div>
                        <div className={cl.RightColumSettingsContainer}>
                            <SettingsSelect labelDate={"Могут комментировать мой профиль"} object={["Только мои друзья","Никто кроме меня"]} defaultSelected={"Зарегестрированные пользователи"}/>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default SettingsPage;