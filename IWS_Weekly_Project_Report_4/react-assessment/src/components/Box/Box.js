import React from "react";
import { Row, Col, Container } from "react-bootstrap"
import { CenteredBox, PaddingDiv } from "./style";

const Box = (props) => {
	return (
		<PaddingDiv>
			<CenteredBox full noPosition={props?.noPosition}>
				<Container fluid>
					<Row className="mx-auto justify-content-center">
						<Col xs={12} className="p-3">
							{props.children}
						</Col>
					</Row>
				</Container>
			</CenteredBox>
		</PaddingDiv>
	)
}

export default Box;