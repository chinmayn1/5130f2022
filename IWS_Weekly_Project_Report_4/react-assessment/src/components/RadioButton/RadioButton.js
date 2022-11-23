import React from "react";
import { RadioWrapper, RadioLabel, HiddenRadioTag, RadioPulse, RadioBtn, RadioInnerBtn, SpanText } from "./style";


const RadioButton = ({ checked, label, name, value, id, onChange }) => {

	return (
		<RadioWrapper>
			<RadioLabel htmlFor={id}>
				<HiddenRadioTag defaultChecked={checked} name={name} value={value} id={id} onChange={onChange} />
				<RadioPulse checked={checked} />
				<RadioBtn checked={checked}>
					<RadioInnerBtn />
				</RadioBtn>
				<SpanText>{label}</SpanText>
			</RadioLabel>
		</RadioWrapper>
	)
}

export default RadioButton;