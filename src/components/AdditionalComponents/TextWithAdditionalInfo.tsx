import React, {useState} from 'react';
import cl from '../modules/AdditionalComponentsModules/TextWithAdditionalInfo.module.css'


interface TextWithAdditionalInfoInterface{
    textAbove: string;
    title:string
}

const TextWithAdditionalInfo = ({textAbove, title}:TextWithAdditionalInfoInterface) => {


    const [active, setActive] = useState(false)


    return (
        <span onMouseLeave={() => { setActive(false)}} onMouseOver={() => {setActive(true)}}  className={cl.textWithInfo}>
            <div style={active ? {visibility: "visible"} : {visibility: "hidden"}} className={cl.Info}>
                {textAbove}
            </div>
            {title}
        </span>
    );
};

export default TextWithAdditionalInfo;