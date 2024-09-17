import {combineReducers} from "redux";
import {userDataReducer} from "./userDataReducer";
import {friendsDataReducer} from "./friendsDataReducer";


export const rootReducer = combineReducers({
    user: userDataReducer,
    friends : friendsDataReducer,
})


export type rootReducerType = ReturnType<typeof  rootReducer>