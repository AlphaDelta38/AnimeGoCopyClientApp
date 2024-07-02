import React, { FC, ReactNode, useEffect, useRef, useState} from 'react';
import cl from '../modules/AdaptiveViewer.module.css'

interface  AdaptiveViewerInterface{
    children: ReactNode;
    right: boolean
    top: boolean
    setFunctions: (e:any)=>void
    foreignStyles?: foreignStylesInterface;
}

interface stylesInterface{
    left?: string
    right?: string

}

interface foreignStylesInterface {
    [key: string]: string;
}

interface  imgDateInerface{
    x:number,
    width:number,
    height:number
}

const AdaptiveViewer: FC<AdaptiveViewerInterface> = ({children,right,top, setFunctions,  foreignStyles},  ) => {


    const [ModalWindowActive, setModalWindowActive] = useState(false);
    const refTimeOut = useRef<NodeJS.Timeout | null>()
    const refImgForHeight = useRef<HTMLDivElement | null>(null)
    const [stopper, setstopper] = useState<boolean>(true);
    const [styles, setStyles] =useState<stylesInterface>({})

    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    function ModalInfoWindowTurn(e:any){

        if(isMobile){
            return;
        }


        refImgForHeight.current?.style.setProperty("display", "block")
        let ImgDated = {x: refImgForHeight.current?.getBoundingClientRect().x, width: refImgForHeight.current?.getBoundingClientRect().width, height: refImgForHeight.current?.getBoundingClientRect().height};


        let position;
        let moveLeft

        console.log(stopper)


        if( right && ImgDated.height && ImgDated.x && ImgDated.width){
            position = (e.height - ImgDated.height)/2;
            moveLeft = ImgDated.x + ImgDated.width;

            console.log(moveLeft, window.innerWidth)
            if(moveLeft > window.innerWidth ){

                setstopper(false)
                if(window.innerWidth < 576){

                    setStyles({right: `${-20}%`, left: "unset", ...foreignStyles})
                }else{
                    console.log(1)
                    setStyles({right: `${110}%`, left: "unset", ...foreignStyles})
                }

            }
            if(moveLeft < window.innerWidth ){

                setstopper(false)
                if(window.innerWidth < 576){

                    setStyles({right: `${-20}%`, left: "unset", ...foreignStyles})

                }else{
                    console.log(2)
                    setStyles({left: `${110}%`, ...foreignStyles})

                }
            }

            document.documentElement.style.setProperty("--ModalWindowCalc", `${position}px`)
        }



        if( top && ImgDated.height && ImgDated.width){

            moveLeft = (e.width - ImgDated.width)/2;


            setstopper(false)
            setStyles({left: `${moveLeft}px`, ...foreignStyles})

            document.documentElement.style.setProperty("--ModalWindowCalc", `${-ImgDated.height - 20}px`)
        }






        setModalWindowActive(true)

    }




    function OffModalWindow(){

        OptimizationProccesTimeWaiter()
        refTimeOut.current = null
        refTimeOut.current = setTimeout(()=>setModalWindowActive(false), 600)


    }

    function OptimizationProccesTimeWaiter(){
        if(refTimeOut.current){
            clearTimeout(refTimeOut.current)
        }

    }


    function HandleMouseOver(e:React.MouseEvent<HTMLDivElement, MouseEvent>){


        setstopper(true)

        if(refTimeOut.current){
            clearTimeout(refTimeOut.current)
        }
        if(!ModalWindowActive){

            let temp = e.currentTarget.getBoundingClientRect();
            refTimeOut.current = setTimeout(()=>ModalInfoWindowTurn(temp), 400);

        }

    }

    useEffect(() => {
        setFunctions([HandleMouseOver, OffModalWindow])

    }, [ModalWindowActive]);


    useEffect(() => {
        if(refImgForHeight.current  && !ModalWindowActive){
            refImgForHeight.current?.style.setProperty("display", "none")
        }
    }, [ModalWindowActive]);



    return (
        <div ref={refImgForHeight} style={ModalWindowActive ? {...styles} : {visibility: "hidden"}} className={cl.ModalWindow}>
            <div style={styles.right ? {right:"-12px", left: "unset", rotate:"-45deg"} : {}} className={right ? cl.TriangleDecorativeLeft : cl.TriangleDecorativeBottom}></div>
            {children}
        </div>
    );
};

export default AdaptiveViewer;