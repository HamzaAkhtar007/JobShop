import React, { useEffect, useState } from 'react'
import Inputform from './Inputform';
import { faBox, faCity, faEnvelope, faEnvelopeCircleCheck, faFont, faInfo, faMinus, faSignature } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMaxcdn } from '@fortawesome/free-brands-svg-icons';
import Spinner from './Spinner';
import { setUser } from '../../redux/features/Auth/AuthSlice';
const Country = require("country-state-city").Country
const Addjob = () => {
    const dispatch = useDispatch();
    const [jobTitle, setjobTitle] = useState("");
    const [jobType, setjobType] = useState("");
    const [jobCategory, setjobCategory] = useState("");
    const [MinSalary, setMinSalary] = useState("")
    const [MaxSalary, setMaxSalary] = useState("");
    const [ContactEmail, setContactEmail] = useState("");
    const [City, setCity] = useState("");
    const [createdby, setcreatedby] = useState("");
    const [jobTitleerror, setjobTitleerror] = useState("");
    const [jobTypeerror, setjobTypeerror] = useState("");
    const [Categoryerror, setCategoryerror] = useState("");
    const [MinSalaryerror, setMinSalaryerror] = useState("");
    const [MaxSalaryerror, setMaxSalaryerror] = useState("");
    const [ContactEmailerror, setContactEmailerror] = useState("");
    const [Cityerror, setCityerror] = useState("");

    let { user } = useSelector((state) => state.presistedReducer.auth);
    const [companies, setUsercompanies] = useState(null);
    const [jobdescription, setjobdescription] = useState("");
    const [jobdescriptionerror, setjobdescriptionerror] = useState("");
    const [cities, setCities] = useState([]);
    const GETALLUSER = async () => {


        await axios.post("http://localhost:5000/api/v1/company/get-comapnies", {

            token: localStorage.getItem('token'),
            userid: user._id,
        }, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(function (res) {

            console.log(res.data.data)
            setUsercompanies(res.data.data);
        }).catch(function (error) {
            dispatch(setUser(null));

            <Navigate to="/Login" />
        });





    }



    const handleFormSubmit = async (e) => {
        e.preventDefault();



        const res = await axios.post("http://localhost:5000/api/v1/job/create-job", {

            token: localStorage.getItem('token'),
            createdby: createdby,
            jobTitle: jobTitle,
            jobType: jobType,
            jobdescription: jobdescription,
            Category: jobCategory,
            MinSalary: MinSalary,
            MaxSalary: MaxSalary,
            ContactEmail: ContactEmail,
            City: City,
            tags: jobTitle + " Jobs-Remote Permanent-Job "

        }, {
            headers: {
                Authorization: localStorage.getItem('token'),

            }
        })
        if (res.status === 200) {
            toast.success("Job Created Successfully");
            <Navigate to="/jobs" />
        }
        else {
            toast.error("Job Not Created Successfully");
            <Navigate to="/jobs" />
        }



    };

    useEffect(() => {
        if (!companies) {
            const cityData = Country.getAllCountries();
            setCities(cityData.map(city => city.name));
            GETALLUSER();
        }
    }, [companies]);
    if (!companies) {
        return (<Spinner />)
    }
    else {
        return (

            <>
                <div className="container py-5 h-100 ">

                    <div className="row justify-content-center align-items-center h-100 ">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className="card shadow-2-strong card-registration formbackground">
                                <div className="card-body p-4 p-md-5">
                                    <center> <img src='/assets/images/JOBSHOP.png' alt='logo' height={200} width={200} /></center>
                                    <h5 className="mb-4 pb-2 pb-md-0 mb-md-5  ">Add New Job </h5>

                                    <form onSubmit={handleFormSubmit} encType="multipart/form-data" >



                                        <div className="row">
                                            <div className="col-md-9 mb-6 d-flex align-items-center">
                                                <div className="form-outline datepicker w-100">
                                                    <label htmlFor="createdby" className="form-label">
                                                        <FontAwesomeIcon icon={faBox} />&nbsp; Select Company  &nbsp;
                                                    </label>
                                                    <select
                                                        className="form-select form-select-lg"
                                                        name="createdby"
                                                        value={createdby}
                                                        onChange={(e) => {
                                                            setcreatedby(e.target.value);
                                                        }}
                                                    >
                                                        <option value="">Select a Compnay </option>
                                                        {companies.map((row, rowIndex) => (

                                                            <option value={row["_id"]}>{row["name"]} </option>


                                                        ))}


                                                        {/* Add more categories here */}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>


                                        <Inputform htmlfor="jobTitle" labeltext={"Job Title"} type={"text"} name={"jobTitle"} value={jobTitle} handleChange={(e) => {
                                            setjobTitle(e.target.value);
                                        }} icon={faSignature} errortype={jobTitleerror} />

                                        <div className="row">
                                            <div className="col-md-9 mb-6 d-flex align-items-center">
                                                <div className="form-outline datepicker w-100">
                                                    <label htmlFor="jobType" className="form-label">
                                                        <FontAwesomeIcon icon={faBox} />&nbsp; Job Type  &nbsp;
                                                        {/* {errortype && <small className="text-danger">{errortype}</small>} */}
                                                    </label>
                                                    <select
                                                        className="form-select form-select-lg"
                                                        name={"jobType"}
                                                        value={jobType}
                                                        onChange={(e) => {
                                                            setjobType(e.target.value)
                                                        }}
                                                    >
                                                        <option >Select Job Type</option>
                                                        <option value="Full-time">Full-time</option>
                                                        <option value="Part-time">Part-time</option>
                                                        <option value="Temporary">Temporary</option>
                                                        <option value="Contract">Contract</option>
                                                        <option value="Internship">Internship</option>
                                                        <option value="Permanent">Permanent</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-9 mb-6 d-flex align-items-center">
                                                <div className="form-outline datepicker w-100">
                                                    <label htmlFor="jobCategory" className="form-label">
                                                        <FontAwesomeIcon icon={faBox} />&nbsp; Job Category  &nbsp;
                                                    </label>
                                                    <select
                                                        className="form-select form-select-lg"
                                                        name="jobCategory"
                                                        value={jobCategory}
                                                        onChange={(e) => {
                                                            setjobCategory(e.target.value);
                                                        }}
                                                    >
                                                        <option value="">Select Job Category</option>
                                                        <option value="Business">Business</option>
                                                        <option value="Technology">Technology</option>
                                                        <option value="Healthcare">Healthcare</option>
                                                        <option value="Education">Education</option>
                                                        <option value="Engineering">Engineering</option>
                                                        <option value="Arts and Entertainment">Arts and Entertainment</option>
                                                        <option value="Hospitality and Tourism">Hospitality and Tourism</option>
                                                        <option value="Science and Research">Science and Research</option>
                                                        <option value="Manufacturing and Production">Manufacturing and Production</option>
                                                        <option value="Retail and Sales">Retail and Sales</option>
                                                        <option value="Law and Legal Services">Law and Legal Services</option>
                                                        <option value="Social Services and Nonprofits">Social Services and Nonprofits</option>
                                                        <option value="Transportation and Logistics">Transportation and Logistics</option>
                                                        <option value="Agriculture and Farming">Agriculture and Farming</option>
                                                        <option value="Construction and Trades">Construction and Trades</option>
                                                        <option value="Government and Public Administration">Government and Public Administration</option>
                                                        <option value="Environmental and Sustainability">Environmental and Sustainability</option>
                                                        <option value="Finance and Investment">Finance and Investment</option>
                                                        <option value="Sports and Recreation">Sports and Recreation</option>
                                                        <option value="Communication and Media">Communication and Media</option>
                                                        {/* Add more categories here */}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-9 mb-6 d-flex align-items-center">
                                                <div className="form-outline datepicker w-100">
                                                    <label htmlFor="jobdescription" className="form-label"><FontAwesomeIcon icon={faInfo} />&nbsp; jobdescription  &nbsp;  {jobdescriptionerror && <small className="text-danger">{jobdescriptionerror}</small>} </label>
                                                    <textarea type="text" className="form-control form-control-lg" name={"jobdescription"} value={jobdescription} onChange={(e) => { setjobdescription(e.target.value); }} />
                                                </div>
                                            </div>

                                        </div>


                                        <Inputform htmlfor="MinSalary" labeltext={"MinSalary"} type={"text"} name={"MinSalary"} value={MinSalary} handleChange={(e) => {
                                            setMinSalary(e.target.value);
                                        }} icon={faMinus} errortype={MinSalaryerror} />
                                        <Inputform htmlfor="MaxSalary" labeltext={"MaxSalary"} type={"text"} name={"MaxSalary"} value={MaxSalary} handleChange={(e) => {
                                            setMaxSalary(e.target.value);
                                        }} icon={faMaxcdn} errortype={MaxSalaryerror} />

                                        <Inputform htmlfor="ContactEmail" labeltext={"ContactEmail"} type={"email"} name={"ContactEmail"} value={ContactEmail} handleChange={(e) => {
                                            setContactEmail(e.target.value);
                                        }} icon={faEnvelopeCircleCheck} errortype={ContactEmailerror} />

                                        <div className="row">
                                            <div className="col-md-9 mb-6 d-flex align-items-center">
                                                <div className="form-outline datepicker w-100">
                                                    <label htmlFor="City" className="form-label">
                                                        <FontAwesomeIcon icon={faCity} />&nbsp; City  &nbsp;
                                                    </label>
                                                    <select
                                                        className="form-select form-select-lg"
                                                        name="City"
                                                        id='City'
                                                        value={City}
                                                        onChange={(e) => {
                                                            setCity(e.target.value);
                                                        }}
                                                    >
                                                        {cities.map(city => (
                                                            <option key={city} value={city}>
                                                                {city}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>


                                        <div className='d-flex justify-content-between'>

                                            <div className="mt-4 pt-2">
                                                <button className="btn btn-primary btn-lg" type="submit" >Add</button>
                                            </div>
                                        </div>

                                    </form>


                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default Addjob
