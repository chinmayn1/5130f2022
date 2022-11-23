import styled from "styled-components";


export const FormGroup = styled.div`
	position: relative;
	width: ${props => props.width ? props.width : "100%"};
	height: 3rem;
	margin-right: auto;
	margin-left: auto;
	margin-top: 1rem;
	margin-bottom: 1rem;
`;


export const SelectTag = styled.select`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border: 2px solid rgb(148, 147, 147);
	border-radius: 0.5rem;
	font-family: inherit;
	font-size: inherit;
	outline: none;
	padding: 0 1rem;
	background: ${props => props.readOnly ? "#d3d3d4" : "none"}};
	margin-bottom: 1rem;
	display: inline-block;
	cursor: text;
	&:hover, &:focus {
		border-color: #7700ff;
	}	
}
`;

export const RequiredStar = styled.span`
	color: #f00;
	&::before {
		content: "*";
	}
`;

