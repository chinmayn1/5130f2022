import React, { useEffect, useState } from "react";
import { BarContainer, BarWrapper, BarLabel, CustomBar } from "./style";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TimerBar = ({ hours = 0, minutes = 0, seconds = 0, iconName, ...props }) => {


	if (seconds > 60) {
		minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);
	}
	if (minutes > 60) {
		hours = Math.floor(minutes / 60);
		minutes = Math.floor(minutes % 60);
	}

	const [totalTime, setTotalTime] = useState((hours * 60 * 60) + (minutes * 60) + (seconds));

	const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);

	const [clientWidth, setClientWidth] = useState();

	const [totalTimeLeft, setTotalTimeLeft] = useState();

	const tick = () => {

		if (hrs === 0 && mins === 0 && secs === 0) {
			// ({ ...props }.handleNextQue())
			({ ...props }.modal());
			({ ...props }.isLastQue());
		}

		else if (mins === 0 && secs === 0)
			setTime([hrs - 1, 59, 59]);

		else if (secs === 0)
			setTime([hrs, mins - 1, 59]);

		else
			setTime([hrs, mins, secs - 1])
	}

	// eslint-disable-next-line
	useEffect(() => {
		const clientWidth = document.getElementById("timer-bar").clientWidth;

		setClientWidth(clientWidth);

		setTotalTimeLeft((hrs * 60 * 60) + (mins * 60) + secs);

		const timeID = setInterval(() => {

			if (totalTime === ((hours * 60 * 60) + (minutes * 60) + seconds)) {
				tick();
			} else {
				setTime([hours, minutes, seconds]);
				setTotalTime((hours * 60 * 60) + (minutes * 60) + seconds)
			}

			if (hrs === 0 && mins === 0 && secs === 0) {
				clearInterval(timeID);
				return
			}
		}, 1000);

		return () => clearInterval(timeID)

	})


	const AnimateBgColor = () => {
		const COLORS = [
			{ "color": "#ff0000", "percentage": 20 },
			{ "color": "#ffa500", "percentage": 40 },
			{ "color": "#15e72f", "percentage": 60 },
			{ "color": "#00ff20", "percentage": 100 }
		]
		const percentage = (totalTimeLeft / totalTime) * 100;
		const bgColor = COLORS.filter(item => item.percentage >= percentage)[0];


		if (bgColor) {
			return bgColor.color
		}
		return "#00ff20";
	}
	// console.log(totalTimeLeft, totalTime, isTimer)
	return (
		<BarContainer>
			{iconName && (<FontAwesomeIcon icon={iconName} />)}
			<BarLabel>{
				`${hrs.toString().padStart(2, '0')}:${mins
					.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}
			</BarLabel>
			<BarWrapper id="timer-bar">
				<CustomBar width={`${totalTimeLeft * clientWidth / totalTime}px`} bgColor={AnimateBgColor} />
			</BarWrapper>
		</BarContainer >
	)
}

export default TimerBar;