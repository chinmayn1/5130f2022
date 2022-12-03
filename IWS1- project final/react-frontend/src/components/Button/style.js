import styled, { css, keyframes } from "styled-components";

export const DisableButtonStyle = css`
	background: #d4d4d4 !important;
	cursor: not-allowed !important;
	&:hover {
		background: #d3d3d3 !important;
	}

	&:focus {
		box-shadow: 0 0 0 0  #d3d3d3 !important;
	}

	
`;
export const ButtonAnimation = keyframes`
	0%{background-position: 0%};
	100%{background-position: -250px};
`;

export const ButtonLoadingStyle = css`
	color: rgba(255,255,255,.5);
  	background: #5d2fdf repeating-linear-gradient(60deg,transparent,transparent 10px, #5526c5 10px, #5526c5 20px) ;
	cursor: not-allowed;
  	animation: ${ButtonAnimation} 5s infinite linear;
`;
export const ButtonTag = styled.button`
	width: ${props => props.fullWidth && "100%"};
	position: relative;
	overflow: hidden;
	margin: 5px;
	align-items: center;
	justify-content: center;
	height: 2.75rem;
	padding: 0 1.5rem;
	font-size: 1.25rem;
	border: 0;
	border-radius: .5rem;
	background: ${props => props.bgColor ? props.bgColor : "#5d2fdf"};
	color: ${props => props.textColor ? props.textColor : "#f7f7f7"};
	cursor:pointer;
	outline: none;
	transition: all .35s;
	float: ${props => props.alignLeft ? "left" : "right"}
	${props => props.isFirstStep === 1 || props.disable ? DisableButtonStyle : ""};

	${props => props.isLoading ? ButtonLoadingStyle : ""};

	&:hover {
		background: ${props => props.shadeColor ? props.shadeColor : "#5526c5"};
	}

	&:focus {
		box-shadow: 0 0 0 3px ${props => props.shadeColor ? props.shadeColor : "#8659e9"};
	}
`;

export const IconContainer = styled.span`
	position: relative;
	left: 10px;
`;

