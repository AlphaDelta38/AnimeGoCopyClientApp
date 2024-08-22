import React from 'react';
import cl from '../modules/AnimePageModules/Reviews.module.css'





const Reviews = () => {
    return (
        <div className={cl.container}>
            <div className={cl.reViewsContainer}>Здесь пока нет рецензий и отзывов к аниме «Аля иногда кокетничает со мной по-русски», хотите написать?</div>
            <div className={cl.reViewsBtnContainer}>
                <button className={cl.reViewBtn}>
                    <span>
                        <svg className={cl.penIcon}><use xlinkHref={"/sprite.svg#PenIcon"}></use></svg>
                    </span>
                    Написать отзыв
                </button>
            </div>
        </div>
    );
};

export default Reviews;