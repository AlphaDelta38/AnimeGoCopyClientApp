import React, {useRef, useState} from 'react';
import cl from '../modules/CommentsModules/CommentsAnswerArea.module.css'
import TextWithAdditionalInfo from "../AdditionalComponents/TextWithAdditionalInfo";
import {textEncoder} from "../../util/TextEncoder";

interface CommentsAnswerAreaInterface{
    cancelBtnFunc?: ()=>void
    cancelBtnFalse?: boolean
}


const CommentsAnswerArea = ({cancelBtnFunc, cancelBtnFalse}:CommentsAnswerAreaInterface) => {

    const [textAreaInputdata,setTextAreaInputdata] = useState<string>("")
    const refTextArea = useRef<HTMLTextAreaElement>(null)

    function customizeText(type:string){
        let text = textEncoder(textAreaInputdata, type, refTextArea.current!.selectionStart, refTextArea.current!.selectionEnd);
        setTextAreaInputdata(text)
    }

    return (
        <div style={{width: "100%", position: "relative"}}>
            <div className={cl.reviewBodyContainer}>
                <div className={cl.textModifyContainer}>
                    <TextWithAdditionalInfo clickFunc={() => customizeText("Bold")} stylesAbove={{maxWidth: "100px"}}
                                            textAbove={"Жирный"}>
                        <svg className={cl.modifyIcon}>
                            <use xlinkHref={"/sprite.svg#BoldIcon"}></use>
                        </svg>
                    </TextWithAdditionalInfo>
                    <TextWithAdditionalInfo clickFunc={() => customizeText("Italics")} stylesAbove={{maxWidth: "100px"}}
                                            textAbove={"Курсив"}>
                        <svg className={cl.modifyIcon}>
                            <use xlinkHref={"/sprite.svg#ItalicsIcon"}></use>
                        </svg>
                    </TextWithAdditionalInfo>
                    <TextWithAdditionalInfo clickFunc={() => customizeText("UnderLine")}
                                            stylesAbove={{maxWidth: "100px"}} textAbove={"Подчеркнутый"}>
                        <svg className={cl.modifyIcon}>
                            <use xlinkHref={"/sprite.svg#UnderLinedIcon"}></use>
                        </svg>
                    </TextWithAdditionalInfo>
                    <TextWithAdditionalInfo clickFunc={() => customizeText("Crossed")} stylesAbove={{maxWidth: "100px"}}
                                            textAbove={"Зачеркнутый"}>
                        <svg className={cl.modifyIcon}>
                            <use xlinkHref={"/sprite.svg#CrossedOutIcon"}></use>
                        </svg>
                    </TextWithAdditionalInfo>
                </div>
            </div>
            <textarea value={textAreaInputdata} onChange={(e) => setTextAreaInputdata(e.target.value)} ref={refTextArea} className={cl.textAreaInput} placeholder={"Текст отзыва"}></textarea>
            <button className={cl.sendBtn}>
                Отправить
            </button>
            <button style={cancelBtnFalse ? {display:"none"} : {}} onClick={cancelBtnFunc} className={cl.cancelBtn}>
                Отмена
            </button>
        </div>
    );
};

export default CommentsAnswerArea;