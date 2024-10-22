import React, {useEffect, useState} from 'react';
import cl from '../modules/AnimePageModules/Schedule.module.css'
import {ScheduleItemType} from "../../types";
import TextWithAdditionalInfo from "../AdditionalComponents/TextWithAdditionalInfo";
import {animeItemsInerface} from "../../http/anilibriaApi";
import {setWatchedSeries} from "../../http/UserApi";
import {useLocation} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypeSelector";

interface ScheduleAnimeInterface{
    item: ScheduleItemType[];
}


enum Months {
    января = 1,
    февраля,
    марта,
    апреля,
    мая,
    июня,
    июля,
    августа,
    сентября,
    октября,
    ноября,
    декабря
}

const ScheduleAnime = ({item}:ScheduleAnimeInterface) => {

    const [itemMassive, setItemMassive] = useState<ScheduleItemType[]>([]);
    const [activeOpenBtn, setActiveOpenBtn] = useState<boolean>(false)
    const [activeShedulBtn, setActiveSheduleBtn] = useState(true);

    const location = useLocation();
    const userData = useTypedSelector(user => user.user)

    function getDayForm(days: number): string {
        const absDays = Math.abs(days)

        if (absDays % 10 === 1 && absDays % 100 !== 11) {
            return 'день';
        } else if ((absDays % 10 >= 2 && absDays % 10 <= 4)) {
            return 'дня';
        } else {
            return 'дней';
        }
    }


    function calcDifferentDay(year:string, months: keyof typeof Months, day:string): string{

        const date1 = new Date(`${year}-0${Months[months]}-${day}`);
        const date2 = new Date();

        const timeDifference = date1.getTime() - date2.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24);

        return `через ${Math.ceil(daysDifference)} ${getDayForm(daysDifference)}`;
    }


    async function sendAndChangeWatchStatus(status:boolean, index:number){
        setActiveSheduleBtn(false)
        let massive = [...itemMassive]
        let tempSeriesWatched = item[0].seriesWatched
        massive[index].status = status;
        setItemMassive(massive)
        if(status){
            if(!tempSeriesWatched!.includes((item.length - (index)))){
                    tempSeriesWatched!.push((item.length - (index)))
            }
        }else {
            if(tempSeriesWatched!.includes((item.length - (index)))){
                tempSeriesWatched = tempSeriesWatched!.filter((value)=>value !== (item.length - (index)))
            }
        }


        try {
            if(tempSeriesWatched){

                item[0].seriesWatched = tempSeriesWatched;
                const response = await setWatchedSeries({seriesWatched: tempSeriesWatched!, animeId: Number(location.pathname.split('/')[2]), userId: userData.id});
                if(response !== 1){
                    let massived = [...itemMassive]
                    massived.forEach((value)=>{
                      if(value.numberOfSeries === (item.length - (index))){
                          value.status = !status
                      }
                    })
                }
                setActiveSheduleBtn(true)
            }
        }catch (e){

        }
    }


    function activeOpenBtnController(){
        if(activeOpenBtn){
            setActiveOpenBtn(false)
        }else{
            setActiveOpenBtn(true)
        }
    }


    useEffect(() => {
        let items = [...item]
        items.forEach((value)=>{
            if(items[0].seriesWatched?.includes(value.numberOfSeries)){
                value.status = true;
            }
        })
        setItemMassive(items.reverse())
    }, [item]);

    return (
        <div className={cl.container}>
            <h1 className={cl.headerText}>График выхода серий</h1>
            <p className={cl.headerDescription}><span>Внимание!</span> В графике указаны даты выхода эпизодов на телеэкранах Японии.
                Эпизоды у нас на сайте появляются в течение дня либо на следующий день, потому что для фандаб групп требуется время на их перевод и озвучивание.
            </p>
            <div style={activeOpenBtn ? {maxHeight:"100%"} : {}} className={cl.scheduleTableContainer}>
                <div className={cl.scheduleHeader}>
                    <div style={{color:"#fff"}} className={cl.numberOfSeries}>Номер серии</div>
                    <div style={{color:"#fff"}} className={cl.nameOfSeries}>Название</div>
                    <div style={{color:"#fff"}} className={cl.dateOfOut}>Дата выхода</div>
                    <div style={{color:"#fff"}} className={cl.statusOfWatching}>Статус</div>
                </div>
                {itemMassive.map((value,index) =>
                    <div style={activeShedulBtn ? {} : {pointerEvents: "none"}} key={index} className={cl.scheduleItem}>
                        <div className={cl.numberOfSeries}>{value.numberOfSeries + " серия"}</div>
                        <div className={cl.nameOfSeries}>{value.nameOfSeries}</div>
                        <div style={value.nameOfSeries.split(" ")[0] === "Episode" ? {textDecoration:"1px dotted underline", textUnderlineOffset:"4px"} : {}} className={cl.dateOfOut}>
                            { value.nameOfSeries.split(" ")[0] === "Episode" ?
                                <TextWithAdditionalInfo
                                    textAbove={calcDifferentDay(value.dateOfOut.split(" ")[2],value.dateOfOut.split(" ")[1]  as keyof typeof Months, value.dateOfOut.split(" ")[0],)}
                                    title={value.dateOfOut}
                                    mainstyles={{marginRight:"0",marginLeft:"auto"}}
                                    stylesAbove={{}}
                                />
                                :
                                `${value.dateOfOut}`
                                }
                        </div>
                        <div aria-disabled={true} style={value.nameOfSeries.split(" ")[0] === "Episode" ? {display:"none"} : {}} className={cl.statusOfWatching}>{value.status ?
                            <button onClick={()=>sendAndChangeWatchStatus(false, index)} className={cl.EyeBtn}>
                                <svg className={cl.EyeIcon}>
                                    <use xlinkHref={"/sprite.svg#EyeIcon"}></use>
                                </svg>
                            </button>
                            :
                            <button onClick={()=>sendAndChangeWatchStatus(true, index)} className={cl.EyeBtn}>
                                <svg  className={cl.EyeIconNonActive}>
                                    <use xlinkHref={"/sprite.svg#EyeCrossedIcon"}></use>
                                </svg>
                            </button>
                        }
                        </div>
                    </div>
                )}
            </div>
            <button onClick={()=>activeOpenBtnController()} className={cl.openMoreBtn}>
                {activeOpenBtn ? "Скрыть" : "Показать ещё"}
                <span>
                    <svg className={activeOpenBtn ? cl.shevronOpenBtnActive : cl.shevronOpenBtn}>
                        <use xlinkHref={"/sprite.svg#ShevronIcon"}></use>
                    </svg>
                </span>
            </button>
        </div>
    );
};

export default ScheduleAnime;