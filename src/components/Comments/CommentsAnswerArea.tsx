import React, {useRef, useState} from 'react';
import cl from '../modules/CommentsModules/CommentsAnswerArea.module.css'
import TextWithAdditionalInfo from "../AdditionalComponents/TextWithAdditionalInfo";
import {textEncoder} from "../../util/TextEncoder";
import {createCommentsInterface} from "../../types";
import {useLocation} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypeSelector";

interface CommentsAnswerAreaInterface{
    cancelBtnFunc?: ()=>void
    cancelBtnFalse?: boolean
    setData: (e:string)=>void
    data: string
    createCommentFunc: ( body: createCommentsInterface )=>void
    id?: number
}


const CommentsAnswerArea = ({id,createCommentFunc,setData,data,cancelBtnFunc, cancelBtnFalse}:CommentsAnswerAreaInterface) => {

    const refTextArea = useRef<HTMLTextAreaElement>(null)
    const location = useLocation()
    const userData = useTypedSelector(user => user.user)

    function customizeText(type:string){
        let text = textEncoder(data, type, refTextArea.current!.selectionStart, refTextArea.current!.selectionEnd);
        setData(text)
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
            <textarea value={data} onChange={(e) => setData(e.target.value)} ref={refTextArea} className={cl.textAreaInput} placeholder={"Текст отзыва"}></textarea>
            <button onClick={()=>createCommentFunc(
                {
                    commentsId: id,
                    animePageId: Number(location.pathname.split("/")[2]),
                    userId: userData.id,
                    message: data ,
                    likes :[0]
                })} className={cl.sendBtn}>
                Отправить
            </button>
            <button style={cancelBtnFalse ? {display:"none"} : {}} onClick={cancelBtnFunc} className={cl.cancelBtn}>
                Отмена
            </button>
        </div>
    );
};

export default CommentsAnswerArea;