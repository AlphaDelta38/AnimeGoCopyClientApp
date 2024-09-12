import {CSSProperties} from "react";
import exp from "node:constants";
import {AboutDataUserInterface} from "./Store/types/UserTypes";

export interface MessegesInterface {
    AnimeName: string,
    NofSeries: number,
    VoiceOver: string,
    isSaw: boolean,
    when: string,
    styles?: CSSProperties
}


export interface FriendsRequestInterface {
    friendName: string,
    styles?: CSSProperties
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
    Notification:string
    FriendRequests:string
    Anime:string
    ReviewPage:string
    Manga: string
    CharactersPage: string
    VoiceOverPage: string
    login: string
    registration: string
}


interface Episode {
    [episodeNumber: number]: string; // Эпизоды с номером и ссылкой
}

// Интерфейс для сезона
interface Season {
    episodes: Episode; // Список эпизодов
    link: string; // Ссылка на сезон
}

// Интерфейс для переводов
interface Translation {
    id: number;
    title: string;
    type: string; // Тип перевода, например, "voice"
}

// Интерфейс для ответа от API Kodik, на поиск аниме
export interface AnimePageType {
    blocked_countries: string[]; // Список стран с блокировкой
    blocked_seasons: Record<string, unknown>; // Блокированные сезоны
    camrip: boolean; // Флаг для CAMRIP
    created_at: string; // Дата создания
    episodes_count: number; // Количество эпизодов
    id: string; // ID сериала
    imdb_id: string; // ID IMDb
    kinopoisk_id: string; // ID Кинопоиска
    last_season: number; // Последний сезон
    last_episode: number; // Последний эпизод
    lgbt: boolean; // Флаг наличия ЛГБТ-контента
    link: string; // Ссылка на сериал
    other_title: string; // Альтернативное название
    quality: string; // Качество видео
    screenshots: string[]; // Список скриншотов
    seasons: Record<number, Season>; // Сезоны, где ключ — номер сезона
    shikimori_id: string; // ID Shikimori
    title: string; // Название
    title_orig: string; // Оригинальное название
    translation: Translation; // Информация о переводе
    type: string; // Тип сериала, например, "anime-serial"
    updated_at: string; // Дата обновления
    worldart_link: string; // Ссылка на World Art
}


export interface ScheduleItemType{
    numberOfSeries: number,
    nameOfSeries: string,
    dateOfOut: string,
    status: boolean

}



export interface UserRegistrationDataInteraface{
    email:string,
    login:string,
    password:string,
}

export interface userDataAuthAndRegistation{
    id: number,
    country?: string,
    fullname?: string,
    city?: string,
    gender?: string,
    aboutUser?: string,
    lifeStatus?: string,
    birthDay?: string,
    email:string,
    name: string,
    password:string,
    whoCanViewMyList?:string,
    whoCanSentFriendRequest?:string,
    whoCanCommentMyProfile?:string,
}

export interface AuthTokenInterface {
    token: string;
}


export interface accessRule{
    whoCanViewMyList?:string,
    whoCanSendFriendRequest?:string,
    whoCanCommentProfile?:string,
}

export interface userSettingCurrentState{
    id: number
    aboutUser: AboutDataUserInterface,
    email:string,
    name: string,
    accessRule: accessRule,
}
