import React, {CSSProperties, FC, ReactNode, useEffect, useRef, useState} from 'react';
import cl from '../modules/AdditionalComponentsModules/MiniWindowPage.module.css'



interface MiniWindowPageInterface{
    children: ReactNode;
    title: string;
    basicState: string;
}

const MiniWindowPage: FC<MiniWindowPageInterface> = ({title, children, basicState}) => {
    const [active, setActive] = useState<boolean>(false)
    const [stated, setState] = useState()
    const refForWidthContent = useRef<HTMLSpanElement | null>(null)
    const miniWindowRef = useRef<HTMLDivElement | null>(null)
    const timeOutRef = useRef<NodeJS.Timeout | null>(null)


    const fourStates = {
        top: cl.itemTop,
        bottom: cl.itemBottom,
        left: cl.itemLeft,
        right: cl.itemRight,
    }

    function windowActive(){
        if(basicState === "top" || basicState === "bottom"){
            window.addEventListener("scroll", positionAccessObserver)
        }else if(basicState === "left" || basicState === "right"){
            window.addEventListener("resize", positionAccessObserver)
        }
        window.addEventListener("mouseover", checkForUsing)
        setActive(true)
        timeOutRef.current = null;
    }


    function positionAccessObserver(){
       const howCloseDistanse = {
           top: miniWindowRef.current?.getBoundingClientRect().top,  // Расстояние от верхнего края окна до верхней границы элемента
           bottom: (window.innerHeight - miniWindowRef.current?.getBoundingClientRect().bottom!), // Расстояние от нижнего края окна до нижней границы элемента
           left: miniWindowRef.current?.getBoundingClientRect().left,  // Расстояние от левого края окна до левой границы элемента
           right: window.innerWidth - miniWindowRef.current?.getBoundingClientRect().right!, // Расстояние от правого края окна до правой границы элемента
       }
        console.log(howCloseDistanse.top);
        console.log(howCloseDistanse.bottom);
        console.log(howCloseDistanse.right);
        console.log(howCloseDistanse.left);
        console.log("----------------------");
       if(basicState === "top" || basicState === "bottom"){

           if((howCloseDistanse.top! - miniWindowRef.current?.clientHeight!) > 100){
               setState(fourStates.top)
               miniWindowRef.current?.style.setProperty("transform", "translateX(-50%)")
           }

           if(howCloseDistanse.top! <= 50){
               setState(fourStates.bottom)
               miniWindowRef.current?.style.setProperty("transform", "translateX(-50%)")
           }


           if(howCloseDistanse.bottom! <= 50 && howCloseDistanse.top! > 50 ){
               setState(fourStates.top)
               miniWindowRef.current?.style.setProperty("transform", "translateX(-50%)")
           }


           if(howCloseDistanse.left! <= 50 && howCloseDistanse.left !== 0){
               setState(fourStates.right)
               miniWindowRef.current?.style.setProperty("transform", "translateY(-50%)")
               basicState = "right"

           }


           if(howCloseDistanse.right! <= 50 && howCloseDistanse.left! > 50 ){
               setState(fourStates.left)
               miniWindowRef.current?.style.setProperty("transform", "translateY(-50%)")
               basicState = "left"

           }
       }

       if(basicState === "left" || basicState === "right"){

           if((howCloseDistanse.right! - miniWindowRef.current?.clientWidth! - refForWidthContent.current?.clientWidth! - 18) > 70){
               setState(fourStates.right)
               miniWindowRef.current?.style.setProperty("transform", "translateY(-50%)")
           }

           if(howCloseDistanse.left! <= 50){
               setState(fourStates.right)
               miniWindowRef.current?.style.setProperty("transform", "translateY(-50%)")
           }


           if(howCloseDistanse.right! <= 50 && howCloseDistanse.left! > 50 ){
               setState(fourStates.left)
               miniWindowRef.current?.style.setProperty("transform", "translateY(-50%)")
           }


           if(howCloseDistanse.bottom! <= 70 && howCloseDistanse.bottom! !== 0 ){
               miniWindowRef.current?.style.setProperty("transform", "translateY(-96%)")

           }

           if(howCloseDistanse.top! <= 70 && howCloseDistanse.top! !== 0 ){
               miniWindowRef.current?.style.setProperty("transform", "translateY(-3%)")

           }


       }




    }


    function checkForUsing(e:any){

        if(!miniWindowRef.current?.contains(e.target) && e.target !== refForWidthContent.current){
            if(!timeOutRef.current){
                timeOutRef.current = null;
                timeOutRef.current = setTimeout(()=>{
                    setActive(false)
                    disable()
                }, 700)
            }
        }else{
            clearTimeout(timeOutRef.current!)
            timeOutRef.current = null;
        }

    }


    useEffect(() => {
        if(basicState === "top"){
            setState(fourStates.top);
        }else if(basicState === "bottom"){
            setState(fourStates.bottom);
        }else if(basicState === "left"){
            setState(fourStates.left);
        }else if(basicState === "right"){
            setState(fourStates.right);
        }
    }, []);

    useEffect(() => {
        positionAccessObserver()
    }, [active]);



    function disable(){
        window.removeEventListener("scroll", positionAccessObserver)
        window.removeEventListener("resize", positionAccessObserver)
        window.removeEventListener("mouseover", checkForUsing)

    }






    return (
        <div className={cl.container}>
            <span ref={refForWidthContent} onMouseOver={()=>
                {
                    if(!active){
                        timeOutRef.current = null;
                        timeOutRef.current = setTimeout(windowActive, 500);
                    }
                }
            }
            onMouseLeave={()=> {
                if(!active) {
                    clearTimeout(timeOutRef.current!);
                    timeOutRef.current = null;
                }
            }}
            >{title}</span>
            <div  style={active ? {} : {opacity:"0", pointerEvents:"none"}} ref={miniWindowRef} className={`${stated}`}>
                {children}
            </div>
        </div>
    );
};

export default MiniWindowPage;