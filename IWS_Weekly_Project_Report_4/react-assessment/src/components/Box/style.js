import styled from "styled-components";

export const CenteredBox = styled.div`
    margin: 0 auto;
	border-radius: .698rem;
    border: 1px solid #000;
    ${props => props.full && "width:100%"};
    position: relative;
    top: ${props => props.noPosition ? "0" : "calc(100px - -8px)"};
    max-width: 800px;
`;
export const PaddingDiv = styled.div`
    padding: 1rem;
`;
export const Divider = styled.div`
	width: 100 %;
    border: none;
    border-bottom: 2px solid #ada9a9;
`;