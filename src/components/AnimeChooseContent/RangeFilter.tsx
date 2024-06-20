import React, {useEffect, useRef, useState} from 'react';
import cl from '../modules/RangeFilter.module.css'




const RangeFilter = () => {
    const [AccessToSetStartCordinate, setAccessToSetStartCordinate] = useState(true);
    const [AccessToSetStartCordinateSecond, setAccessToSetStartCordinateSecond] = useState(true);

    const [temp, setTemp] = useState(0);
    const [tempSecond, setTempSecond] = useState(0);

    const [forEqual , setforEqual] = useState(0);
    const [forEqualSecond , setforEqualSecond] = useState(0);

    const [type, settype] = useState<string>("");

    const [mobileType, setMobileType] = useState(false);

    const elementRef = useRef<HTMLDivElement | null>(null);
    const elementRefSecond = useRef<HTMLDivElement | null>(null);
    const RedLineRef =  useRef<HTMLDivElement | null>(null);

    const [dd, setdd] = useState(0);
    const CurrentYear = new Date().getFullYear();
    const [YearMoveOne, setYearMoveOne] = useState(0);
    const [YearMoveTwo, setYearMoveTwo] = useState(0);
    const [RedLineWidth, setRedLineWidth] = useState(0);

    useEffect(()=>{
        window.addEventListener("touchend", end)
        window.addEventListener("touchmove", move)
    }, [dd])



    function inicialization(e:any, type:string, phone?:string){


        if(AccessToSetStartCordinate && type === "first"){
            setAccessToSetStartCordinate(false)
            if(phone === "phone"){
                setTemp(e.touches[0].clientX)
            }else{
                setTemp(e.clientX)
            }
            if(elementRef.current){
                setforEqual(parseFloat(elementRef.current.style.left || '0'))
            }
        }

        if(AccessToSetStartCordinateSecond && type === "second"){
            setAccessToSetStartCordinateSecond(false)
            if(phone === "phone"){

                setTempSecond(e.touches[0].clientX)
            }else{
                setTempSecond(e.clientX)
            }
            if(elementRefSecond.current){
                setforEqualSecond(parseFloat(elementRefSecond.current.style.right || '0'))
            }
        }


        settype(type)

        if(phone === "phone"){
            setMobileType(true)

        }else{
            setMobileType(false)
        }



        setdd(dd + 1)

    }


    function move(e:any){
        let stopperForFirst:number = 0;
        let stopperForSecond:number = 0;


            if (elementRef.current && elementRefSecond.current) {
                stopperForSecond = (RedLineWidth-10) - parseFloat(elementRef.current.style.left || '0');
                stopperForFirst = (RedLineWidth-10) - parseFloat(elementRefSecond.current.style.right || '0');
                setYearMoveOne(Math.ceil(parseFloat(elementRef.current.style.left)/((RedLineWidth-10)/65)))
                setYearMoveTwo(Math.ceil(parseFloat(elementRefSecond.current.style.right)/((RedLineWidth-10)/65)))
                console.log((RedLineWidth/65))
                console.log(Math.round(parseFloat(elementRefSecond.current.style.right)/((RedLineWidth-10)/65)))
            }


            if (elementRef.current && type === "first" && RedLineRef.current) {
               let newLeft;
                if(mobileType){
                     newLeft = e.touches[0].clientX - temp + forEqual;
                }else{
                     newLeft = e.clientX - temp + forEqual;
                }

                if (newLeft > -2 && newLeft < RedLineWidth && newLeft < stopperForFirst) {
                    elementRef.current.style.left = `${newLeft}px`;
                    RedLineRef.current.style.paddingLeft = `${newLeft}px`;

                }

            }

            if (elementRefSecond.current && type === "second" && RedLineRef.current) {
                let newLeft;
                if(mobileType){
                    newLeft = tempSecond - e.touches[0].clientX + forEqualSecond;
                }else{
                    newLeft = tempSecond - e.clientX + forEqualSecond;
                }


                if (newLeft > -2 && newLeft < RedLineWidth && newLeft < stopperForSecond) {
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
        window.removeEventListener('touchmove', move)
        window.removeEventListener("touchend", end)

    }


    window.addEventListener("resize", ()=>{
        setAccessToSetStartCordinate(true);
        setAccessToSetStartCordinateSecond(true);
        if(RedLineRef.current){
            setRedLineWidth(RedLineRef.current?.clientWidth)
        }
    })


    useEffect(()=>{
        if(RedLineRef.current){
            setRedLineWidth(RedLineRef.current?.clientWidth)
        }
    },[RedLineRef])

    return (
        <div className={cl.RangeFilterContainer}>
            <div className={cl.RangeLine} >
                <div style={type === "first" ? {zIndex: 3} : {}} ref={elementRef} onMouseOver={(e)=>inicialization(e, "first" )}    onTouchStart={(e)=>inicialization(e, "first" , "phone")}     onMouseDown={(e)=>Start(e)} className={cl.DragOne}>
                    <div className={cl.CurrentYear}>
                        { YearMoveOne ? `Год ${1959 + YearMoveOne}` : `Год ${1959}`}
                    </div>
                </div>
                <div ref={RedLineRef} className={cl.RedLineContainer}>
                    <div  className={cl.RedLine}></div>
                </div>
                <div style={type === "second" ? {zIndex: 3} : {}}  ref={elementRefSecond} onMouseOver={(e)=>inicialization(e, "second" )}   onTouchStart={(e)=>inicialization(e, "second", "phone" )}  onMouseDown={(e)=>Start(e)} className={cl.DragTwo}>
                    <div className={cl.CurrentYear}>
                        {YearMoveTwo ? `Год ${CurrentYear - YearMoveTwo}` : `Год ${CurrentYear}` }
                    </div>
                </div>
            </div>
            <div className={cl.UnderRangeLine}>
                <div className={cl.Horizontal_lines}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={cl.Years}>
                    <div>1959</div>
                    <div>1975</div>
                    <div>1992</div>
                    <div>2008</div>
                    <div>2024</div>
                </div>
            </div>
        </div>
    );
};

export default RangeFilter;