import React, {useEffect, useState} from 'react';
import cl from '../modules/ProfilePageModules/SettingsDateInput.module.css'
import {useTypedSelector} from "../../hooks/useTypeSelector";


interface SettingsDateInputInterface {
    labelDate: string
    setBirthDate: (type: string, date: string) => void
}


const SettingsDateInput = ({labelDate, setBirthDate}:SettingsDateInputInterface) => {
    const [fullBirthDay, setFullBirthDay] = useState<string>("Не_указан Не_указан Не_указан")
    const [day ,setDay] = useState<number[]>([])
    const [month ,setMonth] = useState<string[]>([])
    const [years ,setYears] = useState<number[]>([])

    const data = useTypedSelector(state => state.user)




    useEffect(()=>{
        let day:number[] = [];
        let month:string[] = ["янв.", "фев.", "мар.","апр.","май.","июн.","июл.","авг.","сент.","окт.","нояб.","дек."];
        let years:number[] = [];

        for (let i = 0; i < 31; i++) {
            day.push(i+1)
        }
        for (let i = 0; i <= 120; i++) {
            years.push(1904+i)
        }

        setDay(day);
        setMonth(month);
        setYears(years);
    }, [])



    function birthDayController(type: string, value:string){
        const oldDayOfBirthDay = fullBirthDay.split(" ")[0];
        const oldMonthOfBirthDay =fullBirthDay.split(" ")[1];
        const oldYearOfBirthDay =fullBirthDay.split(" ")[2];

        let newBirthDay = "";
        if(type === "day"){
            newBirthDay = value + " " + oldMonthOfBirthDay + " " + oldYearOfBirthDay;
            if(value === "Не указан"){
                newBirthDay = "Не_указан" + " " + oldMonthOfBirthDay + " " + oldYearOfBirthDay;
            }
        }else if(type === "month") {
            newBirthDay = oldDayOfBirthDay + " " + value + " " + oldYearOfBirthDay;
            if(value === "Не указан"){
                newBirthDay = oldDayOfBirthDay + " " + "Не_указан" + " " + oldYearOfBirthDay;
            }
        }else if(type === "year"){
            newBirthDay = oldDayOfBirthDay + " " + oldMonthOfBirthDay + " " + value;
            if(value === "Не указан"){
                newBirthDay = oldDayOfBirthDay + " " + oldMonthOfBirthDay + " " + "Не_указан";
            }
        }
        setFullBirthDay(newBirthDay)
    }


    useEffect(() => {
        if(fullBirthDay.split(" ").length === 3 && !fullBirthDay.includes("Не_указан")){
            setBirthDate(labelDate, fullBirthDay);
        }
    }, [fullBirthDay]);


    return (
        <div className={cl.container}>
            <label>
                {labelDate}
            </label>
            <div className={cl.row}>
                <select onChange={(e)=>birthDayController("day", e.target.value )} defaultValue={"Не указан"} className={cl.DateSelect}>
                    <option disabled={true}>{data.aboutData?.fullname ? data.aboutData?.fullname!.split(" ")[0] : "Не указан"}</option>
                    {day.map((value, index, array)=>
                        <option key={array.length + index}>
                            {value}
                        </option>
                    )}
                </select>
                <select onChange={(e)=>birthDayController("month", e.target.value )} defaultValue={"Не указан"} className={cl.DateSelect}>
                    <option disabled={true}>{data.aboutData?.fullname ? data.aboutData?.fullname!.split(" ")[1] : "Не указан"}</option>
                    {month.map((value, index, array) =>
                        <option key={array.length + index}>
                            {value}
                        </option>
                    )}
                </select>
                <select onChange={(e)=>birthDayController("year", e.target.value )} defaultValue={"Не указан"} className={cl.DateSelect}>
                    <option  disabled={true}>{data.aboutData?.fullname ? data.aboutData?.fullname!.split(" ")[2] : "Не указан"}</option>
                    {years.map((value, index, array)=>
                        <option key={array.length + index}>
                            {value}
                        </option>
                    )}
                </select>
            </div>
        </div>
    );
};

export default SettingsDateInput;