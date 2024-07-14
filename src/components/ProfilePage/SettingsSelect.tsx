import React from 'react';
import cl from '../modules/ProfilePageModules/SettingsSelect.module.css'


interface  SettingSelectInterface{
    object: any[]
    labelDate: string
    defaultSelected: string
}


const SettingsSelect = ({object, labelDate, defaultSelected}:SettingSelectInterface) => {

    return (
        <div className={cl.container}>
            <label>{labelDate}</label>
            <select className={cl.SettingsSelect}>
                <option defaultValue={defaultSelected}>
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