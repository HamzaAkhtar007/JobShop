import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Inputform = ({ htmlfor, labeltext, type, name, value, handleChange, icon, errortype }) => {
    return (
        <>

            <div className="row">
                <div className="col-md-9 mb-6 d-flex align-items-center">
                    <div className="form-outline datepicker w-100">
                        <label htmlFor={htmlfor} className="form-label"><FontAwesomeIcon icon={icon} />&nbsp; {labeltext}  &nbsp;  {errortype && <small className="text-danger">{errortype}</small>} </label>
                        <input type={type} className="form-control form-control-lg" name={name} value={value} onChange={handleChange} />

                    </div>
                </div>

            </div>


        </>
    )
}

export default Inputform
