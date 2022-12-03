import React, { useState } from "react";
import { FormGroup, InputTag, InputLabel, RequiredStar, Toast, ToastBody, ToastHeader, ProgressBarContainer, ProgressBarHeader, ProgressBar, Progress, IconTextContainer, SpanText } from "./style";
import { faCheckCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Password = ({ name, label, onChange, value, id, width, requiredStar, toast }) => {

	const [inputType, setInputType] = useState("password");
	const [icon, setIcon] = useState(faEyeSlash);
	const [show, setShow] = useState(false);

	const handleVisibility = () => {
		if (inputType === "password") {
			setInputType("text");
			setIcon(faEye)
		} else {
			setInputType("password");
			setIcon(faEyeSlash);
		}
	}

	const handleChange = e => {

		if (!toast) return

		const labels = ['', 'Too Weak!😢', 'Average😩', 'Strong💪'];
		const { value } = e.target;
		//For icon and text color
		let lowUpp = document.querySelector('.lower-upper')
		let special_char = document.querySelector('.atleast-special');
		let eight_plus = document.querySelector('.character');
		let atleast_number = document.querySelector('.atleast-number');

		let strength = document.getElementById('strength');
		let status = document.getElementById('status');

		if (/[a-zA-Z]/g.test(value)) {
			lowUpp.classList.add('valid')
		} else {
			lowUpp.classList.remove('valid')
		}
		if (/['!@#$%^&*()']/g.test(value)) {
			special_char.classList.add('valid')
		} else {
			special_char.classList.remove('valid')
		}
		if (/[0-9]/g.test(value)) {
			atleast_number.classList.add('valid')
		} else {
			atleast_number.classList.remove('valid')
		}
		if (value.length >= 8) {
			eight_plus.classList.add('valid')
			// this.setState({ atleast_eight: true })
		} else {
			eight_plus.classList.remove('valid')
			// this.setState({ atleast_eight: false })
		}
		// Password Strength meter
		if (value.length > 0 && value.length <= 4) {
			strength.style.cssText = "width:30%;background-color:#ff0069";
			status.innerText = labels[1]
		} else if (value.length >= 5 && value.length <= 8) {
			strength.style.cssText = "width:70%;background-color:#ff6910";
			status.innerText = labels[2]
		} else if (value.length > 8) {
			strength.style.cssText = "width:90%;background-color:#39d600";
			status.innerText = labels[3]
		} else if (value.length >= 14 && /['!@#$%^&*()_=']/g.test(value)) {
			strength.style.cssText = "width:100%;background-color:#39d600";
			status.innerText = labels[3]
		} else {
			strength.style.cssText = "width:0%;background-color:#ffffff";
			status.innerText = labels[0]
		}
	}


	return (
		<React.Fragment>
			<FormGroup width={width}>
				<InputTag placeholder=" " type={inputType} name={name} onChange={(e) => { handleChange(e, toast); onChange(e) }} onFocus={() => setShow(true)} onBlur={() => setShow(false)} cursor={"pointer"} value={value} id={id} />
				<FontAwesomeIcon className="icon" icon={icon} onClick={() => handleVisibility()} />
				<InputLabel htmlFor={id}>{label}{requiredStar && <RequiredStar />}</InputLabel>

			</FormGroup>
			{
				toast && (<Toast show={show}>
					<ToastHeader>Your passsword must have:</ToastHeader>
					<ToastBody>
						<IconTextContainer className="character">
							<FontAwesomeIcon icon={faCheckCircle} />
							<SpanText>8 or more characters</SpanText>
						</IconTextContainer>
						<IconTextContainer className="lower-upper">
							<FontAwesomeIcon icon={faCheckCircle} />
							<SpanText>upper or lowercase letters</SpanText>
						</IconTextContainer>
						<IconTextContainer className="atleast-number">
							<FontAwesomeIcon icon={faCheckCircle} />
							<SpanText>at least one number</SpanText>
						</IconTextContainer>
						<IconTextContainer className="atleast-special">
							<FontAwesomeIcon icon={faCheckCircle} />
							<SpanText>at least one special character</SpanText>
						</IconTextContainer>

						<ProgressBarContainer>
							<ProgressBarHeader>
								Password Strength: <span id="status"></span>
							</ProgressBarHeader>
							<ProgressBar>
								<Progress id="strength"></Progress>
							</ProgressBar>
						</ProgressBarContainer>
					</ToastBody>
				</Toast>)
			}


		</React.Fragment>
	)
};

export default Password;