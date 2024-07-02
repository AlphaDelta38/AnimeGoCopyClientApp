import React from 'react';
import cl from "../modules/CharactersList.module.css"
import CharactersItemCard from "./CharactersItemCard";





const CharactersList = () => {



    const TestMassive = [
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Ромберг"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Ромберг"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Ромберг"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Ромберг"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Ромберг"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Ромберг"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Ромберг"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Ромберг"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Ромберг"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Ромберг"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Ромберг"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Ромберг"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Ромберг"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Ромберг"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Ромберг"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Ромберг"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Ромберг"},
    ]






    return (
        <div className={cl.container}>
            <div className={cl.row}>
                <div className={cl.contentBlock}>
                    <div className={cl.contentContainer}>
                        <div className={cl.content}>
                            <div className={cl.title}>
                                Аниме персонажи
                            </div>
                            <div className={cl.description}>
                                Ниже представлен весь список Аниме персонажей. Здесь найдете полную информацию о вашем
                                любимом герои — рост, вес, сфера деятельности, картинки, фото, аниме в которых они
                                участвовали, сейю которые их озвучивали и многое другое.
                            </div>
                            <div className={cl.charactersList}>
                                {
                                    TestMassive.map((value, index) =><CharactersItemCard key={value.name.length + index}  name={value.name} ImgUrl={value.ImgUrl}/>)}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default CharactersList;