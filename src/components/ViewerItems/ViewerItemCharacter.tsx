import React, {useEffect, useState} from 'react';
import cl from '../modules/ViewerItemsModules/ViewerItemCharacter.module.css'
import {getOneCharacter} from "../../http/CharactersApi";
import {charactersAnime} from "../../types";
import MiniWindowPage from "../AdditionalComponents/MiniWindowPage";
import ViewerItemAnimeManga from "./ViewerItemAnimeManga";
import VoiceOverItem from "./VoiceOverItem";


interface ViewerItemCharacterInterFace{
    id:number
}

const ViewerItemCharacter = ({id}:ViewerItemCharacterInterFace) => {


    const [activeBtn, setActiveBtn] = useState(false)
    const [dataOfCharacter, setDataOfCharacter] = useState<charactersAnime>()


    function BtnClick(){
        if(activeBtn){
            setActiveBtn(false)
        }else{
            setActiveBtn(true)
        }
    }


    async function getCharacter(){
        const data = await getOneCharacter(id)
        if(data){
            setDataOfCharacter(data);
        }
    }


    useEffect(()=>{
        getCharacter()
    }, [])



    return (
        <div className={cl.container}>
            <div className={cl.row}>
                <div className={cl.header}>
                    <h5>
                        {dataOfCharacter?.name}
                    </h5>
                    <span>
                        {dataOfCharacter?.differentName}
                    </span>
                </div>
                <div className={cl.InfoContent}>
                    <div className={cl.ImgContainer}>
                        <img width="100px" height="140px" src={`${process.env.REACT_APP_API_URL}${dataOfCharacter?.imagePath}`} alt={""}/>
                    </div>
                    <div className={cl.MainInfoWIthLinks}>
                        <div style={dataOfCharacter?.description.length ? dataOfCharacter.description.length > 2 ? {} : {display: "none"} : {display:"none"}} className={cl.description}>
                            <div style={activeBtn ? {maxHeight: "100%"} : {}} className={cl.description_textContainer}>
                                {dataOfCharacter?.description}
                            </div>
                            <div  style={dataOfCharacter?.description.length ? dataOfCharacter.description.length < 200 ? {display: "none"} : {} : {display:"none"}} className={cl.BtnMoreDescriptionContainer}>
                                <button  onClick={()=>BtnClick()}>{activeBtn ? "Скрыть" : "Подробнее"}
                                    <svg width={"12px"} height={"12px"} style={ activeBtn ? {transform:"rotate(-90deg)", marginLeft:"4px" } : {transform:"rotate(90deg)", marginLeft:"4px"}}  fill={"black"}>
                                        <use xlinkHref={"/sprite.svg#ShevronIcon"}></use>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className={cl.CharacterOfAnime}>
                            <div className={cl.nameInfo}>
                            Аниме
                            </div>
                            <div className={cl.TapeOfAnime}>
                                {dataOfCharacter?.anime &&
                                    dataOfCharacter.anime.map((value) =>
                                        <div className={cl.SmallImgContainer}>
                                            <MiniWindowPage title={
                                                <img width="100%" height="100%"
                                                     src={`${process.env.REACT_APP_API_URL}${value?.imagePath}`}
                                                     alt={""}
                                                     style={{minHeight:"80px", minWidth:"60px", maxHeight:"80px", maxWidth:"60px", objectFit: "cover"}}
                                                />
                                            } basicState={"right"}><ViewerItemAnimeManga id={value.id} type={"anime"}/></MiniWindowPage>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className={cl.SeyuOfCharacter}>
                            <div className={cl.nameInfo}>
                                Сэйю
                            </div>
                            <div className={cl.SmallImgContainer}>
                                <MiniWindowPage title={
                                    <img width="100%" height="100%"
                                         src={`${process.env.REACT_APP_API_URL}${dataOfCharacter?.voicer?.imagePath}`}
                                         alt={""}
                                         style={{minHeight:"80px", minWidth:"60px", maxHeight:"80px", maxWidth:"60px", objectFit: "cover"}}
                                    />
                                } basicState={"right"}><VoiceOverItem id={dataOfCharacter?.voicer?.id ? dataOfCharacter.voicer.id : 0}/></MiniWindowPage>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewerItemCharacter;