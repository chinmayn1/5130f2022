// FOR MIC AND CAMERA PERMISSION TO BE ENABLED 
import React, { useState } from "react";
import BoxLayout from "../components/Box/Box";
import { Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { CloudinaryUpload } from "../actions/CloudinaryUpload";

import Webcam from "../components/Webcam/Webcam";

const Configuration = props => {

	const [image, setImage] = useState('');


	const dispatch = useDispatch();
	const response = useSelector(state => state.CloudinaryUpload);



	const handleImage = () => {
		if (image !== '' && image !== null) {
			const formData = new FormData();
			formData.append("file", image);
			formData.append("upload_preset", "tddkogp8");

			dispatch(CloudinaryUpload(formData))
		}
	}

	React.useEffect(() => {
		const token = props.location.search
		console.log(props);
		if (response[0]?.status === 200) {
			props.history.push(`/questions${token}`)
		}


	}, [response, props])
	return (
		<BoxLayout>
			<Row>
				<Col xs={12}>
					<h3>COMPANY_NAME</h3>
				</Col>
				<div className="divider" />
				<Col xs={12} className="m-2"><h4>Camera and mic</h4></Col>
			</Row>
			<Row className="p-2 m-2">
				<Col xs={12} md={6}>We use your camera images for fairness and anti-cheating mechanism for the test</Col>
				<Col xs={12} md={6} className="d-flex flex-column">
					<Webcam setImage={setImage} image={image} onClick={() => handleImage()} height={200} />
				</Col>
			</Row>
		</BoxLayout>
	)
};

export default Configuration;