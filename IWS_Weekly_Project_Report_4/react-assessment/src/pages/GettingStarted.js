import React from "react";
import Box from "../components/Box/Box";
import { Row, Col } from "react-bootstrap";
import Button from "../components/Button/Button"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const GettingStarted = () => {
	return (
		<Box>
			<Row className="p-2">
				<Col xs={12}>
					<h3>COMPANY_NAME</h3>
				</Col>
				<Col xs={12} className="my-1">
					<p>Hi abc,</p>
					<p>Thank you for applying at COMPANY_NAME and welcome to our assessment.</p>
					<p>
						Completing it will give you a chance to show off your skill sand stand out from crowd!
					</p>

					<p>Good luck!</p>

					<div>
						<h4>A few things before you start:</h4>
						<ul>
							<li>one</li>
							<li>two</li>
							<li>three</li>
							<li>four</li>
						</ul>
					</div>
				</Col>
				<Col className="d-flex justify-content-end">
					<Button buttonText="Get Started" icon={faArrowRight} />
				</Col>
			</Row>
		</Box>
	)
}

export default GettingStarted;