import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux"
import { CloudinaryUpload } from "../actions/CloudinaryUpload";

import Coding from "../components/Question/Coding";
import MCQ from "../components/Question/MCQ";
import FileUpload from "../components/Question/FileUpload";
import VideoRecord from "../components/Question/VideoRecord";


import Box from "../components/Box/Box";
import Bar from "../components/Bar/Bar";
import TimerBar from "../components/Bar/TimerBar";
import Button from "../components/Button/Button";
import Divider from "../components/Divider/Divider";
import Rating from "../components/Rating/Rating";

import Webcam from "react-webcam";

import { Row, Col, Modal } from "react-bootstrap";
import { faClock } from "@fortawesome/free-solid-svg-icons"
import { getAssessment } from "../actions/Assessment";

import { DecodeToken } from "../components/Token/TokenParser"

const Question = props => {
	const { user_id, assessment_id } = DecodeToken(props.location.search)?.sub

	React.useEffect(() => {
		// navigator.mediaDevices.getUserMedia({ video: true })
		// 	.then()
		// 	.catch(e => props.history.push("/"))

	}, [props])

	const [currentQue, setCurrentQue] = useState(0);
	const [questionArr, setQuestionArr] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [isFinish, setIsFinish] = useState(false);
	const [isStreaming, setIsStreaming] = useState();

	const webcamRef = React.useRef(null);

	const dispatch = useDispatch();
	const AssessmentResponse = useSelector(state => state.Assessment);
	const CloudinaryResponse = useSelector(state => state.CloudinaryUpload)
	////for UI Testing
	// const res = [
	// 	{
	// 		"assessment_id": 1,
	// 		"correct_option": "option_2",
	// 		"id": 1,
	// 		"isShuffle": null,
	// 		"name": "Question-1",
	// 		"option_1": "2",
	// 		"option_2": "22",
	// 		"option_3": null,
	// 		"option_4": null,
	// 		"orderBy": 9,
	// 		"question": "<p>pick one correct option for given one. 2+2 = x. what is x if given number is str.</p>",
	// 		"question_type": "Coding",
	// 		"selected_language": "Python",
	// 		"time": 8,
	// 		"user_id": 1
	// 	},
	// 	{
	// 		"assessment_id": 1,
	// 		"correct_option": "option_2",
	// 		"id": 2,
	// 		"isShuffle": null,
	// 		"name": "Question-2",
	// 		"option_1": "2365",
	// 		"option_2": "22",
	// 		"option_3": null,
	// 		"option_4": null,
	// 		"orderBy": 9,
	// 		"question": "<p>pick one correct option for given one. 2+2 = x. what is x if given number is str.</p>",
	// 		"question_type": "MCQ",
	// 		"selected_language": null,
	// 		"time": 5,
	// 		"user_id": 1
	// 	}
	// {
	// 	"assessment_id": 1,
	// 	"correct_option": "option_4",
	// 	"id": 2,
	// 	"isShuffle": null,
	// 	"name": "Question-3",
	// 	"option_1": "UK",
	// 	"option_2": "UAE",
	// 	"option_3": "USA",
	// 	"option_4": "India",
	// 	"orderBy": 9,
	// 	"question": "What is the capital of india",
	// 	"question_type": "MCQ",
	// 	"selected_language": null,
	// 	"time": 2,
	// 	"user_id": 1
	// }
	//]

	//Creating Question Array according to question type 
	const Ques = (item) => {

		if (item.question_type === "MCQ") {
			setQuestionArr(prev => [...prev, <MCQ details={item} setCurrentQue={setCurrentQue} currentQue={currentQue} />])
		}
		else if (item.question_type === "Coding") {
			setQuestionArr(prev => [...prev, <Coding details={item} setCurrentQue={setCurrentQue} currentQue={currentQue} />])
		}
		else if (item.question_type === "Video Record") {
			setQuestionArr(prev => [...prev, <VideoRecord details={item} setCurrentQue={setCurrentQue} currentQue={currentQue} />])
		}
		else if (item.question_type === "File Upload") {
			setQuestionArr(prev => [...prev, <FileUpload details={item} setCurrentQue={setCurrentQue} currentQue={currentQue} />])
		}
	}

	// eslint-disable-next-line
	useEffect(() => {
		dispatch(getAssessment(user_id, assessment_id));
	}, [])
	useEffect(() => {
		// res.map(x => Ques(x))
		if (AssessmentResponse[0]) {
			console.log(AssessmentResponse[0].data.data.questions)
			AssessmentResponse[0].data.data.questions.map(x => Ques(x));
		}

		// if (CloudinaryResponse[0]) {
		// 	console.log(CloudinaryResponse)
		// }
	}, [AssessmentResponse])
	const handleNextQue = () => {
		if ((currentQue + 1) < questionArr.length) {
			setCurrentQue(currentQue + 1)
			setShowModal(false)
		}
	}

	const handleFinish = () => setIsFinish(true);

	const modal = () => questionArr.length !== currentQue + 1 && setShowModal(true);

	const isLastQue = () => questionArr.length === currentQue + 1 && setIsFinish(true)

	useEffect(() => {
		if (!isFinish) {
			const UploadTimeID = setInterval(() => {
				const imageSrc = webcamRef?.current?.getScreenshot();
				if (imageSrc) {
					// const formData = new FormData();
					// formData.append("file", imageSrc);
					// formData.append("upload_preset", "tddkogp8");
					// dispatch(CloudinaryUpload(formData))
				}
			}, process.env.CLICKS_PER_DURATION || 5000)

			return () => clearInterval(UploadTimeID)
		}
	}, [dispatch, isFinish])

	return (
		<>
			<div className="d-flex flex-column align-items-center">
				{
					!isFinish && (
						<Webcam
							className="my-2"
							height={80}
							width={80}
							ref={webcamRef}
							screenshotFormat="image/jpeg"
							minScreenshotHeight={1024}
							minScreenshotWidth={1024}
							videoConstraints={{
								width: 220,
								height: 200,
								facingMode: "user"
							}}
							style={{ objectFit: "cover" }}
							onUserMediaError={e => console.log(e)}
							onUserMedia={e => setIsStreaming(e.active)}
						/>
					)
				}
				{
					isStreaming ? (
						<Box noPosition>
							<Row>
								<Col xs={12}>
									<h3>COMPANY_NAME</h3>
								</Col>
							</Row>
							<Divider />
							{isFinish ?
								<React.Fragment>
									<Row className="text-center p-3">
										<Col xs={12} className="my-2">
											<h3>Thank You</h3>
											<h5>You have finished your assessment. How was your experience ?</h5>
											<div className="p-2 my-2 mx-auto d-flex flex-column">
												<Rating totalStar={5} />
												<Button >Submit</Button>
											</div>
										</Col>
										<Col xs={12}>
											<h3>Thanks for compeleting this assessment.</h3>
											<h4>You can close this window/tab now</h4>
										</Col>
									</Row>
								</React.Fragment> :
								<React.Fragment>
									<Row className="mx-auto p-2">
										<Col xs={12} md={6}>
											<TimerBar seconds={AssessmentResponse[0]?.data.data.questions[currentQue].time} handleNextQue={handleNextQue} modal={modal} iconName={faClock} setIsFinish={setIsFinish}
												isLastQue={isLastQue} />
											<Bar label={`${currentQue + 1}/${questionArr.length}`} current={`${currentQue + 1}`} total={questionArr.length} />
											{/* Sample */}
											{/* <TimerBar seconds={res[currentQue].time} handleNextQue={handleNextQue} modal={modal} iconName={faClock} setIsFinish={setIsFinish}
												isLastQue={isLastQue} />
											<Bar label={`${currentQue + 1}/${questionArr.length}`} current={`${currentQue + 1}`} total={questionArr.length} /> */}
										</Col>
										<Col xs={12} md={6}>
											{
												(questionArr.length === currentQue + 1) ? (<Button type="button" variant="success" className="float-right" onClick={() => handleFinish()}>Finish</Button>) : (<Button type="button" className="float-right" onClick={() => handleNextQue()} >Next</Button>)
											}
										</Col>
									</Row>
									{questionArr[currentQue]}
								</React.Fragment>
							}
						</Box>) : <h2>Loading</h2>
				}
				<Modal animation={false} show={false} centered>
					<Modal.Header>Alert!</Modal.Header>
					<Modal.Body>The timer for the question is over. Click Next to move to further.</Modal.Body>
					<Modal.Footer>
						<Button onClick={() => handleNextQue()}> Next</Button>
					</Modal.Footer>
				</Modal>
			</div>

		</>
	)
}
export default Question;