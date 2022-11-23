import React from "react";
import { FormGroup, InputTag, InputLabel, RequiredStar, InputFile } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Input = ({ type, id, label, value, name, onChange, icon, width, requiredStar, accept }) => {
	return (
		<FormGroup width={width}>
			{
				type !== "file" ? (
					<>
						<InputTag placeholder=" " id={id} type={type} onChange={onChange} value={value} name={name} />
						{
							icon ? (<FontAwesomeIcon className="icon" icon={icon} />) : ""
						}
						<InputLabel htmlFor={id} >
							{label}{requiredStar && <RequiredStar />}
						</InputLabel>
					</>
				) : (
					<>
						<label htmlFor={id}>
							<InputFile id={id} type={type} onChange={onChange} value={value} name={name} accept={accept} />
						</label>
					</>
				)
			}
		</FormGroup>
	)
}
export default Input