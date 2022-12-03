import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BoxLayout from '../components/Box/Box'
import Input from "../components/Input/Input"
import Checkbox from '../components/Checkbox/Checkbox'
import Button from "../components/Button/Button"
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const AssessmentView = () => {
	const [checked, setChecked] = useState(false);
	return (
		<BoxLayout>
			<Container fluid className="p-3">
				<section className="p-2">
					<Row>
						<Col className="text-center"><h3>COMPANY_LOGO</h3></Col>
					</Row>
					<Row>
						<Col className="text-center"><h3>COMPANY_NAME</h3></Col>
					</Row>
				</section>
				<section className="p-2 m-2">
					<Row>
						<Col className="text-center"><h5>Please confirm who you are</h5></Col>
						<Col xs={12}>
							<div className="mb-4">
								<Input type="text" id="first_name" name="first_name" label="First Name" width={"50%"} readOnly />
							</div>
							<div className="mb-4">
								<Input type="text" id="last_name" name="first_name" label="Last Name" width={"50%"} readOnly />
							</div>
							<div className="mb-4">
								<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} label="I have read and accept the Privacy Policy" width={"50%"} />
							</div>
							<div className="mx-auto">
								<div className="d-flex justify-content-center">
									<Button buttonText="Next" icon={faArrowRight} />
								</div>
							</div>
						</Col>
					</Row>
				</section>
			</Container>
		</BoxLayout>
	)
}

export default AssessmentView