import React, {CSSProperties, ReactNode, useState} from 'react';
import cl from '../modules/AdditionalComponentsModules/TextWithAdditionalInfo.module.css'


interface TextWithAdditionalInfoInterface{
    textAbove: string;
    title?:string
    stylesAbove?: CSSProperties
    mainstyles?: CSSProperties
    children?: ReactNode;
    clickFunc?: (e:any)=>any
}

const TextWithAdditionalInfo: React.FC<TextWithAdditionalInfoInterface> = ({textAbove, title,mainstyles,stylesAbove, children,clickFunc}) => {


    const [active, setActive] = useState(false)


    return (
        <span onClick={clickFunc} style={mainstyles} onMouseLeave={() => { setActive(false)}} onMouseOver={() => {setActive(true)}}  className={cl.textWithInfo}>
            <div style={active ? {visibility: "visible", ...stylesAbove} : {visibility: "hidden"}} className={cl.Info}>
                {textAbove}
            </div>
            {title || children}
        </span>
    );
};

export default TextWithAdditionalInfo;