import styled, { css } from "styled-components";


export const FormGroup = styled.div`
	position: relative;
	width: ${props => props.width ? props.width : "100%"};
	height: 3rem;
	margin-right: auto;
	margin-left: auto;
	margin-top: 1rem;
	margin-bottom: 1rem;
`;

export const InputLabel = styled.label`
	position: absolute;
	left: 1rem;
	top: .8rem;
	padding: 0 .5rem;
	color: #000;
	cursor: text;
	transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in, color 200ms ease-in,font-weight 200ms;
	background: #fff;
`;
export const labelTransition = css`
	&:focus ~ ${InputLabel},
	&:not(:placeholder-shown)&:not(:focus) ~ ${InputLabel} {
		top: -0.5rem;
		font-size: .9rem;
		left: .8rem;
		color: #7700ff;
		font-weight: 700;
	}
`;

const InputSharedStyles = css`
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
	padding: 1.25rem;
	margin-bottom: 1rem;
	display: inline-block;
	cursor: text;
	&:hover, &:focus {
		border-color: #7700ff;
	}	
`;
export const InputTag = styled.input`
	${InputSharedStyles}
	background: ${props => props.readOnly ? "#d3d3d4" : "none"}};
	& ~ ${InputLabel} {
		cursor: ${props => props.readOnly ? "not-allowed" : ""};
		background: ${props => props.readOnly ? "#d3d3d3" : ""} !important;
	}

	${props => props.readOnly ? "" : labelTransition}
	
	& ~ .icon {
		position: relative;
		float: right;
		cursor: ${props => props.cursor ? props.cursor : "none"} !important;
		top: 15px;
		left: -12px
	}
`;
export const InputFile = styled.input.attrs({ type: "file" })`
		${InputSharedStyles}

		padding: 0 3px;
		line-height: 42px;
		overflow: hidden;
		cursor: pointer;

		&::-webkit-file-upload-button {
			position: relative;
			left: ${props => props.alignLeft ? "-5px" : "8px"};
			float: ${props => props.alignLeft ? "left" : "right"};
			cursor: pointer;
			background: #5526c5;
			color: #ffffff;
			border:none; 
			}
`;

export const RequiredStar = styled.span`
	color: #f00;
	&::before {
		content: "*";
	}
`;

//For Password Type inputs

export const Toast = styled.div`
	display: ${props => props.show ? "block" : "none"};
    max-width: 350px;
    overflow: hidden;
    font-size: .875rem;
    background-color: rgba(255,255,255,.85);
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.1);
    box-shadow: 0 0.25rem 0.75rem rgb(0 0 0 / 10%);
    opacity: ${props => props.show ? "1" : "0"};
    position: relative;
    width: 450px;
    border-radius: .4rem;
	margin-right: auto;
	margin-left: auto;
	margin-bottom: 10px;
`;

export const ToastHeader = styled.div`
	display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding: .25rem .75rem;
    color: #0a0b0c;
    background-color: rgba(255,255,255,.85);
    background-clip: padding-box;
    border-bottom: 1px solid rgba(0,0,0,.05);
`;

export const ToastBody = styled.div`
	padding: 0.75rem;
`;

export const IconTextContainer = styled.div`
	display: block;
	margin: 0 .4rem;
	color: #ff6969;

	&.valid {
		color: #0cb33b;
	}
`;

export const SpanText = styled.span`
	margin-left: .4rem;
	font-weight: bolder;
`;

export const ProgressBarContainer = styled.div`
	margin: 0 .4rem;
`;
export const ProgressBarHeader = styled.div`
	font-size: 1rem;
	color: #000000;
`;
export const ProgressBar = styled.div`
	display: -ms-flexbox;
    display: flex;
    height: 0.5rem;
    overflow: hidden;
    font-size: .75rem;
    background-color: #e9ecef;
    border-radius: .25rem;
`;
export const Progress = styled.div`
	display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: center;
    justify-content: center;
    overflow: hidden;
    color: #ff969;
    text-align: center;
    white-space: nowrap;
    transition: width .6s ease;
`;