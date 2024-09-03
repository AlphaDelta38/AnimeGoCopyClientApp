import {combineReducers} from "redux";
import {userDataReducer} from "./userDataReducer";


export const rootReducer = combineReducers({
    user: userDataReducer,
})


export type rootReducerType = ReturnType<typeof  rootReducer>