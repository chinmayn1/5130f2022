import styled from "styled-components";

export const Label = styled.label`
    color: #ccc;
    cursor: pointer;

    &:hover, 
    &:hover ~ &{
        color: #fc0;
    }
`;

export const StarRatingContainer = styled.div`
    display: flex;
    font-size: 2.5rem;
    justify-content: space-around;
    text-align: center;
    padding: 0 .2rem;
    flex-direction: column;
    
    & :checked ~ ${Label} {
        color: #f90;
    }
`;


export const InputTag = styled.input.attrs({ type: "radio" })`
    display:none;
`;


export const RatingWrapper = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
`;
