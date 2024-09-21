import React, {useContext, useEffect, useRef, useState} from 'react';
import cl from '../modules/GeneralPageModules/GeneralPage.module.css'
import UpDownWeeklyContent from "./UpDownWeeklyContent";
import {RecentlyItemOjbectsInterface} from "../../types";
import RecentlyOutAnime from "./RecentlyOutAnime";
import AnimeContent from "../AnimeChooseContent/AnimeContent";
import {DateContext} from "../../context/context";
import Footer from "../AdditionalComponents/Footer";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";




const GeneralPage = () => {




    const [CurrentSeason , setCurrentSeason] = useState<string>("")
    const [StartPoint, setStartPoint] = useState<number>(0)
    const [startingWork, setStartingWork] = useState<number>(0)
    const [LastPositionForEquals , setLastPositionForEquals] =useState<number>(0)
    const [SmothAvaible , setSmothAvaible] = useState<boolean>(false)
    const [type, setType] = useState<string>("")
    const widthScale = useRef<HTMLDivElement | null>(null)
    const [CurrentWidthTape, setCurrentWidthTape] = useState<number>(0)

    const {MobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!

    function StartSliderCalc(e:any, type: string){
        if(type === "desktop") {
            if (StartPoint === 0) {
                setStartPoint(e.clientX)
                setLastPositionForEquals(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sliderTranslate')))
            }
        }else{
            if (StartPoint === 0) {
                setStartPoint(e.touches[0].clientX)
                setLastPositionForEquals(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sliderTranslate')))
            }
        }

        setStartingWork(startingWork + 1)
        setSmothAvaible(false)
        setType(type)
        if(widthScale.current){
            setCurrentWidthTape(widthScale.current?.clientWidth)
        }
    }

    function MoveSlider(e:any){

        if(type === "mobile"){
            if(StartPoint !==0) {
                let CalcNumber = ((e.touches[0].clientX - StartPoint )/38 +  LastPositionForEquals);
                document.documentElement.style.setProperty('--sliderTranslate', `${CalcNumber}%`)
            }
        }
        if(type === "desktop"){
            if(StartPoint !==0) {
                let CalcNumber = ((e.clientX - StartPoint )/38 +  LastPositionForEquals);

                document.documentElement.style.setProperty('--sliderTranslate', `${CalcNumber}%`)
            }
        }


    }

    function SliderEnd(e:any){
        if(!SmothAvaible) {
            setSmothAvaible(true)




            let Points = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sliderTranslate'));
            let RoundNumber: number;




            if (LastPositionForEquals > Points) {

                RoundNumber =Math.floor((Math.round(Points))/5)
                document.documentElement.style.setProperty('--sliderTranslate', `${RoundNumber * 5}%`)
            } else {
                RoundNumber = Math.ceil((Math.round(Points))/5)
                document.documentElement.style.setProperty('--sliderTranslate', `${RoundNumber * 5}%`)
            }


            if (RoundNumber > 0) {
                document.documentElement.style.setProperty('--sliderTranslate', `${0.1}%`)
            }

            if(CurrentWidthTape === 1310){
                if (RoundNumber < -13) {
                    document.documentElement.style.setProperty('--sliderTranslate', `${-64.9}%`)
                }
            }else if(CurrentWidthTape === 1110){
                if (RoundNumber < -14) {
                    document.documentElement.style.setProperty('--sliderTranslate', `${-70}%`)
                }
            }else if(CurrentWidthTape === 930){
                if (RoundNumber < -16) {
                    document.documentElement.style.setProperty('--sliderTranslate', `${-80}%`)
                }
            }else if(CurrentWidthTape === 690){
                if (RoundNumber < -17) {
                    document.documentElement.style.setProperty('--sliderTranslate', `${-85}%`)
                }
            }else if(CurrentWidthTape === 510){
                if (RoundNumber < -18) {
                    document.documentElement.style.setProperty('--sliderTranslate', `${-90}%`)
                }
            }





            setStartPoint(0)
            window.removeEventListener("mousemove", MoveSlider)
            window.removeEventListener("mouseup", SliderEnd)
            window.removeEventListener("touchmove", MoveSlider)
            window.removeEventListener("touchend", SliderEnd)




        }

    }






    useEffect(()=>{

        const date = new Date();
        let month = date.getMonth();

        if (month >= 2 && month <= 4) {
            setCurrentSeason("весеннего"); // Март, Апрель, Май
        } else if (month >= 5 && month <= 7) {
            setCurrentSeason("летнего");// Июнь, Июль, Август
        } else if (month >= 8 && month <= 10) {
            setCurrentSeason("осеннего"); // Сентябрь, Октябрь, Ноябрь
        } else {
            setCurrentSeason("зимнего"); // Декабрь, Январь, Февраль
        }


    },[])





    useEffect(()=>{
        if(startingWork !== 0){
            window.addEventListener("touchmove", MoveSlider)
            window.addEventListener("touchend", SliderEnd)
            window.addEventListener("mousemove", MoveSlider)
            window.addEventListener("mouseup", SliderEnd)
        }
    }, [startingWork])


    const testObjects = [
        {WeeklyDay: "Сегодня (24 июня 2024" , objects: [
                {imgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", animeName:"Коносуба", episode: 11,additional: "Anistar" },
                {imgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", animeName:"Коносуба", episode: 11,additional: "Anistar" },
                {imgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", animeName:"Коносуба", episode: 11,additional: "Anistar" },
                {imgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", animeName:"Коносуба", episode: 11,additional: "Anistar" },
            ]
        },
        {WeeklyDay: "Вчера (23 июня 2024" , objects: [
                {imgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", animeName:"Коносуба", episode: 11,additional: "Studio Band" },
                {imgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", animeName:"Коносуба", episode: 11,additional: "Studio Band" },
                {imgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", animeName:"Коносуба", episode: 11,additional: "Studio Band" },
                {imgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", animeName:"Коносуба", episode: 11,additional: "Studio Band" },
                {imgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", animeName:"Коносуба", episode: 11,additional: "Studio Band" },
                {imgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", animeName:"Коносуба", episode: 11,additional: "Studio Band" },
                {imgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", animeName:"Коносуба", episode: 11,additional: "Studio Band" },
                {imgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", animeName:"Реинкарнация безработного: История о приключениях в другом мире 2. Часть 2", episode: 11,additional: "Studio Band" },

            ]
        }
    ]


    const RecentlyTestObjects:RecentlyItemOjbectsInterface[] = [
        { imgUrl:"https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg" , janrs: ["Сенен" , "ТВ сериал" , "Балалайка"], episode: 11, name: "Реинкарнация безработного: История о приключениях в другом мире 2. Часть 2"},
        { imgUrl:"https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg" , janrs: ["Сенен" , "ТВ сериал" , "Балалайка"], episode: 11, name: "Реинкарнация безработного: История о приключениях в другом мире 2. Часть 2"},
        { imgUrl:"https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg" , janrs: ["Сенен" , "ТВ сериал" , "Балалайка"], episode: 11, name: "Реинкарнация безработного: История о приключениях в другом мире 2. Часть 2"},
        { imgUrl:"https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg" , janrs: ["Сенен" , "ТВ сериал" , "Балалайка"], episode: 11, name: "Реинкарнация безработного: История о приключениях в другом мире 2. Часть 2"},
        { imgUrl:"https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg" , janrs: ["Сенен" , "ТВ сериал" , "Балалайка"], episode: 11, name: "Реинкарнация безработного: История о приключениях в другом мире 2. Часть 2"},
    ]



    return (
        <div style={ MobileNavBarActive ?  {transform:"translate3d(var(--translate-value), 0, 0)"} : {}} className={cl.container}>
            <div className={cl.additionalBlock}>
                <div className={cl.additionalBlock__containerContent}>
                    <ul className={cl.ListWithAddFunc}>
                        <li>
                            Онгоинги
                        </li>
                        <li>
                            2024 год
                        </li>
                        <li>
                            2023 год
                        </li>
                    </ul>
                </div>
            </div>
            <div className={cl.SliderBlock}>
                <div className={cl.SliderContentContainer}>
                    <div className={cl.Sliderow}>
                        <div className={cl.CarouselHorizontalContainer}>
                            <div className={cl.CarouselHeader}>
                                <div>
                                    {`Аниме ${CurrentSeason} сезона`}
                                </div>
                            </div>
                            <div  ref={widthScale}  className={cl.Carousel}>
                                <div style={SmothAvaible ? {transition: "0.3s ease"} : {transition: "none"}}
                                     onTouchStart={(e) => StartSliderCalc(e, "mobile")}   onMouseDown={(e) => StartSliderCalc(e, "desktop")} className={cl.CarouselTape}>

                                    <div className={cl.AnimeCardContainer}>
                                        <div className={cl.ImageContainer}>
                                            <img width="100%" height="100%"
                                                 src="https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg"
                                                 alt={""}/>
                                        </div>
                                        <div className={cl.titleName}>
                                            Реинкорнация безработного
                                        </div>
                                    </div>
                                    <div className={cl.AnimeCardContainer}>
                                        <div className={cl.ImageContainer}>
                                            <img width="100%" height="100%"
                                                 src="https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg"
                                                 alt={""}/>
                                        </div>
                                        <div className={cl.titleName}>
                                            Реинкорнация безработного
                                        </div>
                                    </div>
                                    <div className={cl.AnimeCardContainer}>
                                        <div className={cl.ImageContainer}>
                                            <img width="100%" height="100%"
                                                 src="https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg"
                                                 alt={""}/>
                                        </div>
                                        <div className={cl.titleName}>
                                            Реинкорнация безработного
                                        </div>
                                    </div>
                                    <div className={cl.AnimeCardContainer}>
                                        <div className={cl.ImageContainer}>
                                            <img width="100%" height="100%"
                                                 src="https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg"
                                                 alt={""}/>
                                        </div>
                                        <div className={cl.titleName}>
                                            Реинкорнация безработного
                                        </div>
                                    </div>
                                    <div className={cl.AnimeCardContainer}>
                                        <div className={cl.ImageContainer}>
                                            <img width="100%" height="100%"
                                                 src="https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg"
                                                 alt={""}/>
                                        </div>
                                        <div className={cl.titleName}>
                                            Реинкорнация безработного
                                        </div>
                                    </div>
                                    <div className={cl.AnimeCardContainer}>
                                        <div className={cl.ImageContainer}>
                                            <img style={{pointerEvents: "none"}} width="100%" height="100%"
                                                 src="https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg"
                                                 alt={""}/>
                                        </div>
                                        <div className={cl.titleName}>
                                            Реинкорнация безработного
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cl.WeeklyContent}>
                <div className={cl.WeeklyContent__container}>
                    <div className={cl.WeeklyContainer__row}>
                        <UpDownWeeklyContent title={"Обновления аниме"} itemDate={testObjects}/>
                        <UpDownWeeklyContent title={"Расписание аниме"} description={"Внимание! В графике указаны даты выхода эпизодов на телеэкранах Японии. На сайте появится в течение дня либо на следующий день."} itemDate={testObjects}/>
                        <RecentlyOutAnime objects={RecentlyTestObjects}/>
                    </div>
                </div>
            </div>
            <AnimeContent styles={{paddingTop: "20px", gap:"20px", transform:"unset"}} SearchButtonAvaible={true} SortingContentDisable={true} header={"Новые аниме на сайте"}/>
        </div>
    );
};

export default GeneralPage;