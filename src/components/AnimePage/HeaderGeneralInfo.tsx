import React, {CSSProperties, useEffect, useState} from 'react';
import cl from '../modules/AnimePageModules/HeaderGeneralInfo.module.css'
import InPeopleListAnime from "./InPeopleListAnime";
import RaitingChoose from "./RaitingChoose";
import {getAllStarsOfUser} from "../../http/starsApi";
import {useLocation} from "react-router-dom";


interface HeaderGeneralInfoInterface {
    secondNames: string[]
    mainName: string
    id: number
}



interface columDataInetface{
    fieldOne: number,
    fieldTwo: number,
    fieldThree: number,
}

 export interface statisticAboutRaitingOfAnime{
    titleSettings: {
        title: string,
        styles: CSSProperties
    }
    columName: {
        one: string,
        two:string,
        three:string,
        styles: CSSProperties[]
    }
    columDataInetface: columDataInetface[],
    footer?: any;
}


const HeaderGeneralInfo = ({secondNames,mainName}:HeaderGeneralInfoInterface) => {


    const [statistic, setStatistic] = useState<statisticAboutRaitingOfAnime>()
    const [activateRequest, setActivateRequest] = useState(false)
    const location = useLocation();



    async function getStatistics() {
        try {

            const data = await getAllStarsOfUser(Number(location.pathname.split("/")[2]))
            let Nmassive = [1,2,3,4,5,6,7,8,9,10]

            setStatistic({
                titleSettings:{title:"Оценки людей", styles: {left:"-250px"}},
                columName: {one:"Голосов", two:"Процент", three:"Рейтинг", styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
                columDataInetface: [
                    // @ts-ignore
                    Nmassive?.map((value,index)=>{
                            console.log(data?.filter((value)=>value.raiting === index+1).length, data?.length)
                            return {
                                fieldOne: data ? data?.filter((value)=>value.raiting === index+1).length : 0,
                                fieldTwo: data ? (data?.filter((value)=>value.raiting === index+1).length/data?.length)*100 : 0,
                                fieldThree: (index+1),
                            }
                        })
                ]
            })


        }catch (e){

        }
    }


    useEffect(() => {
       if(activateRequest && !statistic){
           getStatistics()
       }
    }, [activateRequest]);




    return (
        <div className={cl.container}>
            <div className={cl.row}>
                <RaitingChoose />
                <div className={cl.InfoAboutUserRaiting}>
                    <InPeopleListAnime func={{setActivateRequest: setActivateRequest}} UiSettings={statistic } children={
                        <svg width={"16px"} height={"16px"}>
                            <use xlinkHref={"/sprite.svg#ToolTipWordIIcon"}></use>
                        </svg>
                    }/>
                </div>
            </div>
            <div className={cl.headerName}>
                <h1 style={{fontWeight: "500", marginBottom: "6px"}}>{mainName}</h1>
                {secondNames &&
                    secondNames.map((value) => <span className={cl.othersNames}>{value}</span>
                    )}
        </div>
</div>
)
    ;
};

export default HeaderGeneralInfo;