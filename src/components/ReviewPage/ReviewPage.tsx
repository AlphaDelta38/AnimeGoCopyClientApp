import React, {useContext, useEffect, useRef, useState} from 'react';
import cl from '../modules/ReviewPageModules/ReviewPage.module.css'
import RaitingChoose from "../AnimePage/RaitingChoose";
import TextWithAdditionalInfo from "../AdditionalComponents/TextWithAdditionalInfo";
import {textDecoder, textEncoder} from '../../util/TextEncoder'
import {currentDate} from "../../util/CurrentDate";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";


const ReviewPage = () => {

    const [headerInputData, setHeaderInputData] = useState<string>("")
    const [textAreaInputdata,setTextAreaInputdata] = useState<string>("")
    const [reviewCreateActive, setReviewCreateActive] = useState<boolean>(true)

    const refTextArea = useRef<HTMLTextAreaElement>(null)
    const refDescription = useRef<HTMLDivElement>(null)

    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!

    function customizeText(type:string){
        let text = textEncoder(textAreaInputdata, type, refTextArea.current!.selectionStart, refTextArea.current!.selectionEnd);
        setTextAreaInputdata(text)
    }


    function controllerReviewActive(){
            if(textAreaInputdata.length >= 1 || headerInputData!.length >= 1){
                setReviewCreateActive(false)
            }
    }

    useEffect(() => {
        if(!reviewCreateActive){
            refDescription.current!.innerHTML = textDecoder(textAreaInputdata);
        }
    }, [reviewCreateActive]);


    return (
        <div style={ MobileNavBarActive ?  {transform:"translate3d(var(--translate-value), 0, 0)"} : {}} className={cl.container}>
            <div className={cl.row}>
                <div className={cl.contentContainer}>
                    <div className={cl.content}>
                        <div className={cl.header}>
                            <h1>Мой отзыв к аниме «<span>Аля иногда кокетничает со мной по-русски</span>»</h1>
                        </div>
                        <RaitingChoose/>
                        <div className={cl.infoContainer}>
                            <div className={cl.aboveInfo}>
                                Чтобы ваш отзыв был опубликован на сайте, вам нужно придерживаться следующих правил:
                            </div>
                            <ol className={cl.info}>
                                <li>Отзыв не может быть слишком коротким — избегайте односложных и чисто эмоциональных высказываний.</li>
                                <li>Не стоит отклоняться от предмета обсуждения.</li>
                                <li>Пожалуйста, не используйте в отзыве оскорбления и нецензурную лексику, а также призывы к насилию и высказывания, направленные на разжигание расовой, межнациональной и религиозной розни.</li>
                                <li>Не пишите транслитом или только заглавными буквами.</li>
                                <li>Не копируйте отзывы с других сайтов, нам важно именно ваше мнение.</li>
                                <li>Не размещайте рекламу.</li>
                                <li>Старайтесь соблюдать элементарные орфографические и пунктуационные правила русского языка, при большом количестве ошибок отзыв будет отклонен.</li>
                            </ol>
                            <div className={cl.underInfo}>
                                И запаситесь терпением, все отзывы публикуются только после модерации, поэтому ваш отзыв
                                может появиться на сайте с некоторым опозданием.
                            </div>
                        </div>
                        <div style={reviewCreateActive ? {} : {display:"none"}} className={cl.createReviewContainer}>
                            <input className={cl.inputHeader} value={headerInputData} onChange={(e)=>setHeaderInputData(e.target.value)} placeholder={"Укажите заголовок вашего отзыва"} />
                            <small className={cl.exampleInputDataInfo}>Пример: Аниме, которое хочется смотреть снова и снова</small>
                            <div className={cl.reviewBodyContainer}>
                                <div className={cl.textModifyContainer}>
                                    <TextWithAdditionalInfo clickFunc={()=>customizeText("Bold")} stylesAbove={{maxWidth:"100px"}} textAbove={"Жирный"}>
                                        <svg className={cl.modifyIcon}>
                                            <use xlinkHref={"/sprite.svg#BoldIcon"}></use>
                                        </svg>
                                    </TextWithAdditionalInfo>
                                    <TextWithAdditionalInfo clickFunc={()=>customizeText("Italics")} stylesAbove={{maxWidth:"100px"}} textAbove={"Курсив"}>
                                        <svg className={cl.modifyIcon}>
                                            <use xlinkHref={"/sprite.svg#ItalicsIcon"}></use>
                                        </svg>
                                    </TextWithAdditionalInfo>
                                    <TextWithAdditionalInfo clickFunc={()=>customizeText("UnderLine")} stylesAbove={{maxWidth:"100px"}} textAbove={"Подчеркнутый"}>
                                        <svg className={cl.modifyIcon}>
                                            <use xlinkHref={"/sprite.svg#UnderLinedIcon"}></use>
                                        </svg>
                                    </TextWithAdditionalInfo>
                                    <TextWithAdditionalInfo clickFunc={()=>customizeText("Crossed")} stylesAbove={{maxWidth:"100px"}} textAbove={"Зачеркнутый"}>
                                        <svg className={cl.modifyIcon}>
                                            <use xlinkHref={"/sprite.svg#CrossedOutIcon"}></use>
                                        </svg>
                                    </TextWithAdditionalInfo>
                                </div>
                                <textarea   value={textAreaInputdata} onChange={(e)=>setTextAreaInputdata(e.target.value)} ref={refTextArea} className={cl.textAreaInput} placeholder={"Текст отзыва"}></textarea>
                                <div className={cl.btnContainer}>
                                    <button className={cl.sendBtn}>
                                        Отправить
                                    </button>
                                    <button onClick={()=>controllerReviewActive()} className={cl.preViewBtn}>
                                        Предпросмотр
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div style={reviewCreateActive ? {display:"none"} : {}} className={cl.previewContainer}>
                            <h3 className={cl.previewTitle}>Предварительный просмотр</h3>
                            <div className={cl.previewHeader}>
                                <div className={cl.userImageContainer}>
                                    <img src={"https://animego.org/media/cache/thumbs_60x60/upload/avatar/6294db1666f75353368830.jpg"} alt={""}/>
                                </div>
                                <div className={cl.previewHeaderInfoContainer}>
                                    <div className={cl.previewHeaderName}>
                                        {headerInputData}
                                    </div>
                                    <div className={cl.userInfo}>
                                        <div className={cl.userName}>alphadelta38</div>
                                        <div className={cl.currentData}>{currentDate()}</div>
                                    </div>
                                </div>
                            </div>
                            <hr style={{marginTop:"1rem", borderTop:"1px solid rgba(0, 0, 0, .1)", width:"100%", marginBottom:"1rem"}}/>
                            <div  ref={refDescription} className={cl.description}></div>
                            <button onClick={()=>setReviewCreateActive(true)} className={cl.returnToRedactBtn}>Вернуться к редактированию</button>
                        </div>
                    </div>
                </div>
                <div className={cl.mediaPhotoContainer}>
                    <div className={cl.mediaPhoto}>
                        <img className={cl.photo}
                             src={"https://animego.org/media/cache/thumbs_250x350/upload/anime/images/6666f004dfd2b410317205.jpg"}
                             alt={""}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;