import React, {DOMElement, DragEventHandler, useEffect, useRef, useState} from 'react';
import cl from '../modules/RangeFilter.module.css'




const RangeFilter = () => {
    const [AccessToSetStartCordinate, setAccessToSetStartCordinate] = useState(true);
    const [AccessToSetStartCordinateSecond, setAccessToSetStartCordinateSecond] = useState(true);

    const [temp, setTemp] = useState(0);
    const [tempSecond, setTempSecond] = useState(0);

    const [forEqual , setforEqual] = useState(0);
    const [forEqualSecond , setforEqualSecond] = useState(0);

    const [type, settype] = useState<string>("");


    const elementRef = useRef<HTMLDivElement | null>(null);
    const elementRefSecond = useRef<HTMLDivElement | null>(null);
    const RedLineRef =  useRef<HTMLDivElement | null>(null);


    function inicialization(e:any, type:string){


        if(AccessToSetStartCordinate && type === "first"){
            setAccessToSetStartCordinate(false)
            setTemp(e.clientX)
            if(elementRef.current){
                setforEqual(parseFloat(elementRef.current.style.left || '0'))
            }
        }

        if(AccessToSetStartCordinateSecond && type === "second"){
            setAccessToSetStartCordinateSecond(false)
            setTempSecond(e.clientX)
            if(elementRefSecond.current){
                setforEqualSecond(parseFloat(elementRefSecond.current.style.right || '0'))
            }
        }

        settype(type)

    }


    function move(e:any){
        let stopperForFirst:number = 0;
        let stopperForSecond:number = 0;
        if(elementRef.current && elementRefSecond.current){
            stopperForSecond = 228 - parseFloat(elementRef.current.style.left || '0');
            stopperForFirst =  228 - parseFloat(elementRefSecond.current.style.right || '0');

        }



        if(elementRef.current && type === "first" && RedLineRef.current){
            const newLeft = e.clientX - temp + forEqual;
            if(newLeft > -2 && newLeft < 228 && newLeft < stopperForFirst ){
                elementRef.current.style.left = `${newLeft}px`;
                RedLineRef.current.style.paddingLeft = `${newLeft}px`;

            }

        }

        if(elementRefSecond.current && type === "second" && RedLineRef.current){
            const newLeft = tempSecond - e.clientX + forEqualSecond;
            if(newLeft > -2 && newLeft < 228 && newLeft < stopperForSecond ) {
                elementRefSecond.current.style.right = `${newLeft}px`;
                RedLineRef.current.style.paddingRight = `${newLeft}px`;

            }
        }


    }


    function Start(e:any){

            window.addEventListener("mousemove", move)
            window.addEventListener("mouseup" , end)

    }


    function end(e:any){
        window.removeEventListener("mousemove", move)
        window.removeEventListener("mouseup", end)


    }


    window.addEventListener("resize", ()=>{
        setAccessToSetStartCordinate(true);
        setAccessToSetStartCordinateSecond(true);

    })


    return (
        <div className={cl.RangeFilterContainer}>
            <div className={cl.RangeLine} >
                <div ref={elementRef} onMouseOver={(e)=>inicialization(e, "first" )}    onMouseDown={(e)=>Start(e)} className={cl.DragOne}></div>
                <div ref={RedLineRef} className={cl.RedLineContainer}>
                    <div   className={cl.RedLine}></div>
                </div>
                <div ref={elementRefSecond} onMouseOver={(e)=>inicialization(e, "second" )}    onMouseDown={(e)=>Start(e)} className={cl.DragTwo}></div>
            </div>
        </div>
    );
};

export default RangeFilter;