import React from 'react';

import { InputTag, StarRatingContainer, Label, RatingWrapper } from "./style";

const Rating = ({ totalStar }) => {

    const [rating, setRating] = React.useState(0);
    const element = [];
    const emojis = ["😑", "🙂", "😀", "😃", "😍", "🤩"]
    for (let index = totalStar; index >= 1; index--) {
        element.push(
            <React.Fragment key={index}>
                <InputTag id={`star-${index}`} name='rating' value={index} onChange={e => setRating(e.target.value)} />
                <Label htmlFor={`star-${index}`}>&#9733;</Label>
            </React.Fragment>)
    }

    return (
        <StarRatingContainer>
            {emojis[rating]}
            <RatingWrapper>
                {element && (element)}
            </RatingWrapper>
        </StarRatingContainer>
    )
}

export default Rating
