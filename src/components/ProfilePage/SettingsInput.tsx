import React, {CSSProperties} from 'react';
import cl from '../modules/ProfilePageModules/SettingsInput.module.css'


interface  SettingsInputInterface {
    labelDate: string
    notice?: string
    styles?: CSSProperties
    linkedState: string,
    funcSetLinkedState: (nameField: string, value:string)=>void
}


const SettingsInput = ({labelDate, notice, styles, linkedState, funcSetLinkedState}:SettingsInputInterface) => {
    return (
        <div className={cl.inputContainer}>
            <label className={cl.HeaderOfInput}>
                {labelDate}
            </label>
            <input value={linkedState} onChange={(e)=>funcSetLinkedState(labelDate, e.target.value)} style={{...styles}} className={cl.AdaptiveInput} />
            <small style={ notice ? {} : {display: "none"}} className={cl.underNotice}>{notice}</small>
        </div>
    );
};

export default SettingsInput;