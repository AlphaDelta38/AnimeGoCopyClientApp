import React, {useEffect, useRef, useState} from 'react';
import cl from "../modules/AnimePageModules/Reviews.module.css";
import {textDecoder} from "../../util/TextEncoder";
import {Months} from "../../util/CurrentDate";
import {setReviewLikes} from "../../http/AnimePageItemApi";
import {useTypedSelector} from "../../hooks/useTypeSelector";
import {Link, useLocation} from "react-router-dom";



interface ReviewItemInterfcae{
    stars: number,
    profilePhoto: string,
    userName: string,
    title: string,
    text: string,
    likes: number[],
    createdAt: string
    arrayLenght: number,
    index: number
    id:number
}


interface likesMassiveInterfcae{
    likes: number[]
    likesNumber: number
}


const ReviewItem = ({ id,arrayLenght,index,createdAt,likes,text,stars,profilePhoto,userName,title}:ReviewItemInterfcae)=> {

    const [moreBtnActive, setMoreBtnActive] = useState(false);
    const [likesMassive, setLikesMassive] = useState<likesMassiveInterfcae>({likesNumber: 0,likes: []});

    const refForTextContainer = useRef<HTMLDivElement | null>(null);

    const userData = useTypedSelector(user => user.user);
    const location = useLocation()


    function likesCalc(masssive?: number[] ) {

        let likesCount:number[] = [];
        if(masssive){
            likesCount = [...masssive]
        }
        if(likesCount.length === 0){
            likesCount = [...likes]
        }
        const likesNumber= likesCount.filter((value)=>value > 0).length - likesCount.filter((value)=>value < 0).length
        if(masssive){
            setLikesMassive({likesNumber, likes: [...masssive]})
        }else{
            setLikesMassive({likes: [...likes], likesNumber})
        }

    }

    async function setLikes(type:string, likesInput: number){
        let typeCheck = type;
        if(likesMassive.likes.includes(likesInput)){
            typeCheck = "delete"
        }

        const response = await setReviewLikes({reviewId: id, likes: likesInput, type: typeCheck})
        if(response === 1){
            let likes = [...likesMassive.likes]
            let newMassvie = likes.filter((value)=>value !== likesInput && value !== (likesInput *-1))
            if(typeCheck !== "delete"){
                newMassvie.push(likesInput)
            }
            setLikesMassive({...likesMassive, likes: newMassvie})
            likesCalc(newMassvie)
        }
    }


    useEffect(() => {
        if(text && refForTextContainer.current){
            refForTextContainer.current.innerHTML = textDecoder(text)

            setLikesMassive({likes: [...likes], likesNumber:0})
            likesCalc();

        }
    }, [text]);

    return (
        <div className={cl.reviewItems}>
            <div className={cl.reviewItems__header}>
                <div className={cl.itemsHeader__container}>
                    <div className={cl.itemsHeader_photoContainer}>
                        <img width={"100%"} height={"100%"} src={`${process.env.REACT_APP_API_URL}/${profilePhoto}`} alt={"photo"} className={cl.items_photo}/>
                    </div>
                    <div className={cl.itemsHeader_infoContainer}>
                        <h3 className={cl.items__title}>{title}</h3>
                        <div className={cl.items__starsContainer}>
                            {Array.from({length: stars }).map(()=>
                                <svg width={"16px"} height={"16px"} fill={"#e4bb24"}>
                                    <use xlinkHref={"/sprite.svg#RaitingStar"}></use>
                                </svg>
                            )}
                        </div>
                        <div className={cl.items_userName}>
                            {userName}
                        </div>
                        <span className={cl.items__sentDate}>
                            {`${new Date(createdAt).getDay()} ${Months[new Date(createdAt).getMonth()]} ${new Date(createdAt).getFullYear()}`}
                        </span>
                    </div>
                </div>
            </div>
            <div className={cl.textContainer}>
                <div ref={refForTextContainer} style={moreBtnActive ? {maxHeight:"100%", background: "none"} : {}} className={cl.text}>

                </div>
                <button style={text.length > 1200 ? {}  : {display:"none"}} onClick={() => moreBtnActive ? setMoreBtnActive(false) : setMoreBtnActive(true)}
                        className={cl.text__moreBtn}>
                    {moreBtnActive ? "Скрыть" : "Читать дальше"}
                </button>
            </div>
            <div style={(arrayLenght - 1) - index === 0 ? {} : {borderBottom: "3px solid #ff5c57"}}
                 className={cl.likesContainer}>
                <h2>Понравился отзыв?</h2>
                <span style={likesMassive?.likesNumber < 0 ? {color:"red"} : {}}>{likesMassive?.likesNumber}</span>
                <div className={cl.likesSvgContainer}>
                    <svg  style={likesMassive.likes.includes(userData.id) ? {fill: "black"} : {}} onClick={()=>setLikes("like", userData.id)}  className={cl.likesIcon}>
                        <use xlinkHref={"/sprite.svg#likeIcon"}></use>
                    </svg>
                    <svg style={likesMassive.likes.includes(userData.id * -1) ? {fill: "black"} : {}} onClick={()=>setLikes("like", (userData.id* -1))} className={cl.likesIcon}>
                        <use xlinkHref={"/sprite.svg#dislikeIcon"}></use>
                    </svg>
                </div>
            </div>

        </div>
    );
};

export default ReviewItem;