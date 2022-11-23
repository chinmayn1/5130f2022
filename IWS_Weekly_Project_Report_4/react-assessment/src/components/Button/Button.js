import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonTag, IconContainer } from "./style"

const Button = ({ type = "button", icon, variant, ...props }) => {

	const BGCOLOR = [{ "primary": "#5d2fdf" }, { "success": "#28a745" }];
	const SHADECOLOR = [{ "primary": "#5526c5" }, { "success": "#06761f" }];


	const bgColor = BGCOLOR.filter(x => x[variant]);
	const shadeColor = SHADECOLOR.filter(x => x[variant]);

	return (
		<ButtonTag type={type} {...props} disabled={{ ...props }.isLoading} bgColor={bgColor.length && bgColor[0][variant]} shadeColor={shadeColor.length && shadeColor[0][variant]}>
			{{ ...props }.children}
			{
				icon ? (
					<IconContainer>
						<FontAwesomeIcon icon={icon} />
					</IconContainer>)
					: ''
			}
		</ButtonTag>
	)
}

export default Button;
