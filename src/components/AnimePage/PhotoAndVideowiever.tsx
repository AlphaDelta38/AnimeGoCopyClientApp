import React, {useCallback, useEffect, useRef, useState} from 'react';
import cl from '../modules/AnimePageModules/PhotoAndVideowiever.module.css'


interface  PhotoAndVideowieverInterface{
    basePhotoPage: number
    imgUrl: string[]
    type: string
}


const PhotoAndVideowiever = ({basePhotoPage, imgUrl, type}: PhotoAndVideowieverInterface) => {

    const [hoverActive, setHoverActive] = useState<boolean>(false);
    const [ViewerActive, setViewerActive] = useState(false);
    const [gapItem , setGapItem] = useState<number>(0);
    const [startX, setStartX] = useState<number>(0)
    const [xFormove, setXFormove] = useState<number>(0)
    const [grabbingActive, setGrabbingActive] = useState<boolean>(false);
    const [currentPhotoPage,setCurrentPhotoPage] = useState<number>(basePhotoPage)
    const [checkerEnd, setCheckerEnd] = useState<boolean>(false)
    const [autoPlayActive, setAutoPlayActive] = useState<boolean>(false)
    const [RequestLimiter, setRequestLimiter] = useState<string>("start")
    const [sideMenuActive, setSideMenuActive] = useState<boolean>(false)
    const [stateForVideoReRender, setStateForVideoReRender] = useState<string[]>(imgUrl)
    const [paddingForSideMenu, setPaddingForSideMenu] = useState<number>(208)

    const refCurrentPosition = useRef<number>(0);
    const startXRef = useRef<number>()
    const refTape = useRef<HTMLDivElement | null>(null);
    const refCloseBtn = useRef<HTMLButtonElement | null>(null);
    const firstItemRef = useRef<HTMLDivElement | null>(null);
    const refCurrnetPhotoPage = useRef<number>(basePhotoPage);
    const refGapItem = useRef<number>(0);
    const refSideMenu = useRef<HTMLDivElement | null>(null)
    const TimeOutRef = useRef<NodeJS.Timeout | null>(null)


    function AutoMaticallySwiper(photoNumber: number) {
        if (photoNumber >= 0 && photoNumber <= imgUrl.length-1) {
            setXFormove((firstItemRef.current?.clientWidth! + refGapItem.current) * (-photoNumber))
            refTape.current?.style.setProperty("transition", "0.3s ease")
            setCurrentPhotoPage(photoNumber)

        }


        return ()=>{
            setTimeout(()=>{
                setXFormove((firstItemRef.current?.clientWidth! + refGapItem.current) * (-photoNumber))
                refTape.current?.style.setProperty("transition", "none")
                setRequestLimiter("start")
                window.removeEventListener("mousemove", move)
            }, 300)

        }

    }


    function CalcGapItem(){
        if((refTape.current?.clientWidth!- firstItemRef.current?.clientWidth!)/2 > 0 && refTape.current?.clientWidth! - firstItemRef.current?.clientWidth! !== 15){
            setGapItem((refTape.current?.clientWidth!- firstItemRef.current?.clientWidth!)/2)
        }else{
            setGapItem(80)
        }
        AutoMaticallySwiper(refCurrnetPhotoPage.current)()
        if(window.innerWidth < 576){
            setPaddingForSideMenu(108)
        }else{
            setPaddingForSideMenu(208)
        }
    }



    function CheckHover(){
        if(!ViewerActive) {
            setHoverActive(true)
                setStateForVideoReRender(imgUrl)
        }else {
            setHoverActive(false)
        }
    }


    function windowActive(e:any){
        if(!ViewerActive && e.target !== refCloseBtn.current){
            CalcGapItem()
            setTimeout(()=>{
                setViewerActive(true)
            }, 300)
            window.addEventListener("resize", CalcGapItem)
            document.documentElement.style.setProperty("--UserSelect", "none")
            document.documentElement.style.setProperty("--GLobalOverFlow", "hidden")
        }else if(e.target === refCloseBtn.current || refCloseBtn.current?.contains(e.target)){
            setViewerActive(false)
            setCurrentPhotoPage(basePhotoPage)
            setSideMenuActive(false)
            window.removeEventListener("resize", CalcGapItem)
            document.documentElement.style.setProperty("--UserSelect", "auto")
            document.documentElement.style.setProperty("--GLobalOverFlow", "visible")
        }

    }




    function start(e:any){
        if(RequestLimiter === "start"){
            if(e.touches){
                setStartX(e.touches[0].clientX)
            }else{
                setStartX(e.screenX)
            }
            setGrabbingActive(true)
            setCheckerEnd(true)
            setAutoPlayActive(false)
            setRequestLimiter("stop")
            clearInterval(TimeOutRef.current!)
            TimeOutRef.current = null;
            refCurrentPosition.current = new DOMMatrix(refTape.current?.style.transform).m41
            refTape.current?.style.setProperty("transition", "none")
            window.addEventListener("mousemove", move);
            window.addEventListener("touchmove", move)
        }
    }

    const move = useCallback((e:any) => {
        if(e.touches){
            setXFormove(refCurrentPosition.current + e.touches[0].clientX - startXRef.current!)
        }else{
            setXFormove(refCurrentPosition.current + e.screenX - startXRef.current!)

        }
    }, []);

   function stop(){
    if(RequestLimiter === "stop"){
        const currentPosition = new DOMMatrix(refTape.current?.style.transform).m41
        setGrabbingActive(false)
        setCheckerEnd(false)
        window.removeEventListener("mousemove", move)
        window.removeEventListener("touchmove", move)

        if( ((firstItemRef.current?.clientWidth! + gapItem)*(-currentPhotoPage))>currentPosition){
            AutoMaticallySwiper(currentPhotoPage+1)()
        }else if(((firstItemRef.current?.clientWidth! + gapItem)*(-currentPhotoPage))<currentPosition){
            AutoMaticallySwiper(currentPhotoPage-1)()
        }


        if(currentPosition >= 0){
            AutoMaticallySwiper(0)()

        }else if(currentPosition < ((-1 * (imgUrl.length-1)) * (firstItemRef.current?.clientWidth! + gapItem)) ){
            AutoMaticallySwiper(imgUrl.length-1)()
        }

    }

   }

    const endHandler = useCallback(()=>{
        if(!checkerEnd){
            stop()
            AutoMaticallySwiper(currentPhotoPage)()
        }

    }, [])



    function autoplayActivefunction(){
        if(!TimeOutRef.current){
            TimeOutRef.current = setInterval(()=>{
                if(refCurrnetPhotoPage.current !== imgUrl.length-1){
                    AutoMaticallySwiper(refCurrnetPhotoPage.current+1)
                }else{
                    AutoMaticallySwiper(0)
                }
            }, 5000)

        }

        if(autoPlayActive){
            setAutoPlayActive(false)
            clearInterval(TimeOutRef.current!)
            TimeOutRef.current = null;
        }else{
            setAutoPlayActive(true)
        }

    }

    function checkSideMenuActive(){

       if(sideMenuActive){
           setSideMenuActive(false)
       }else{
           setSideMenuActive(true)
       }

        setTimeout(()=>{
            CalcGapItem()
        }, 0)
    }


    function returnLinkOnThumbailVideo(url:string){
        const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?&]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }




    //reset after
    useEffect(()=>{
        refCurrnetPhotoPage.current = currentPhotoPage;
        refGapItem.current = gapItem;
    }, [currentPhotoPage, gapItem])


    useEffect(() => {
        if(checkerEnd){
            window.addEventListener("mouseup", endHandler)
        }else{
            window.removeEventListener("mouseup", endHandler)
        }
    }, [checkerEnd]);

    useEffect(() => {
        startXRef.current = startX;
        return ()=>{
            window.removeEventListener("resize",CalcGapItem);
            window.removeEventListener("mouseup", endHandler)
        }
    }, [startX]);

    useEffect(() => {
        if(!ViewerActive){
            refCurrentPosition.current = 0;
            setTimeout(()=>{
                setXFormove(0)
            }, 500)
            clearInterval(TimeOutRef.current!)
            setAutoPlayActive(false)
            TimeOutRef.current = null;
            let forRerender:any[] = [];
            imgUrl.forEach(()=>{
                forRerender.push("")
            })

            setStateForVideoReRender(forRerender)
        }
    }, [ViewerActive]);



    return (
        <div
            onClick={(e)=>{
                if(!ViewerActive) {windowActive(e)}
            }}
            onMouseOver={()=> CheckHover()} onMouseLeave={()=> { if(!ViewerActive){setHoverActive(false)} } }
            className={cl.container}
            style={{background:`url(${type === "img" ? imgUrl[basePhotoPage] : `https://img.youtube.com/vi/${returnLinkOnThumbailVideo(imgUrl[basePhotoPage])}/hqdefault.jpg`})`,backgroundSize:"cover", backgroundPosition:"center center"}}
        >
            <div className={hoverActive ? cl.btnActive : type === "video" ? cl.btnActive :  cl.btn}>
                <svg width={"32px"} height={"32px"} fill={`${type === "img" ? "none" : "black"}`} stroke={"black"} strokeWidth={"6px"} strokeMiterlimit={10} >
                    <use xlinkHref={`/sprite.svg#${ type === "img" ? "SearchIcon" : "PlaybuttonIcon"} `}></use>
                </svg>
            </div>
            <div onClick={(e)=>windowActive(e)} style={ViewerActive ? {} : {opacity:"0", pointerEvents: "none"}} className={cl.ViewerContainer}>
                <div style={sideMenuActive ? {paddingRight:`${paddingForSideMenu}px`} : {}} className={cl.containerForSideMenu}>
                    <div className={`${cl.swiperActions} ${autoPlayActive && cl.forAnimation}`}>
                        <div className={cl.counter}>{`${currentPhotoPage + 1}`} / {`${imgUrl.length}`}</div>
                        <div className={cl.actions}>
                            <button onClick={() => autoplayActivefunction()} className={cl.actiosButton}>
                                <svg className={cl.actionsIcon}>
                                    <use
                                        xlinkHref={`/sprite.svg#${autoPlayActive ? "pauseBtnIcon" : "PlaybuttonIcon"}`}></use>
                                </svg>
                            </button>
                            <button onClick={()=>checkSideMenuActive()} className={cl.actiosButton}>
                                <svg className={cl.actionsIcon}>
                                    <use xlinkHref={"/sprite.svg#ListMenuIcon"}></use>
                                </svg>
                            </button>
                            <button ref={refCloseBtn} onClick={(e) => windowActive(e)} className={cl.actiosButton}>
                                <svg className={cl.actionsIcon}>
                                    <use xlinkHref={"/sprite.svg#CloseBtnIcon"}></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className={cl.ViewerTapeContainer}>
                        <div style={currentPhotoPage === 0 ? {cursor: "default"} : {}}
                             onClick={() => AutoMaticallySwiper(currentPhotoPage - 1)} className={cl.LeftSwipeButton}>
                            <svg style={currentPhotoPage === 0 ? {color: "#888"} : {}}
                                 className={`${cl.SwipeBtnLeft} ${currentPhotoPage === 0 && cl.nonActiveSwipeBtn}`}>
                                <use xlinkHref={"/sprite.svg#LongShevronIcon"}></use>
                            </svg>
                        </div>
                        <div style={{transform: `translate3d(${xFormove}px,0,0)`,}} onMouseUp={(e) => stop()}
                             onMouseDown={(e) => start(e)} ref={refTape} className={cl.Tape}
                             onTouchStart={(e) => start(e)} onTouchEnd={(e) => stop()}
                        >
                            <div
                                style={refTape.current?.clientWidth! - firstItemRef.current?.clientWidth! !== 0 && refTape.current?.clientWidth! - firstItemRef.current?.clientWidth! !== 15
                                    ?
                                    {
                                        marginLeft: `${gapItem}px`,
                                        marginRight: `${gapItem}px`,
                                        cursor: `${grabbingActive ? "grabbing" : "grab"}`
                                    }
                                    :
                                    {marginRight: `${gapItem}px`, cursor: `${grabbingActive ? "grabbing" : "grab"}`}}
                                ref={firstItemRef} className={cl.photoItem}>

                                {type === "img" &&
                                    <img style={{userSelect: "none", pointerEvents: "none", objectFit: "contain"}} src={`${imgUrl[0]}`} width={"100%"} height={"100%"} alt={""}/>
                                }
                                {type !== "img" &&
                                    <iframe width="100%" height="100%"
                                            src={`${stateForVideoReRender[0]}`}
                                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen >
                                    </iframe>
                                }
                            </div>
                            {type === "img" && imgUrl.length !== 1 && imgUrl.map((value, index) => index !== 0 &&
                                <div key={value.length + index} style={{
                                    marginRight: `${gapItem}px`,
                                    cursor: `${grabbingActive ? "grabbing" : "grab"}`
                                }} ref={firstItemRef} className={cl.photoItem}>
                                    <img style={{userSelect: "none", pointerEvents: "none", objectFit: "contain"}} src={`${value}`} width={"100%"} height={"100%"} alt={""}/>
                                </div>)
                            }
                            {
                                type !== "img" && imgUrl.length !== 1 && stateForVideoReRender.map((value, index) => index !== 0 && <div key={value.length + index} style={{
                                    marginRight: `${gapItem}px`,
                                    cursor: `${grabbingActive ? "grabbing" : "grab"}`
                                }} ref={firstItemRef} className={cl.photoItem}>
                                    <iframe  width="100%" height="100%"
                                             allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                             referrerPolicy="strict-origin-when-cross-origin" allowFullScreen  src={`${value}`} />
                                </div>)
                            }

                        </div>
                        <div style={currentPhotoPage === imgUrl.length - 1 ? {cursor: "default"} : {}}
                             onClick={() => AutoMaticallySwiper(currentPhotoPage + 1)} className={cl.RightSwipeButton}>
                            <svg
                                className={`${cl.SwipeBtnRight} ${currentPhotoPage === imgUrl.length - 1 && cl.nonActiveSwipeBtn}`}>
                                <use xlinkHref={"/sprite.svg#LongShevronIcon"}></use>
                            </svg>
                        </div>
                    </div>
                    <div className={cl.footerOfViewer}>
                        {type === "img" ? "Кадр" : "Видео"} {`${currentPhotoPage + 1}`} из Аля иногда кокетничает со мной по-русски
                    </div>
                </div>
                <div ref={refSideMenu} style={sideMenuActive ? {} : {display: "none"}} className={cl.sideMenu}>
                    <div className={cl.sideMenuItemContainer}>
                        {stateForVideoReRender.map((value,index) =>
                            <div onClick={()=>AutoMaticallySwiper(index)} key={index + value.length} className={cl.sideMenuItem}>
                                    <img src={`${type === "img" ? value : `https://img.youtube.com/vi/${returnLinkOnThumbailVideo(value)}/hqdefault.jpg`}`} width={"100%"} height={"100%"} style={currentPhotoPage === index ? {border: "3px solid red", objectFit: "cover"} : {objectFit: "cover"}} alt={""}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoAndVideowiever;