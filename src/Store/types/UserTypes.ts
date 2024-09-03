

export  interface AboutDataUserInterface{
    name: string,
    familyName?: string,
    aboutUser?: string,
    gender?: string,
    birthday?: string,
    status?: string,
    country?: string,
    city?: string,
}

export enum UserConstActionType{
    SET_USER="SET_USER"
}


export  interface  UserStateInterface{
    email: string,
    login: string,
    aboutData: AboutDataUserInterface;
    isLogin: boolean
}

export  interface SetUserInterfaceAction{
    type: UserConstActionType.SET_USER,
    payload: {
        email: string,
        login: string,
        aboutData: AboutDataUserInterface
    },
}


export  type UserActionTypes = SetUserInterfaceAction
