import React, {useCallback, useEffect, useRef, useState} from 'react';
import cl from '../modules/AnimePageModules/VideoPlayer.module.css'
import MiniWindowPage from "../AdditionalComponents/MiniWindowPage";
import {AnimePageType} from "../../types";




const VideoPlayer = () => {
    const [dataOfAnime, setDataofAnime] = useState<AnimePageType[] | null>()
    const [sortedMassive, setSortedMassive] = useState<AnimePageType>()
    const [currentEpisode, setCurrentEpisode] = useState<number>(1)
    const [currentTranslation, setCurrentTranslation] = useState<string>("")
    const [inputSeriesValue, setinputSeriesValue] = useState<number>(1)
    const [chosenBtn, setChosenBtn] = useState<string | null>("Translation");
    const [RenderTranslationMassive, setRenderTranslationMassive] = useState<string[]>()
    const [maxEpisode, setMaxEpisode] = useState<number>(0)
    const [startX, setStartX] = useState<number>(0)
    const [phantomSeriesChosen, setPhantomSeriesChosen] = useState<number>(0)


    const refSeriesTape = useRef<HTMLDivElement | null>(null)
    const refStartX = useRef<number>(0)
    const refCurrentPositionTape = useRef<number>(0)
    const refLastPositionTape = useRef<number>(0)
    const refTapeContainer = useRef<HTMLDivElement | null>(null)

    const haveAccessTranslation = ["JAM","AniLibria.TV","Crunchyroll.Subtitles","AniRise","AniBaza","AniDub Online","AnimeVost","SHIZA Project","Dream Cast","AniStar","Amazing Dubbing","AniDUB"]

    function changeSeries(NSeries:number, ){

        if(dataOfAnime){
            let massive = [...dataOfAnime]
            let translationMassive:string[] = [];
            let count:number = 0;

            if(NSeries > maxEpisode || NSeries <= 0){
                return false
            }


            let sorted = massive.filter((e:any)=>Object.keys(e.seasons[Number(Object.keys(e.seasons)[0])].episodes).length >= NSeries)
            for (let i = 0; i < sorted.length; i++) {
                if(sorted[i].translation.title !== currentTranslation){
                    count++;
                }
                if(count === sorted.length) {
                    setCurrentTranslation(sorted[0].translation.title)
                }

            }

            sorted.forEach((value)=>value.translation.title === currentTranslation && setSortedMassive(value))
            sorted.forEach((value)=>translationMassive.push(value.translation.title))

            setCurrentEpisode(NSeries)
            setRenderTranslationMassive(translationMassive.sort((a, b) => {return a[0].localeCompare(b[0]) } ))
        }
    }


    async function  getAllDataAbaoutAnime(){
        const data = await fetch(`https://kodikapi.com/search?token=${process.env.REACT_APP_KODIK_API_TOKEN}&title=${"Башня Бога [ТВ-2]"}&with_seasons=true&with_episodes=true&full_match=true&translations=false`).then((e)=>e.json())
        let sorted:AnimePageType[] = [];
        data.results.forEach((element:any) => haveAccessTranslation.includes(element.translation.title) && sorted.push(element))
        if(sorted.length !== 0){
            setDataofAnime(sorted)
        }else{
            setDataofAnime(null)
        }

        let max_series = [];
        for (let i = 0; i < sorted.length; i++) {
            max_series.push(sorted[i].last_episode)
        }
        max_series.sort((a,b)=> a + b)

        setMaxEpisode(max_series[0])
        setCurrentTranslation(data.results[0].translation.title)


    }


    function CheckActiveTranslationsBtn(pressedBtn:string){
        if(chosenBtn === pressedBtn){
            return false
        }else{
            setChosenBtn(pressedBtn)
        }
    }


    function AutomaticallySwipe(Nseries?:number){
        if(maxEpisode <= 7){
            return ()=>{
                setTimeout(() => {
                    refSeriesTape.current?.style.setProperty('transition', `none`)
                }, 300)
            };
        }

        const currentPosition = new DOMMatrix(refSeriesTape.current?.style.transform).m41
        refSeriesTape.current?.style.setProperty('transition',`0.3s ease`)
        if(Nseries && Nseries <= maxEpisode){
            if((Nseries-1)*(76) < 76*(maxEpisode-1) - refTapeContainer.current!.clientWidth){
                refSeriesTape.current?.style.setProperty("transform",`translate3d(${(Nseries!-1)*(-76)}px,0,0)`);
            }else{
                if(-currentPosition < 0){
                    refSeriesTape.current?.style.setProperty("transform",`translate3d(${0}px,0,0)`);
                }
                if( (Nseries-1)*(76) > 76*(maxEpisode-1) - refTapeContainer.current!.clientWidth){
                    refSeriesTape.current?.style.setProperty("transform",`translate3d(${(-76 * (maxEpisode)+refTapeContainer.current!.clientWidth)}px,0,0)`);
                }
            }
            setPhantomSeriesChosen(Nseries)
        }else{
            if(-currentPosition >=0 && -currentPosition <= 76*(maxEpisode-1) - 565){
                let cordinateForSet:number =0;
                if(refLastPositionTape.current > refCurrentPositionTape.current){
                    cordinateForSet = Math.ceil(((-currentPosition+76)/76))
                }else{
                    cordinateForSet = Math.floor(((-currentPosition+76)/76))
                }
                refSeriesTape.current?.style.setProperty("transform",`translate3d(${(cordinateForSet-1)*(-76)}px,0,0)`);
            }else{
               if(-currentPosition < 0){
                   refSeriesTape.current?.style.setProperty("transform",`translate3d(${0}px,0,0)`);
               }
               if(-currentPosition > 76*(maxEpisode-1) - refTapeContainer.current!.clientWidth){

                   refSeriesTape.current?.style.setProperty("transform",`translate3d(${(-76 * (maxEpisode)+refTapeContainer.current!.clientWidth)}px,0,0)`);
               }
            }
            setPhantomSeriesChosen(Math.ceil((-currentPosition+76)/76))
        }

        return ()=> {
            setTimeout(() => {
                refSeriesTape.current?.style.setProperty('transition', `none`)
            }, 300)
        }
    }

    function start(e:any){
        setStartX(e.clientX)
        window.addEventListener("mouseup", stop)
        window.addEventListener("mousemove", move)
    }

    const move = useCallback((event:any)=>{
        refSeriesTape.current?.style.setProperty("transform",`translate3d(${ refCurrentPositionTape.current + (event.clientX - refStartX.current)}px,0,0)`);
    }, [startX])

    function stop(e:any){
        AutomaticallySwipe()()
        window.removeEventListener("mousemove", move)
        window.removeEventListener("mouseup", stop)
    }


    function leftRigtBtnSwipe(direction:string){
        if(direction === "left" && ((phantomSeriesChosen- (Math.ceil(refTapeContainer.current!.clientWidth)/72))*76) > 0){
            AutomaticallySwipe( phantomSeriesChosen -  (Math.ceil(refTapeContainer.current!.clientWidth)/72))
            setPhantomSeriesChosen( phantomSeriesChosen -  (Math.ceil(refTapeContainer.current!.clientWidth)/72))
        }else{
            if(direction === "left"){
                AutomaticallySwipe(1)
                setPhantomSeriesChosen(0)
            }
        }

        if(direction === "right" && ((phantomSeriesChosen+ (refTapeContainer.current!.clientWidth/72))*76) < (maxEpisode*76)- refTapeContainer.current!.clientWidth){
            AutomaticallySwipe(phantomSeriesChosen +  (Math.ceil(refTapeContainer.current!.clientWidth)/72))
            setPhantomSeriesChosen(phantomSeriesChosen+  (Math.ceil(refTapeContainer.current!.clientWidth)/72))
        }else{
            if(direction === "right"){
                AutomaticallySwipe(maxEpisode)
                setPhantomSeriesChosen(maxEpisode)
            }
        }

    }


    useEffect(() => {

        getAllDataAbaoutAnime()

        return ()=>{
            window.removeEventListener("mousemove", move)
            window.removeEventListener("mouseup", stop)
        }

    }, []);

    useEffect(() => {
        changeSeries(currentEpisode)
    }, [currentTranslation]);


    useEffect(()=>{
        refStartX.current = startX;
        const currentPosition = new DOMMatrix(refSeriesTape.current?.style.transform).m41
        refLastPositionTape.current = refCurrentPositionTape.current;
        refCurrentPositionTape.current = currentPosition;
    },[startX])



    return (
        <div className={cl.container}>
            <div className={cl.header}>
                <h1 className={cl.header_title}>Смотреть аниме «Аля иногда кокетничает со мной по-русски» онлайн</h1>
                <span className={cl.ageLimit}>16+</span>
            </div>
            <div className={cl.playerContentContainer}>
                <div className={cl.playerContainer}>
                    <div className={cl.player}>
                        {sortedMassive && <iframe src={`${sortedMassive && sortedMassive!.seasons[Number(Object.keys(sortedMassive?.seasons!))].episodes[currentEpisode]}?translations=false`} width="100%" height="100%" allowFullScreen allow="fullscreen *"></iframe>}
                        {dataOfAnime === null &&  <div style={{ height:"100%",display:"flex", alignItems:"center", justifyItems:"center", color:"#fff",fontSize:"1.5rem"}}>Озвучки к серии еще не вышли</div>}
                    </div>
                    <div className={cl.chooseOfSeries}>
                        <div className={cl.searchSeries}>
                            <MiniWindowPage
                                minWidth={300}
                                styles={{
                                    color: "#999",
                                    fontWeight: 400,
                                    textDecoration: "1px dotted underline",
                                    textUnderlineOffset: "4px",
                                    marginRight: "1rem",
                                    fontSize: "0.85rem"
                                }}
                                title={"Серия №"} basicState={"bottom"}>Для быстрой навигации по сериям, в поле справа,
                                введите номер серии.
                            </MiniWindowPage>
                            <input type={"number"} value={inputSeriesValue}
                                   onKeyDown={(event) => event.key === "Enter" && [changeSeries(inputSeriesValue),AutomaticallySwipe(inputSeriesValue)]}
                                   onChange={(event) => setinputSeriesValue(Number(event.target.value))}
                                   placeholder={"0"} className={cl.forSearchSeries}/>
                        </div>
                        <div className={cl.seriesChoseeContainer}>
                            <div className={cl.signOfseries}>Серия </div>
                            <div ref={refTapeContainer} onMouseDown={(e)=>maxEpisode > 7 && start(e)} className={cl.seriesTapeContainer}>
                                <div ref={refSeriesTape} className={cl.seriesTape}>
                                    {Array.from({length: maxEpisode}).map((value,index) => <div key={index} onClick={()=>changeSeries(index+1)} className={currentEpisode === index + 1 ? cl.seriesBtnACtive : cl.seriesBtn}>{index + 1}</div>)}
                                </div>
                            </div>
                            <div className={cl.tapeControlPanelContainer}>
                                <div style={maxEpisode > 7 ? {} : {display:"none"}} className={cl.leftRightControlBtnContainer}>
                                    <button  onClick={()=> phantomSeriesChosen !== 0 &&  leftRigtBtnSwipe("left")} className={cl.controlBtn}>
                                        <svg className={phantomSeriesChosen=== 0 ? cl.nonActiveControlIcon : cl.controlcon}>
                                            <use xlinkHref={"/sprite.svg#ShevronIcon"}></use>
                                        </svg>
                                    </button>
                                    <button onClick={()=> phantomSeriesChosen !== maxEpisode &&  leftRigtBtnSwipe("right")} className={cl.controlBtn}>
                                        <svg className={phantomSeriesChosen=== maxEpisode ? cl.nonActiveControlIcon : cl.controlcon}>
                                            <use xlinkHref={"/sprite.svg#ShevronIcon"}></use>
                                        </svg>
                                    </button>
                                </div>
                                <div className={cl.sawTheSeries}>
                                    <svg className={cl.sawIcon}>
                                        <use xlinkHref={"/sprite.svg#EyeIcon"}></use>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cl.chooseTranslations}>
                <div className={cl.chooseTranslationsContent}>
                        <div className={cl.translationsContainer}>
                            <div className={cl.chooseCategoryContainer}>
                                <span style={chosenBtn === "Translation" ? {textDecoration:"none",backgroundColor:"#434343"} : {}} onClick={()=>CheckActiveTranslationsBtn("Translation")} className={cl.chooseCategoryBtn}>Озвучка</span>
                                <span style={chosenBtn === "Player" ? {textDecoration:"none",backgroundColor:"#434343"} : {}} onClick={()=>CheckActiveTranslationsBtn("Player")} className={cl.chooseCategoryBtn}>Плеер</span>
                            </div>
                            <div className={cl.translation}>
                                {chosenBtn === "Translation" && RenderTranslationMassive &&
                                    RenderTranslationMassive.map((value,index) =>
                                        <span onClick={()=>setCurrentTranslation(value)} style={currentTranslation === value ? {backgroundColor:"#ff5c57", pointerEvents:"none", cursor:"default"} : {}} key={index} className={cl.translationBtm}>{value}</span>)
                                }
                                {chosenBtn === "Player" &&
                                    <span  style={{backgroundColor:"#ff5c57", pointerEvents:"none", cursor:"default"}}  className={cl.translationBtm}>Kodik</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;