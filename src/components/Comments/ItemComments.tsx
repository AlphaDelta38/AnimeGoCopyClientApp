import React, {useEffect, useRef, useState} from 'react';
import cl from '../modules/CommentsModules/ItemComments.module.css'
import CommentsAnswerArea from "./CommentsAnswerArea";
import {commentsItemsInterface, createCommentsInterface} from "../../types";
import {textDecoder} from "../../util/TextEncoder";
import {useTypedSelector} from "../../hooks/useTypeSelector";
import {setLikesForAnime} from "../../http/AnimePageItemApi";

interface ItemCommentsInterface{
    mainCommentFieldActive:boolean
    setMainCommentFieldActe: (e:boolean)=>void
    currentActiveId :number
    setCurrentActiveId: (e:number)=>void
    id:number
    item: commentsItemsInterface
    childrenItems: commentsItemsInterface[] | null
    setData: (e:string)=>void
    data: string
    createCommentFunc: ( body: createCommentsInterface )=>void
}


const ItemComments = ({createCommentFunc, setData, data,childrenItems,item,mainCommentFieldActive, setMainCommentFieldActe,currentActiveId,setCurrentActiveId, id}:ItemCommentsInterface) => {

    const [hideActive, setHideActive] = useState(false);
    const [answerAreaActive, setAnswerAreaActive] = useState<boolean>(false);
    const [answersHideActive, setAnswersHideActive] = useState(false);
    const [currentLikeState, setCurrentLikeState] = useState<string>("")
    const refOnMessageField = useRef<HTMLDivElement | null>(null)

    const userData = useTypedSelector(user => user.user)


    const [requestLimiter, setRequestLimiter] = useState<boolean>(true)



    function checkAnswerAreaActive(){
        if(answerAreaActive){
            setAnswerAreaActive(false)
            setMainCommentFieldActe(true)
        }else{
            setAnswerAreaActive(true)
            setCurrentActiveId(id)
            setMainCommentFieldActe(false)
        }
    }

    function checkHideActive(){
        if(hideActive){
            setHideActive(false)
        }else{
            setHideActive(true)
        }
    }

    function checkAnswersHideActive(){
        if(answersHideActive){
            setAnswersHideActive(false)
        }else{
            setAnswersHideActive(true)
        }
    }


    async function setLikes(type: string){
        let likes =0;


        if(type === "likes"){
            likes = userData.id
            setCurrentLikeState("like")
        }else if("dislike"){
            likes = userData.id * -1;
            setCurrentLikeState("dislike")
        }
        setRequestLimiter(false)
        const response =  await setLikesForAnime(item.id, likes)
        if(response === 1){

            if(type === "likes"){
                item.likes = [item.likes[item.likes.length-1]+1]
            }else if("dislike"){
                item.likes = [item.likes[item.likes.length-1]-1]
            }
        }else{
            if(currentLikeState === "like"){
                setCurrentLikeState("dislike")
            }else{
                setCurrentLikeState("like")
            }
        }
        setRequestLimiter(true)
    }

    useEffect(() => {
        if(currentActiveId !== id || mainCommentFieldActive){
            setAnswerAreaActive(false)
        }
    }, [currentActiveId, mainCommentFieldActive]);

    function timeConverter(timeStamp: string){

        const rtf = new Intl.RelativeTimeFormat("ru", {style:"long", numeric:"auto"})
        const date = new Date(timeStamp); // Создаем дату
        // Текущая дата и время
        const now = new Date();

        // Разница в миллисекундах между текущим временем и переданным timestamp
        const diffMs = now.getTime() - date.getTime()+1000 ;

        // Константы для расчёта
        const msInSecond = 1000;
        const msInMinute = 60 * msInSecond;
        const msInHour = 60 * msInMinute;
        const msInDay = 24 * msInHour;
        const msInMonth = 30 * msInDay; // Приблизительное значение
        const msInYear = 365 * msInDay; // Учитываем не високосный год

        // Расчёт времени
        const years = Math.floor(diffMs / msInYear); // Лет
        const months = Math.floor((diffMs % msInYear) / msInMonth); // Месяцев
        const days = Math.floor((diffMs % msInMonth) / msInDay); // Дней
        const hours = Math.floor((diffMs % msInDay) / msInHour); // Часов
        const minutes = Math.floor((diffMs % msInHour) / msInMinute); // Минут


        if(years >= 1){
            return  rtf.format(-years, "years")
        }else if(months >= 1){
            return  rtf.format(-months, "months")
        }else if(days >= 1){
            return  rtf.format(-days, "days")
        }else if(hours >= 1){
            return  rtf.format(-hours, "hours")
        }else if(minutes >= 1){
            return  rtf.format(-minutes, "minutes")
        }

    }


    useEffect(()=>{
        if(item.message && refOnMessageField.current && !userData.id){
            refOnMessageField.current!.innerHTML = textDecoder(item.message);
        }
        if(item.likes && userData.id !== 0){
            for (let i = 0; i < item.likes.length; i++) {
                if(item.likes[i] === userData.id){
                    setCurrentLikeState("like")

                }else if(item.likes[i] === userData.id*-1){
                    setCurrentLikeState("dislike")
                }
            }

        }
    },[item.message, refOnMessageField, userData.id])





    return (
        <div className={cl.container}>
            <div className={cl.userImageContainer}>
                <img src={item.photoPath ? `${process.env.REACT_APP_API_URL}/${item.photoPath}` : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg"} alt={""}/>
            </div>
            <div className={cl.bodyCommentContainer}>
                <div className={cl.bodyHeader}>
                    <div className={cl.infoAboutComment}>
                        <div className={cl.userName}>{item.name ? item.name : "Неизвесто"}</div>
                        <span className={cl.circleSpan}>•</span>
                        <div className={cl.timeInfo}>{timeConverter(item.createdAt)}</div>
                        <span style={item.comments ? {} : {display:"none"}} className={cl.circleSpan}>
                            <svg className={cl.shevronCommentIcon}>
                                <use xlinkHref={"/sprite.svg#ShevronIcon"}></use>
                            </svg>
                        </span>
                        <span style={item.comments ? {} : {display:"none"}} className={cl.responseName}>
                            {item.comments ? item.comments.name : "Неизвестно"}
                        </span>
                    </div>
                    <button className={cl.threeDotBtn}>
                        <svg>
                            <use xlinkHref={"/sprite.svg#threeDotIcon"}></use>
                        </svg>
                    </button>
                </div>
                <div className={cl.textOfCommentContainer}>
                    <div ref={refOnMessageField} style={hideActive ? {maxHeight: "100%"} : {}} className={cl.text}>

                    </div>
                    <div style={item.message.length > 100 ? {} : {display: "none"}} onClick={() => checkHideActive()}
                         className={cl.hideBtn}>
                        {hideActive ? "Скрыть" : "Читать дальше"}
                    </div>
                </div>
                <div className={cl.actionsWithComment}>
                    <span onClick={() => checkAnswerAreaActive()} className={cl.answerBtn}>ОТВЕТИТЬ</span>
                    <span className={cl.countLikes}>{item.likes[item.likes.length -1]}</span>
                    <div style={requestLimiter ? {} : {opacity: 0.5}} className={cl.likeAndDislikeContainer}>
                        <button   onClick={()=>setLikes("likes")} className={cl.likeIcon}>
                            <svg style={currentLikeState === "like" ? {fill: "green"} : {}}>
                                <use xlinkHref={"/sprite.svg#likeIcon"}></use>
                            </svg>
                        </button>
                        <button onClick={()=>setLikes("dislike")} className={cl.disLikeIcon}>
                            <svg style={currentLikeState === "dislike" ? {fill: "red"} : {}}>
                                <use xlinkHref={"/sprite.svg#dislikeIcon"}></use>
                            </svg>
                        </button>
                    </div>
                </div>
                <div style={answerAreaActive ? {display: "block"} : {display: "none"}}
                     className={cl.divForCommentAnswerArea}>
                    <CommentsAnswerArea id={id} createCommentFunc={createCommentFunc} data={data}  setData={setData} cancelBtnFunc={() => checkAnswerAreaActive()}/>
                </div>
                <div style={childrenItems && childrenItems!.length <= 2 || childrenItems===null ? {display:"none"} : {}}
                     onClick={() => checkAnswersHideActive()} className={cl.hideBtn}>
                    {answersHideActive ? "Скрыть ответы" : `Показать все ответы (${childrenItems && childrenItems.length-2})`}
                </div>
                <div style={answersHideActive ? {} : {}} className={cl.childrenComments}>
                    {
                        childrenItems && childrenItems.map((value, index) =>
                        <div style={answersHideActive ? {} : index === childrenItems.length-1 || index === childrenItems.length-2 ? {} : {display:"none"}}>
                            <ItemComments
                                createCommentFunc={createCommentFunc}
                                setData={setData}
                                data={data}
                                key={value.id}
                                item={childrenItems[index]}
                                childrenItems={null}
                                mainCommentFieldActive={mainCommentFieldActive}
                                setMainCommentFieldActe={setMainCommentFieldActe}
                                setCurrentActiveId={setCurrentActiveId}
                                currentActiveId={currentActiveId} id={value.id}/>
                        </div>
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default ItemComments;