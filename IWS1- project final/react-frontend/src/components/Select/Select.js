import React from 'react'

import { FormGroup, SelectTag } from "./style";
const Select = ({ name, id, value, requireStar, onChange, options = [] }) => {
    return (
        <React.Fragment>
            <FormGroup>
                <SelectTag name={name} id={id} value={value} onChange={onChange}>
                    {
                        options.map((opt, index) => <option key={index} value={index === 0 ? "" : opt}>{opt}</option>)
                    }
                </SelectTag>
            </FormGroup>
        </React.Fragment>
    )
}

export default Select
