import React, {useContext, useEffect, useState} from 'react';
import cl from '../modules/ProfilePageModules/SettingsPage.module.css'
import SettingsInput from "./SettingsInput";
import SettingsSelect from "./SettingsSelect";
import axios, {AxiosResponse} from "axios";
import SettingsDateInput from "./SettingsDateInput";
import SettingsHeader from "./SettingsHeader";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";
import {userDataAuthAndRegistation, userSettingCurrentState} from "../../types";
import {useTypedSelector} from "../../hooks/useTypeSelector";
import {removeExtraSpaces} from "../../util/TextEncoder";
import {updateUSer} from "../../http/UserApi";
import {useDispatch} from "react-redux";
import {SetUserActionCreator} from "../../Store/action-creator/userActionCreator";



const SettingsPage = () => {

    const [countries, setCountries] = useState<string[]>([]);
    const [currentUserSettings, setCurrentUserSettings] = useState<userSettingCurrentState>(
        {id: 0, email:"", name:"", aboutUser: {aboutUser:"", lifeStatus:"", fullname:" ",country:"", birthday:"",gender:"",city:""}, accessRule: {}}
    );
    const [currentSettingsState, setCurrentSettingsState] = useState<string>("account");
    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!
    const data = useTypedSelector(state => state.user);
    const dispatch = useDispatch();

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

        const initialSettingOjbect:userSettingCurrentState = {
            id: data.id,
            email: data.email,
            name: data.login,
            aboutUser: {
                ...data.aboutData,
                fullname: data.aboutData?.fullname,
                birthday: data.aboutData?.birthday,
            },
            accessRule: {
                whoCanCommentMyProfile: data.accessRule.whoCanCommentMyProfile,
                whoCanViewMyList: data.accessRule.whoCanViewMyList,
                whoCanSentFriendRequest: data.accessRule.whoCanSentFriendRequest,
            },
        }
        setCurrentUserSettings(initialSettingOjbect);

    },[])

    function changeSettingsState(nameField:string, value:string){
        let filtredValue = removeExtraSpaces(value)

        if(nameField === "Логин"){
            setCurrentUserSettings({...currentUserSettings, name: filtredValue})
        }else if(nameField === "Электронная почта"){
            setCurrentUserSettings({...currentUserSettings, email: filtredValue})
        }else if(nameField === "Имя"){
            let newFullName = filtredValue;
            if(currentUserSettings.aboutUser.fullname?.split(" ").length === 2){
                newFullName += " " + currentUserSettings.aboutUser.fullname?.split(" ")[1]
            }
            setCurrentUserSettings({...currentUserSettings, aboutUser: {...currentUserSettings.aboutUser, fullname: newFullName}})
        }else if(nameField === "Фамилия"){
            let newFullName = " ";
            if(currentUserSettings.aboutUser.fullname?.split(" ").length === 2){
               newFullName = currentUserSettings.aboutUser.fullname?.split(" ")[0];
               newFullName += " " + filtredValue;
            }
            setCurrentUserSettings({...currentUserSettings, aboutUser: {...currentUserSettings.aboutUser, fullname: newFullName}})
        }else if(nameField === "Статус"){
            setCurrentUserSettings({...currentUserSettings, aboutUser: {...currentUserSettings.aboutUser, lifeStatus: filtredValue}})

        }else if(nameField === "aboutUser"){
            setCurrentUserSettings({...currentUserSettings,aboutUser: {...currentUserSettings.aboutUser, aboutUser: filtredValue} })
        } else if(nameField === "Город"){
            setCurrentUserSettings({...currentUserSettings, aboutUser: {...currentUserSettings.aboutUser, city: filtredValue}})
        }else if(nameField === "Дата рождения"){
            setCurrentUserSettings({...currentUserSettings, aboutUser: {...currentUserSettings.aboutUser, birthday: filtredValue}})
        }else if(nameField === "Пол"){
            setCurrentUserSettings({...currentUserSettings, aboutUser: {...currentUserSettings.aboutUser, gender: filtredValue}})
        }else if(nameField === "Страна"){
            setCurrentUserSettings({...currentUserSettings, aboutUser: {...currentUserSettings.aboutUser, country: filtredValue}})
        }else if(nameField === "Могут видеть мой список"){
            setCurrentUserSettings({...currentUserSettings, accessRule: {...currentUserSettings.accessRule, whoCanViewMyList: filtredValue}})
        }else if(nameField === "Могут присылать заявки в друзья"){
            setCurrentUserSettings({...currentUserSettings, accessRule: {...currentUserSettings.accessRule, whoCanSentFriendRequest: filtredValue}})
        }else if(nameField === "Могут комментировать мой профиль"){
            setCurrentUserSettings({...currentUserSettings, accessRule: {...currentUserSettings.accessRule, whoCanCommentMyProfile: filtredValue}})

        }


    }


    async function sendUpdateSettings(){

        let filterBasicInfo = Object.fromEntries(
            Object.entries({email: currentUserSettings.email, name: currentUserSettings.name})
                .filter((value)=>value[1] !== undefined && value[1] !== null && value[1] !=="")
        )
        let filterAboutUserInfo = Object.fromEntries(
            Object.entries(currentUserSettings.aboutUser)
                .filter((value)=>value[1] !== undefined && value[1] !== null && value[1] !=="" && value[1] !== " ")
        )

        let filterAccessRules =  Object.fromEntries(
            Object.entries(currentUserSettings.accessRule)
                .filter((value)=>value[1] !== undefined && value[1] !== null && value[1] !=="" && value[1] !== " ")
        )

        const user = await updateUSer({id: currentUserSettings.id, name: filterBasicInfo.name, email: filterBasicInfo.email,aboutUser: filterAboutUserInfo, accessRule: filterAccessRules })

        if(user){
            dispatch(SetUserActionCreator({
                id: user.id,
                email: user?.email,
                login: user.name,
                isLogin:true,
                aboutData:{aboutUser: user.aboutUser, city:user.city, gender: user.gender, birthday: user.birthDayDate, country:user.country, fullname: user.fullname, lifeStatus: user.lifeStatus},
                accessRule: {whoCanCommentMyProfile: user.whoCanCommentMyProfile, whoCanSentFriendRequest: user.whoCanSentFriendRequest, whoCanViewMyList: user.whoCanViewMyList},
                createAt: data.createAt,
            }))
        }

    }


    return (
        <div style={ MobileNavBarActive ?  {transform:"translate3d(var(--translate-value), 0, 0)"} : {}} className={cl.container}>
            <div className={cl.row}>
                <SettingsHeader currentSettings={currentSettingsState} setCurrentSettings={setCurrentSettingsState}/>
                { currentSettingsState === "account" &&
                <div className={cl.contentContainer}>
                    <div className={cl.LeftColumSettingsContainer}>
                        <SettingsInput linkedState={currentUserSettings.name} funcSetLinkedState={changeSettingsState} labelDate={"Логин"} notice={"Логин можно менять не чаще 1-го раза в неделю."}/>
                        <SettingsInput linkedState={currentUserSettings.email} funcSetLinkedState={changeSettingsState} labelDate={"Электронная почта"}/>
                        <div className={cl.aboutContainer}>
                            <label>Обо мне</label>
                            <textarea value={currentUserSettings.aboutUser.aboutUser} onChange={(e)=>changeSettingsState("aboutUser", e.target.value)} className={cl.textAreaAbout}></textarea>
                        </div>
                        <div style={{marginTop: "auto"}}>
                            <button onClick={()=>sendUpdateSettings()} className={cl.RefreshBtn}>
                                Обновить
                            </button>
                        </div>
                    </div>
                    <div className={cl.RightColumSettingsContainer}>
                        <SettingsInput linkedState={currentUserSettings.aboutUser.fullname?.split(" ")[0] ? currentUserSettings.aboutUser.fullname?.split(" ")[0] : "" } funcSetLinkedState={changeSettingsState} labelDate={"Имя"}/>
                        <SettingsInput linkedState={currentUserSettings.aboutUser.fullname?.split(" ")[1] ? currentUserSettings.aboutUser.fullname?.split(" ")[1] : ""} funcSetLinkedState={changeSettingsState} labelDate={"Фамилия"}/>
                        <SettingsInput linkedState={currentUserSettings.aboutUser.lifeStatus!} funcSetLinkedState={changeSettingsState} labelDate={"Статус"}/>
                        <SettingsDateInput setBirthDate={changeSettingsState} labelDate={"Дата рождения"}/>
                        <SettingsSelect setStateFunction={changeSettingsState} labelDate={"Пол"} object={["Мужской", "Женский"]} defaultSelected={data.aboutData?.gender ? data.aboutData?.gender :  "Не указан"}/>
                        <SettingsSelect setStateFunction={changeSettingsState} labelDate={"Страна"} object={countries} defaultSelected={data.aboutData?.country ? data.aboutData?.country : "Выберите страну"}/>
                        <SettingsInput linkedState={currentUserSettings.aboutUser.city!} funcSetLinkedState={changeSettingsState} labelDate={"Город"}/>
                        <button className={cl.RefreshBtnRightSide}>
                            Обновить
                        </button>
                    </div>
                </div>
                }
                {currentSettingsState === "profile" &&
                    <div className={cl.contentContainer}>
                        <div className={cl.LeftColumSettingsContainer}>
                            <SettingsSelect setStateFunction={changeSettingsState} labelDate={"Могут видеть мой список"}
                                            object={["Зарегестрированные пользователи","Только мои друзья","Никто кроме меня"]}
                                            defaultSelected={data.accessRule.whoCanViewMyList!}/>
                            <SettingsSelect setStateFunction={changeSettingsState} labelDate={"Могут присылать заявки в друзья"}
                                            object={["Никто"]}
                                            defaultSelected={data.accessRule.whoCanSentFriendRequest!}/>
                            <div style={{marginTop: "auto"}}>
                                <button onClick={()=>sendUpdateSettings()} className={cl.RefreshBtn}>
                                    Обновить
                                </button>
                            </div>
                        </div>
                        <div className={cl.RightColumSettingsContainer}>
                            <SettingsSelect setStateFunction={changeSettingsState} labelDate={"Могут комментировать мой профиль"}
                                            object={["Только мои друзья","Никто кроме меня"]}
                                            defaultSelected={data.accessRule.whoCanCommentMyProfile!}/>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default SettingsPage;