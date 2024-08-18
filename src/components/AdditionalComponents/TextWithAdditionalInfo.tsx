import React, {CSSProperties, useState} from 'react';
import cl from '../modules/AdditionalComponentsModules/TextWithAdditionalInfo.module.css'


interface TextWithAdditionalInfoInterface{
    textAbove: string;
    title:string
    stylesAbove?: CSSProperties
    mainstyles?: CSSProperties
}

const TextWithAdditionalInfo = ({textAbove, title,mainstyles,stylesAbove}:TextWithAdditionalInfoInterface) => {


    const [active, setActive] = useState(false)


    return (
        <span style={mainstyles} onMouseLeave={() => { setActive(false)}} onMouseOver={() => {setActive(true)}}  className={cl.textWithInfo}>
            <div style={active ? {visibility: "visible", ...stylesAbove} : {visibility: "hidden"}} className={cl.Info}>
                {textAbove}
            </div>
            {title}
        </span>
    );
};

export default TextWithAdditionalInfo;