import React from "react";
import { Col, Row } from "react-bootstrap";

import Input from "../Input/Input";
const FileUpload = () => {

	return (

		<Row className="p-2 m-2">
			<Col xs={12} md={6}>
				<h4>Question</h4>
				<p>
					Select correct option from the given which is suitable for the factor?
				</p>
			</Col>
			<Col xs={12} md={6}>
				<h4>Upload your answer</h4>
				<Input type={"file"} id="file" accept="application/zip,application/pdf, .docx, .doc, .xls, .xlsx" />
				<h6>You can upload PDF, Word, Excel or zip document.</h6>
				<h6>Max upload size: 10mb</h6>
			</Col>
		</Row>

	)
}

export default FileUpload;