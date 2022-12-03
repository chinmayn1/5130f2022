import React from 'react';
import { CookieConset, CookieText } from "./style";
import Button from "../Button/Button"

const Cookie = () => {
	return (
		<CookieConset>
			<CookieText>
				We use cookies to ensure you have the best browsing experience on our website. By using our site, you
				acknowledge that you have read and understood our
				&nbsp;<a href="pl">Cookie Policy</a> and &nbsp; <a>Privacy Policy</a>
			</CookieText>
			<Button buttonText="Accept" bgColor="#198754" shadeColor="#8bed4f" textColor="#000" />
		</CookieConset>
	)
}

export default Cookie
