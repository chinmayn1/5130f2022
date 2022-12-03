import styled from "styled-components";

export const TextColor = styled.div`
    color: ${props => props.Color ? props.Color : "#ff6969"};
    margin: 5px 10px;
    font-weight: 700;

    &::before {
        content: "!";
        display: inline-block;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: 2px solid;
        text-align: center;
        margin: 0 3px;
    }
`;