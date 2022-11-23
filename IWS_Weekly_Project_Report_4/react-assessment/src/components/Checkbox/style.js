import styled from "styled-components";

export const CheckWrapper = styled.div`
	position: relative;
	vertical-align: middle;
	width: ${props => props.width ? props.width : ""};
	padding: .295rem;
`;

export const CheckMark = styled.svg`
	fill: none;
	stroke: white;
	stroke-width: 2px;
`;

export const HiddenCheckboxTag = styled.input.attrs({ type: "checkbox" })`
	position: absolute;
	transform: scale(0);
`;

export const CheckboxTag = styled.div`
	display: block;
	position: relative;
	overflow: hidden;
	width: 22px;
	height: 22px;
	border-radius: 5px;
	background: ${props => props.checked ? "#7700ff" : "rgba(100,81,81,0.175)"};
	margin-right: 5px;

	${CheckMark} {
		visibility: ${props => props.checked ? "visible" : "hidden"}
	}
`;

export const CheckboxLabel = styled.label`
	display: flex;
	margin: 0;
`;

export const SpanText = styled.span`
	font-size: 1rem;
	cursor: pointer;
`;