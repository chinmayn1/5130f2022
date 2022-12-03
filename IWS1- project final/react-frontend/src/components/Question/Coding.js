import React from "react";
import { Col, Row } from "react-bootstrap";
import Landing from "../Coding/components/Landing"
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
						{/* <textarea rows={5} placeholder="type here" style={{ width: 'inherit' }}> */}
						<Landing />
						{/* </textarea> */}
					</Col></Row>
			</Col>
		</Row>
	)
}

export default Coding;