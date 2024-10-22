import React, {useEffect, useRef, useState} from 'react';
import {MessegesInterface} from "../../types";
import cl from '../modules/HeaderModules/Messeges.module.css'
import {useTypedSelector} from "../../hooks/useTypeSelector";
import {useDispatch} from "react-redux";
import {deleteMesseage} from "../../http/UserApi";
import {setUserMessagesActionCreator} from "../../Store/action-creator/userActionCreator";


const MessegesComponent = (obj : MessegesInterface) => {

    const data = useTypedSelector(state=>state.user)
    const dispatch = useDispatch()
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isSeen, setIsSeen] = useState<boolean>(false)

    async function deleteThisMessage(){
        if(obj.id){
            const successOfOperation = await deleteMesseage(obj.id)
            if(successOfOperation === 1){
                const filtered = data.messages?.filter((value)=>value.id !== obj.id)
                if(filtered){
                    dispatch(setUserMessagesActionCreator(filtered))
                }
                const string = localStorage.getItem("isSeenMessage")
                if(string !== null){
                    const massvie = JSON.parse(string)
                    massvie.filter((value:number)=>Number(value) !== obj.id)
                    localStorage.setItem("isSeenMessage", JSON.stringify(massvie))
                }
            }
        }
    }
    useEffect(()=>{
        const messageNumbers = localStorage.getItem("isSeenMessage")
        if(messageNumbers){
            let numberOfMessages = JSON.parse(messageNumbers)
            if(numberOfMessages !== null){
                if(numberOfMessages.includes(obj.id)){
                    setIsSeen(true)
                }
            }
        }
    }, [])

    useEffect(() => {
        if(isSeen){
            const messageNumbers = localStorage.getItem("isSeenMessage")
            console.log(messageNumbers)
            if(messageNumbers === null){
                let numberMassive = [];
                numberMassive.push(obj.id)
                localStorage.setItem("isSeenMessage", JSON.stringify(numberMassive))
            }else{
                let numberMassive = JSON.parse(messageNumbers)
                if(!numberMassive.includes(obj.id)){
                    numberMassive.push(obj.id)
                }
                localStorage.setItem("isSeenMessage", JSON.stringify(numberMassive))
            }
        }
    }, [isSeen]);

    return (
        <div onMouseOver={()=>setIsSeen(true)} ref={containerRef}  style={{...obj.styles}} className={ !isSeen  ? cl.MessegeContainerNotSeen :  cl.MessegeContainer}>
            <div className={cl.ImageContainer}>
                <img style={{borderRadius: "50%"}} width="100%" height="100%" src={`${process.env.REACT_APP_API_URL}/${obj.imgUrl}`} alt={""}/>
            </div>
            <div  className={cl.InfoContainer}>
                <div >
                    {"Аниме"} <span style={{fontWeight: "600"}}>{obj.AnimeName}</span>
                    {` - добавлена ${obj.NofSeries}-я серия с русской озвучкой ${obj.VoiceOver}`}
                </div>
                <div  style={{position:"relative", display: "flex"}} >
                    {obj.when}
                </div>
            </div>
            <div onClick={()=>deleteThisMessage()} title={"Удалить"} className={cl.deleteIconContainer}>
                    <svg className={cl.deleteIcon}>
                        <use xlinkHref={"/sprite.svg#deleteIcon"}></use>
                    </svg>
            </div>
        </div>
    );
};

export default MessegesComponent;