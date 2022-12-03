import styled from "styled-components";

export const CookieConset = styled.div`
	width: 100%;
	flex-wrap: wrap;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	color: #d6d6d6;
	background-color: #3c404d;
	padding: .6em 1.8em;
	z-index: 999999;
	display: none;	
`;

export const CookieText = styled.span`
	font-family: Helvetica,Arial,sans-serif;
	font-size: 12px;
	line-height: 2.5em;
	flex: 99 1 500px;
	text-align: center;
	margin: 6px 30px 5px 0;

	& > a {
		text-decoration: underline !important;
		color: #a7a5a5 !important;
		font-weight: bold;
	}
`;
