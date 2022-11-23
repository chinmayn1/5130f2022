import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

import Button from "../Button/Button";

const VideoRecord = () => {

	const [uploading, setUploading] = useState(false);

	const startRecording = () => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				const video = document.getElementById("video");
				console.log(stream);
				video.srcObject = stream;
			})
			.catch(err => alert(err))
	}

	const stopRecording = () => {
		setUploading(true);
	}
	return (

		<Row className="p-2 m-2">
			<Col xs={12} md={6}>
				<h4>Question</h4>
				<p>
					Select correct option from the given which is suitable for the factor?
				</p>
			</Col>
			<Col xs={12} md={6}>
				{uploading ? (<h3>Uploading Please Wait</h3>) : (<>
					<h4>Record Your Answer</h4>
					<video id="video" muted autoPlay style={{ width: "100%" }} />
					<Button onClick={() => startRecording()} >Start Recording</Button>
					<Button bgColor="#ff7979" shadeColor="#ff9999" onClick={() => stopRecording()} >Stop Recording</Button></>)
				}
			</Col>
		</Row>

	)
}

export default VideoRecord;