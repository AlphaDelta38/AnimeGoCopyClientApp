import React, {useEffect, useState} from 'react';
import cl from '../modules/ProfilePageModules/SettingsDateInput.module.css'

interface SettingsDateInputInterface {
    labelDate: string
}


const SettingsDateInput = ({labelDate}:SettingsDateInputInterface) => {

    const [day ,setDay] = useState<number[]>([])
    const [month ,setMonth] = useState<string[]>([])
    const [years ,setYears] = useState<number[]>([])

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


    return (
        <div className={cl.container}>
            <label>
                {labelDate}
            </label>
            <div className={cl.row}>
                <select  defaultValue={"Не указан"} className={cl.DateSelect}>
                    <option  >Не указан</option>
                    {day.map((value, index, array)=>
                        <option key={array.length + index}>
                            {value}
                        </option>
                    )}
                </select>
                <select defaultValue={"Не указан"} className={cl.DateSelect}>
                    <option  >Не указан</option>
                    {month.map((value, index, array)=>
                        <option key={array.length + index}>
                            {value}
                        </option>
                    )}
                </select>
                <select defaultValue={"Не указан"} className={cl.DateSelect}>
                    <option  >Не указан</option>
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