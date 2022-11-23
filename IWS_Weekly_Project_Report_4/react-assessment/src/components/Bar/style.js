import styled from "styled-components";

export const BarContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding: .2rem;
	gap:.3rem;
	align-items: center;
`;

export const BarLabel = styled.span`
	font-size: 1rem;
`;

export const BarWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 10px;
	background: #c5d1cd;
	margin-top: auto;
	margin-bottom: auto;
	border-radius: 1rem;
	overflow: hidden;
`;

export const CustomBar = styled.div`
	width: ${props => props.width ? props.width : "100%"};
	position: relative;
	background: ${props => props.bgColor ? props.bgColor : "#0f0"};
	display:block;
	height:10px;
	transition: width ease-in;
`;
