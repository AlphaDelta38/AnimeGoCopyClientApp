import React, {useEffect, useRef, useState} from 'react';
import cl from '../modules//AnimePageModules/InPeopleList.module.css'



interface StatisticItem {
    title?: string;
    ColumNameOne?: string;
    ColumNameTwo?: string;
    ColumNameThree?: string;
    ColumDateOne?: string;
    ColumDateTwo?: string;
    ColumDateThree?: string;
    footer?: any;
    styles?: Record<string, any>;
}


const InPeopleListAnime:React.FC<{ UiSettings: StatisticItem[], children?: React.ReactNode}> = ({UiSettings,children}) => {

    const PopatWindowRef = useRef<HTMLDivElement | null>(null)
    const [cordinate, setCordinate] = useState<number>(0)
    const cordinateRef = useRef(cordinate);
    const lastCordinate = useRef(0);
    const [activeWindow, setActiveWindow] = useState<boolean>(false);
    const refTimeOut = useRef<NodeJS.Timeout | null>(null)

    function moveModalWindow() {

        if(PopatWindowRef.current){
            let x: number = PopatWindowRef.current?.getBoundingClientRect().x

            if(x < 5 && (lastCordinate.current - x) > 0){
                setCordinate(cordinateRef.current + (5-x));
                PopatWindowRef.current?.style.setProperty("transform",`translate3d(${cordinateRef.current + (5-x)}px, 0, 0)`)
            }
            else{
                if(x > 5 && (lastCordinate.current - x) < 0){
                    if(cordinateRef.current > 0 && (cordinateRef.current - (x-5)) > 0){
                        setCordinate(cordinateRef.current - (x-5));
                        PopatWindowRef.current?.style.setProperty("transform",`translate3d(${cordinateRef.current - (x-5)}px, 0, 0)`)
                    }else{
                        setCordinate(0);
                        PopatWindowRef.current?.style.setProperty("transform",`translate3d(${0}px, 0, 0)`)
                    }
                }
            }

            lastCordinate.current = x;
        }
    }

    function activateModalWindow(){
        setActiveWindow(true)
        window.addEventListener("mouseover", checkMouseOut )
        refTimeOut.current = null;

    }

    function checkMouseOut(e: any){

        if(e.target && PopatWindowRef.current){
            if(!PopatWindowRef.current.contains(e.target) && e.target.id !== "btnActivateWindow"){
                if(!refTimeOut.current){
                    refTimeOut.current = null;
                    refTimeOut.current = setTimeout(disableModalWindow, 1000);
                }
            }else{
                if(refTimeOut.current ){
                    clearTimeout(refTimeOut.current)
                    refTimeOut.current = null;

                }
            }

        }


    }

    function disableModalWindow(){
        setActiveWindow(false)
        refTimeOut.current = null;
        window.removeEventListener("mouseover", checkMouseOut )
    }



    useEffect(() => {
        cordinateRef.current = cordinate;

    }, [cordinate]);

    useEffect(() => {

        window.addEventListener("resize", moveModalWindow)

        return ()=>{
            window.removeEventListener("resize", moveModalWindow)
        }
    }, []);



    return (
        <div className={cl.container}>
            <span id="btnActivateWindow" onMouseOver={(e)=>{
                    if(!refTimeOut.current) {
                        refTimeOut.current = setTimeout(activateModalWindow, 500)
                    }
            }}
                  onMouseLeave={()=> {
                if(refTimeOut.current) {
                    clearTimeout(refTimeOut.current)
                    refTimeOut.current = null;
                }
            }} className={cl.text}>{children}</span>
            <div     style={UiSettings[0].styles && UiSettings[0].styles} ref={PopatWindowRef} className={activeWindow ? cl.statisticContainerActive : cl.statisticContainer}>
                <div style={{left:`${238 - cordinate}px`}} className={cl.TriangleForStatistic}></div>
                <div className={cl.header}>
                    {UiSettings[0].title}
                </div>
                <table className={cl.statisticTable}>
                    <thead>
                    <tr className={cl.TableTr}>
                        <td style={UiSettings[1].styles && UiSettings[1].styles[0]} className={cl.SideTd}>{UiSettings[1].ColumNameOne}</td>
                        <td style={UiSettings[1].styles && UiSettings[1].styles[1]} className={cl.CenterTd}>{UiSettings[1].ColumNameTwo}</td>
                        <td style={UiSettings[1].styles && UiSettings[1].styles[2]} className={cl.SideTd}>{UiSettings[1].ColumNameThree}</td>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            UiSettings.map((value, index, array) =>
                                index !== 1 && index !== array.length-1 && index !== 0 &&
                                <tr key={array.length + index} className={cl.TableTr}>
                                    <td style={value.styles && {...value.styles[0]}} className={cl.SideTd} >
                                        {value.ColumDateOne}
                                    </td>
                                    <td style={value.styles && {...value.styles[1]}} className={cl.CenterTd}>
                                        <div className={cl.progressLineContainer}>
                                            <div style={{width: `${Number(value.ColumDateTwo)}%`}} className={cl.progressLine}>
                                                {`${value.ColumDateTwo}%`}
                                            </div>
                                        </div>
                                    </td>
                                    <td style={value.styles && {...value.styles[2]}} className={cl.SideTd}>
                                        {value.ColumDateThree}
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
                <div  style={UiSettings[UiSettings.length-1].footer ? {} : {display:"none"}} className={cl.statisticFooter}>
                    {UiSettings[UiSettings.length-1].footer}
                </div>
            </div>
        </div>
    );
};

export default InPeopleListAnime;