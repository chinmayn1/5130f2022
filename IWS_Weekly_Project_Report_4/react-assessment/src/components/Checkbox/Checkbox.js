import React from "react"
import { CheckWrapper, CheckboxLabel, HiddenCheckboxTag, CheckboxTag, CheckMark, SpanText } from "./style";

const Checkbox = ({ checked, label, id, onChange, name }) => {
	return (
		<CheckWrapper>
			<CheckboxLabel htmlFor={id}>
				<HiddenCheckboxTag defaultChecked={checked} id={id} onChange={onChange} name={name} />
				<CheckboxTag checked={checked}>
					<CheckMark viewBox="0 0 24 34">
						<polyline points="20 6 9 17 4 12" />
					</CheckMark>
				</CheckboxTag>
				<SpanText>{label}</SpanText>
			</CheckboxLabel>
		</CheckWrapper>
	)
}

export default Checkbox;