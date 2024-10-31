import React, {useEffect, useState} from 'react';
import cl from '../modules/AnimePageModules/Reviews.module.css'
import ReviewItem from "./ReviewItem";
import {getAllReviews} from "../../http/AnimePageItemApi";
import {Link, useLocation} from "react-router-dom";
import {reviewInterface} from "../../types";


interface ReviewsInterface{
    name: string
}


const Reviews = ({name}:ReviewsInterface) => {

    const location = useLocation();
    const [reviewsData, setReviewsDate] = useState<reviewInterface[]>([]);

    async function getReviews(){

        const id:number = Number(location.pathname.split("/")[2])
        const reviews: reviewInterface[] | undefined = await getAllReviews(id);
        if(reviews){
            setReviewsDate(reviews)
        }
    }


    useEffect(()=>{
        getReviews()
    }, [])

    return (
        <div className={cl.container}>
            <div style={reviewsData.length > 0 ? {display:"none"} : {}} className={cl.reViewsContainer}>{`Здесь пока нет рецензий и отзывов к аниме «${name}», хотите написать?`}</div>
            <div style={reviewsData.length > 0  ? {display:"none"} : {}} className={cl.reViewsBtnContainer}>
                <Link to={`/review/${location.pathname.split("/")[2]}/new`}>
                    <button className={cl.reViewBtn}>
                        <span>
                            <svg className={cl.penIcon}><use xlinkHref={"/sprite.svg#PenIcon"}></use></svg>
                        </span>
                        Написать отзыв
                    </button>
                </Link>
            </div>
            <div style={reviewsData.length === 0 ? {display:"none"} : {}} className={cl.reviewsContainer}>
                <div className={cl.reviewsContainer__header}>
                    <div className={cl.reviewsToAnimeContainer}>
                        <h2>Рецензии и отзывы к аниме</h2>
                        <span className={cl.amountOfReviews}>{reviewsData?.length}</span>
                    </div>
                    <Link to={`/review/${location.pathname.split("/")[2]}/new`}>
                        <button className={cl.reViewBtn}>
                            <span>
                                <svg className={cl.penIcon}><use xlinkHref={"/sprite.svg#PenIcon"}></use></svg>
                            </span>
                                Написать отзыв
                        </button>
                    </Link>
                </div>
                {reviewsData?.map((value, index,array)=>
                    <ReviewItem
                        key={index}
                        id={value.id}
                        index={index}
                        arrayLenght={array.length}
                        createdAt={value.createdAt}
                        likes={value.likes}
                        stars={value.stars}
                        profilePhoto={value.user.profilePhoto ? value.user.profilePhoto : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PEA4QEA8QDQ0PDQ0NDg4PDRsNDQ0NFR0WFhURExMYKCkgGBolGxMVITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQMEAgUH/8QAMxABAAECAwQIBAYDAAAAAAAAAAECAwQRITFBUXESFVJhgZGisRMiwdEyQnKCkqEzYuH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACJnJXVe4AtczVEb2equZ3uQaJuwj40cJUAL/AI0cJTF6GcBqiuOLpjdU1TGyQahTTe4raaonYCQAAAAAAAAAAAAAAAFdd3LZrLi5d3R5qgTVMztQAAAAAAAAACYnJAC+i7x81rGst3Mtuz2BoCAAAAAAAAAAABRdubo8Xd6vLTfLOAAAAAAAEzEazOUcZ0hnqxlEb5nlANAz042id8xzj7L6aonWJiY7tQSAAAAACy1Xly9mhjXWa93kC4AAAAAAABEzklTfq3eIKqpz1QAAAAADi/diiM58I4y7eXjbnSqnhTpH1BXevVVznM8o3Q4AB1buTTOcTlLkB62GvxXHCY2x9VryMPc6NUTu2Ty3vXAAAAATEoAaqKs4zdKLFWuXFeAAAAAAAy1znMtFc5RPJlAAAAAABLw5nbze28e/R0aqo758twOAAAAHs2p+Wn9NLx6ac5iI2zOUPaiMoiOEZAAAAAAAmJya4ljabU6R5A7AAAAABXenRnX39kc1AAAAAAADLjrHSjpR+KNscYagHiD07+Epq1j5auO6ecMlWCrjhPKfuDONFOCrndEc5+zTZwURrV808Py/9BxgMP8Ann9sfVtAAAAAAABfh50nmoXYff4AuAAAAABVf2RzUNF/Z4s4AAAAAAAzXsbTGkfNP9ebJcxdc78o4U6A9SZy26OJvUdqn+UPHmc9uoD2IvUdqn+UO4mJ2TE8pzeIA9seTbxNdP5s+6dWu1jonSqOjPGNYBrCJz74AAAAAF2H3+Clfh94LQAAAAAc3IziWVsZa4ymYByAAACKqoiJmdIh5mJxM16RpTw483ePvZz0Y2U7e+plAAAAAAAABbh8RNE6axvjc9S3ciqM42e3c8ZfhL3Qq/1nSfuD1AAAAGmzGjPENUQCQAAAAAFN+nf4LkVRnGQMgmYyQAiurKJnhEylxf8AwV/oq9gePMgAAAAAAAAAAA9fDVZ0Uz3e2ixRgv8AHT+73leAACyzTrnwaHNunKHQAAAAAAAAKr1G/wA1DYz3beWu72BWiunOJjjEx5pAYur47XpOr47XpbQGLq+O16Tq+O16W0Bi6vjtek6vjteltAYur47XpOr47XpbQGLq+O16Tq+O16W0Bi6vjtek6vjteltAcWbfRpinPPLPXZ3uwAW2aN/k5t0Z8mmIAAAAAAAAAAAJAGe5by5eytsU12uHkCkTKAAAAAAAAAAAHdujPk6otcfJfEAiIySAAAAAAAAAAAAAAAOaqYnaqqszu1XgMkxkhsmHE2o4AzC+bMcUfA7/AOgUi74Hf/SYs94KExDRFqObqIBRTZnfoupoiHQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//2Q==" }
                        userName={value.user.name}
                        title={value.title} text={value.text}
                    />
                )}
            </div>
        </div>
    );
};

export default Reviews;