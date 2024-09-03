import {useSelector, TypedUseSelectorHook} from "react-redux";
import {rootReducerType} from "../Store/reducers";


export const useTypedSelector: TypedUseSelectorHook<rootReducerType> = useSelector