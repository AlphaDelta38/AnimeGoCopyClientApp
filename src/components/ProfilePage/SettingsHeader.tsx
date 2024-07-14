import React from 'react';
import cl from '../modules/ProfilePageModules/SettingsHeader.module.css'



interface  SettingsHeaderInterface {
    currentSettings: string
    setCurrentSettings: (e:string)=>void
}


const SettingsHeader = ({currentSettings, setCurrentSettings }:SettingsHeaderInterface) => {




    return (
        <div className={cl.container}>
            <ul className={cl.navigation}>
                <li onClick={()=>{setCurrentSettings("account")}} style={currentSettings === "account" ? {color: "#495057", backgroundColor: "#e9ebee", borderColor: "#ddd #ddd #e9ebee" } : {}}>Аккаунт</li>
                <li  onClick={()=>{setCurrentSettings("profile")}} style={currentSettings === "profile" ? {color: "#495057", backgroundColor: "#e9ebee", borderColor: "#ddd #ddd #e9ebee" }: {}}>Профиль</li>
            </ul>
        </div>
    );
};

export default SettingsHeader;