import axios, {AxiosResponse} from "axios";






interface Episode{
    episode: number;
    name: string | null;
    created_timestamp: number;
}

export interface animeItemsInerface{
    player: {
        episodes: {
            first: number,
            last: number,
        }
        list: {
            [key: string]: Episode;
        };
    }
}


interface namesOfSeriesInterface{
    list: animeItemsInerface[]
}


export const getNamesOfSeriesAndDateOfOut = async  (animeName: string): Promise<animeItemsInerface> =>{

    let newStr = animeName.replace(/\[ТВ-(\d+)\]/, (match, p1) => {
        if (p1 === "1") {
            return ""; // Убираем [ТВ-1]
        }
        return p1;
    });

    const {data}: AxiosResponse<namesOfSeriesInterface, any> = await axios.get("https://api.anilibria.tv/v3/title/search", {
        params : {
            search: newStr,
            filter: "player"
        }
    } )
    return data.list[0]
}