import React, {useEffect, useState} from 'react';
import cl from '../modules/CommentsModules/ItemComments.module.css'
import CommentsAnswerArea from "./CommentsAnswerArea";

interface ItemCommentsInterface{
    mainCommentFieldActive:boolean
    setMainCommentFieldActe: (e:boolean)=>void
    currentActiveId :number
    setCurrentActiveId: (e:number)=>void
    id:number
}


const ItemComments = ({mainCommentFieldActive, setMainCommentFieldActe,currentActiveId,setCurrentActiveId, id}:ItemCommentsInterface) => {

    const [hideActive, setHideActive] = useState(false);
    const [answerAreaActive, setAnswerAreaActive] = useState<boolean>(false);

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

    useEffect(() => {
        if(currentActiveId !== id){
            setAnswerAreaActive(false)
        }
    }, [currentActiveId]);

    return (
        <div className={cl.container}>
            <div className={cl.userImageContainer}>
                <img src={"https://animego.org/media/cache/thumbs_60x60/upload/avatar/6294db1666f75353368830.jpg"} alt={""}/>
            </div>
            <div className={cl.bodyCommentContainer}>
                <div className={cl.bodyHeader}>
                    <div className={cl.infoAboutComment}>
                        <div className={cl.userName}>alphadelta38</div>
                        <span className={cl.circleSpan}>•</span>
                        <div className={cl.timeInfo}>12 часов назад</div>
                    </div>
                    <button className={cl.threeDotBtn}>
                        <svg>
                            <use xlinkHref={"/sprite.svg#threeDotIcon"}></use>
                        </svg>
                    </button>
                </div>
                <div className={cl.textOfCommentContainer}>
                    <div style={hideActive ? {maxHeight:"100%"} : {}} className={cl.text}>
                        Админ молодец, но еще осталось добавить несколько прикольных анимешек: "Мифический дух: Хроники 2", "О движении Земли", "Арифурэта: Сильнейший ремесленник в мире 3", "Повелитель демонов 2099", "Жизнь с нуля в альтернативном мире 3", "Синяя тюрьма: Блю Лок против юношеской сборной Японии", "Брачные узы с семьёй Амагами", "Синие Мибуро", "Игра на триллион", "Может, я встречу тебя в подземелье? 5", "Незнакомцы в другой жизни", "Дандадан", "Бродяга Кэнсин: Беспорядки в Киото", "Рон Камонохаси: Невменяемый детектив 2", "Рубеж Шангри-Ла: Любитель игрошлака бросает вызов топ-игре 2", "Терминатор".
                    </div>
                    <div onClick={()=>checkHideActive()} className={cl.hideBtn}>
                        {hideActive ? "Скрыть" : "Читать дальше"}
                    </div>
                </div>
                <div className={cl.actionsWithComment}>
                    <span onClick={()=>checkAnswerAreaActive()} className={cl.answerBtn}>ОТВЕТИТЬ</span>
                    <span className={cl.countLikes}>1</span>
                    <div className={cl.likeAndDislikeContainer}>
                        <button className={cl.likeIcon}>
                            <svg>
                                <use xlinkHref={"/sprite.svg#likeIcon"}></use>
                            </svg>
                        </button>
                        <button className={cl.disLikeIcon}>
                            <svg>
                                <use xlinkHref={"/sprite.svg#dislikeIcon"}></use>
                            </svg>
                        </button>
                    </div>
                </div>
                <div style={answerAreaActive ? {display:"block"} : {display:"none"}} className={cl.divForCommentAnswerArea}>
                    <CommentsAnswerArea cancelBtnFunc={()=>checkAnswerAreaActive()}/>
                </div>
                <div className={cl.childrenComments}>

                </div>
            </div>
        </div>
    );
};

export default ItemComments;