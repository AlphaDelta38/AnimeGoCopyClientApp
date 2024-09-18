import {RoutesInterface} from "./types";
import GeneralPage from "./components/GeneralPage/GeneralPage";
import React from "react";
import AnimeContent from "./components/AnimeChooseContent/AnimeContent";





export const routes: RoutesInterface = {
    HomePage: "/home",
    AnimeList: "/anime",
    MangaList: "/manga",
    Characters: "/character",
    Profile: "/profile",
    Friends: "/profile/friends",
    OwnAnimeList: "/profile/animeList",
    OwnMangaList: "/profile/mangaList",
    MyProfileSettings: "/profile/settings",
    Notification: "/notification",
    FriendRequests: "/friend/requests",
    Anime: "/anime/:id",
    ReviewPage: "/review/:id/new",
    Manga:"/manga/:id",
    CharactersPage: "/character/:id",
    VoiceOverPage:"/voice/:id",
    login: "/login",
    UserPfofilePage: "/profile/:id",
    registration: "/registration",
    UserFriends: "/profile/:id/friends",
}




