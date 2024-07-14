import React, {CSSProperties} from 'react';
import cl from '../modules/ProfilePageModules/SettingsInput.module.css'


interface  SettingsInputInterface {
    labelDate: string
    notice?: string
    styles?: CSSProperties
}


const SettingsInput = ({labelDate, notice, styles}:SettingsInputInterface) => {
    return (
        <div className={cl.inputContainer}>
            <label className={cl.HeaderOfInput}>
                {labelDate}
            </label>
            <input style={{...styles}} className={cl.AdaptiveInput} />
            <small style={ notice ? {} : {display: "none"}} className={cl.underNotice}>{notice}</small>
        </div>
    );
};

export default SettingsInput;