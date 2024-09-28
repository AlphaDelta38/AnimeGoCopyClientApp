import React, {useEffect, useState} from 'react';
import cl from '../modules/ViewerItemsModules/VoiceOverItem.module.css'
import InfoToolTip from "../AdditionalComponents/InfoToolTip";
import {calculateAge} from "../../util/CurrentDate";
import MiniWindowPage from "../AdditionalComponents/MiniWindowPage";
import ViewerItemAnimeManga from "./ViewerItemAnimeManga";
import {getOneVoicer} from "../../http/voicerApi";
import {VoiceOverGetOne} from "../../types";
import ViewerItemCharacter from "./ViewerItemCharacter";


interface  VoiceOverItemInterface{
    id: number
}

const VoiceOverItem = ({id}:VoiceOverItemInterface) => {

    const [voicerStateData, setVoicerStateData] = useState<VoiceOverGetOne>()

    async function getVoicer(){
        const voicerData = await getOneVoicer(id);
        setVoicerStateData(voicerData);
    }



    useEffect(()=>{
        if(id !== 0){
            getVoicer()
        }
    },[])


    return (
        <div className={cl.container}>
            <div className={cl.header}>
                <h4 className={cl.mainName}>{voicerStateData?.name}</h4>
                <ul className={cl.othernames}>
                    {
                        voicerStateData?.otherNames
                        &&
                        voicerStateData.otherNames.map((value)=><li>{value}</li>)
                    }
                </ul>
            </div>
            <div className={cl.contentContainer}>
                <div className={cl.imgContainer}>
                    <img src={voicerStateData?.imagePath ? `${process.env.REACT_APP_API_URL}/${voicerStateData.imagePath}` : ""} alt={""} width={"100%"} height={"100%"}/>
                </div>
                <div className={cl.content}>
                    <dl className={cl.aboutPersonContainer}>
                        <dt className={cl.personInfoItemDT}>Карьера</dt>
                        <dd className={cl.personInfoItemDD}>
                            {voicerStateData?.career}
                            <InfoToolTip cssProperties={{marginLeft:"4px"}} message={"Актёры-сэйю, озвучивавшие персонажей аниме."}/>
                        </dd>
                        <dt className={cl.personInfoItemDT}>Дата рождения</dt>
                        <dd className={cl.personInfoItemDD}>{voicerStateData?.birthDay ? voicerStateData.birthDay : ""}  {`(${calculateAge(voicerStateData?.birthDay ? voicerStateData.birthDay : "")})`}</dd>
                    </dl>
                    <div className={cl.lastProject}>
                        <h6 className={cl.textForLastProject}>Последние роли</h6>
                        <div className={cl.lastProjectItemContainer}>
                            <div className={cl.lastProjectItem}>
                                {voicerStateData?.character.map((value,index)=>
                                    <>
                                        <div key={index} className={cl.lastAnimeContainer}>
                                            <MiniWindowPage styles={{minHeight: "60px"}} title={
                                                <img style={{minHeight:"80px", minWidth:"60px", maxHeight:"80px", maxWidth:"60px", objectFit: "cover"}} width={"100%"} height={"100%"} src={`${process.env.REACT_APP_API_URL}/${value.anime[0].imagePath}`} alt={""}/>
                                            } basicState={"right"}
                                            >
                                                <ViewerItemAnimeManga id={value.anime[0].id} type={"ТВ Сериал"}/>
                                            </MiniWindowPage>
                                        </div>
                                        <div key={index} className={cl.lastGeneralPersonContainer}>
                                            <MiniWindowPage title={<img
                                                src={`${process.env.REACT_APP_API_URL}/${value.imagePath}`}
                                                alt={""} width={"100%"} height={"100%"}
                                                style={{minHeight:"80px", minWidth:"60px", maxHeight:"80px", maxWidth:"60px", objectFit: "cover"}}
                                            />
                                            } basicState={"right"}>
                                                <ViewerItemCharacter id={value.id} />
                                            </MiniWindowPage>
                                        </div>
                                    </>
                                )}
                            </div>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoiceOverItem;