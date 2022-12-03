import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import RadioButton from "../../components/RadioButton/RadioButton";


const MCQ = props => {

	const [answer, setAnswer] = useState();

	// Handling answer for radio inputs 
	const handleRadio = e => setAnswer(e.target.value);

	useEffect(() => {
		document.getElementById("question").innerHTML = props.details?.question
	}, [])
	return (
		<Row className="p-2 m-2" >
			<Col xs={12} md={6}>
				<h4>Question</h4>
				<p id="question">

				</p>
			</Col>
			<Col xs={12} md={6}>
				<h4>Select Correct Option</h4>

				<div style={{ fontSize: "1.3rem" }}>
					<RadioButton onChange={handleRadio} label={props.details?.option_1} checked={answer === props.details?.option_1} value={props.details?.option_1} id="radio-1" name="answer" />
					<RadioButton onChange={handleRadio} label={props.details?.option_2} checked={answer === props.details?.option_2} value={props.details?.option_2} id="radio-2" name="answer" />
					{
						props?.details?.option_3 && (<RadioButton onChange={handleRadio} label={props.details.option_3} checked={answer === props.details.option_3} value={props.details.option_3} id="radio-3" name="answer" />)
					}
					{
						props?.details?.option_4 && (
							<RadioButton onChange={handleRadio} label={props.details.option_4} checked={answer === props.details.option_4} value={props.details.option_4} id="radio-4" name="answer" />
						)
					}

				</div>
			</Col>
		</Row>

	)
}

export default MCQ;