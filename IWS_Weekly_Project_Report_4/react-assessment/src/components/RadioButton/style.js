import styled, { keyframes } from "styled-components";

export const RadioWrapper = styled.div`
	position: relative;
	vertical-align: middle;
	margin-right: auto;
	margin-left: auto;
	width: ${props => props.width ? props.width : "100%"};
	margin-top: 10px;
	margin-bottom: 10px;
`;

export const RadioInnerBtn = styled.span`
	display: none;
	position: relative;
	z-index: 2;
	height: 100%;
	width: 100%;
	border-radius: 50%;
	background: #8f44fd;
	visibility: hidden;
	opacity: 0;
	transform: scale(0);
	transition: all .35s;
`;

export const HiddenRadioTag = styled.input.attrs({ type: "radio" })`
	transform: scale(0);
	position: absolute;
`;

const pulse = keyframes`
	0%{opacity: 0;transform: scale(0.5);}
  	50%{opacity: 0.25;}
  	100%{opacity: 0;transform: scale(1.75);}
`;
export const RadioPulse = styled.span`
	position: absolute;
	display: ${props => props.checked ? "block" : "none"};
	top: -18px;
	left: -18px;
	z-index: 0;
	opacity: 0;
	width: 56px;
	height: 56px;
	border-radius: 50%;
	background: #8f44fd;
	animation: ${pulse} 0.5s linear;
`;


export const RadioBtn = styled.span`
	position: relative;
	z-index: 1;
	display: grid;
	place-items: center;
	width: 20px;
	height: 20px;
	padding: 5px;
	border-radius: 50%;
	border: 2px solid rgba(0, 0, 0, 0.5);
	
	${RadioInnerBtn} {
		display: ${props => props.checked ? "block" : "none"} ;
		opacity: ${props => props.checked ? "1" : "0"} ;
		transform: ${props => props.checked ? "scale(1.5)" : "scale(0)"} ;
		visibility: ${props => props.checked ? "visible" : "hidden"} ;
	}
`;

export const RadioLabel = styled.label`
	display: flex;
	margin: 0;
`;
export const SpanText = styled.span`
	font-size: 1.275rem;
	line-height: 20px;
	margin: 0 10px;
	cursor: pointer;
`;