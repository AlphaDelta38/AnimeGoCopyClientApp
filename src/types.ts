export interface MessegesInterface {
    AnimeName: string,
    NofSeries: number,
    VoiceOver: string,
    isSaw: boolean,
    when: string,
}


export interface FriendsRequestInterface {
    friendName: string,
}


export interface WeeklyOjbectInterface{
    imgUrl: string,
    animeName: string
    episode: number
    additional:string
}


export interface  RecentlyItemOjbectsInterface{
    imgUrl: string
    name:string
    janrs: string[]
    episode: number

}


export interface RoutesInterface {
    HomePage: string;
    AnimeList: string;
    MangaList: string;
    Characters: string;
    Profile: string;
    Friends: string;
    OwnAnimeList: string
    OwnMangaList: string
    MyProfileSettings:string
}