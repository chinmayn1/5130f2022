import React, { useEffect, useState } from "react";
import { BarContainer, BarWrapper, BarLabel, CustomBar } from "./style";


const Bar = ({ current, total, label }) => {

	const [clientWidth, setClientWidth] = useState()

	// eslint-disable-next-line
	useEffect(() => {
		const clientWidth = document.getElementById("bar").clientWidth;

		setClientWidth(clientWidth);
	})
	return (
		<BarContainer>
			<BarLabel>{label}</BarLabel>
			<BarWrapper id="bar">
				<CustomBar width={`${current * clientWidth / total}px`} />
			</BarWrapper>
		</BarContainer >
	)
}

export default Bar;