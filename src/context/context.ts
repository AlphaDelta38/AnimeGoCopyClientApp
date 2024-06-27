import {createContext} from "react";



interface  DateContextInterface{
    CurrentYear: number
}


export const DateContext  = createContext<DateContextInterface | undefined>(undefined)