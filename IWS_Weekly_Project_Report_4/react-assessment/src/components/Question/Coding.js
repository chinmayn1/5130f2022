import React from "react";
import { Col, Row } from "react-bootstrap";

import Button from "../Button/Button";

import { faPlay } from "@fortawesome/free-solid-svg-icons";

const Coding = props => {

	return (
		<Row className="m-2">
			<Col xs={12}>
				<h4>Question</h4>
				<p>{props?.details?.question}</p>
			</Col>
			<Col xs={12}>
				<Row>
					<Col xs={12}><h4>Code your answer</h4>
						<textarea rows={5} placeholder="type here" style={{ width: 'inherit' }}></textarea>
					</Col></Row>
				<Button icon={faPlay}>Run Code</Button>
			</Col>
			<Col xs={12} className="p-2">
				<h5>Output:</h5>
				<div>xxxxxx</div>
			</Col>
		</Row>
	)
}

export default Coding;