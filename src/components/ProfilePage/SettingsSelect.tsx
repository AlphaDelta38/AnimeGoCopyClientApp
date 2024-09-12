import React from 'react';
import cl from '../modules/ProfilePageModules/SettingsSelect.module.css'


interface  SettingSelectInterface{
    object: any[]
    labelDate: string
    defaultSelected: string
    setStateFunction?: (type:string, value:string) => void;
}


const SettingsSelect = ({object, labelDate, defaultSelected, setStateFunction}:SettingSelectInterface) => {



    return (
        <div className={cl.container}>
            <label>{labelDate}</label>
            <select onChange={(e)=>setStateFunction!(labelDate, e.target.value)} className={cl.SettingsSelect}>
                <option selected={true} disabled={true} >
                    {defaultSelected}
                </option>
                {object.map((value, index,array)=>
                    <option key={array.length + index}>
                        {value}
                    </option>
                )}
            </select>
        </div>
    );
};

export default SettingsSelect;