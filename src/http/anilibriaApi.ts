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
            string: string,
        }
        list: {
            [key: string]: Episode;
        };
    },
    status: {
        string: string
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
            filter: "player,status,episodes"
        }
    } )

    return data.list[0]
}