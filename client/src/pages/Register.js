
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faLock, faPhone, faSignature, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Navbarall from '../components/shared/Navbarall.js';
import Footerall from "../components/shared/Footerall.js"
import axios from "axios"
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/AlertSlice.js';
import Spinner from '../components/shared/Spinner.js';
import { toast } from 'react-toastify';
const Register = () => {

    let [userType, setuserType] = useState("");
    let [name, setname] = useState("");
    let [email, setemail] = useState("");
    let [Phone, setPhone] = useState("");
    let [Password, setPassword] = useState("");
    let [cpassword, setcpassword] = useState("");
    let [showAlert, setShowAlert] = useState(false);
    let [usertypeError, setusertypeError] = useState("");
    let [nameError, setNameError] = useState("");
    let [emailError, setEmailError] = useState("");
    let [passwordError, setPasswordError] = useState("");

    const handleHideAlert = () => {
        setShowAlert(false);
    };

    const { loading } = useSelector(state => state.alerts)
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();


        //Errors
        setNameError("");
        setEmailError("");
        setPasswordError("");


        let isValid = true;
        if (!userType) {
            setusertypeError("User Type is required");
            isValid = false;
        }

        if (!name.trim()) {
            setNameError("Name is required");
            isValid = false;
        }

        if (!email.trim()) {
            setEmailError("Email is required");
            isValid = false;
        }
        if (!Password.trim()) {
            setPasswordError("Password cant be Blank");
            isValid = false;
        }

        if (Password !== cpassword) {
            setPasswordError("Passwords do not match");
            isValid = false;
        }

        if (isValid) {

            dispatch(showLoading());

            await axios.post("https://drab-teal-lobster-kilt.cyclic.app/api/v1/auth/register", {
                userType: userType,
                name: name,
                email: email,
                Phone: Phone,
                Password: Password,

            }).then(function (res) {
                dispatch(hideLoading());
                if (res.status === 201) {
                    toast.success("User Registered Successfully");
                    Navigate('/Login')

                }
            }).catch(function (error) {
                toast.warning(error.response.data.message)
                dispatch(hideLoading());

            });



        }
    };

    return (

        <>


            {loading ? (<Spinner />) : (<> <Navbarall />
                <div className="container py-5 h-100 ">

                    <div className="row justify-content-center align-items-center h-100 ">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className="card shadow-2-strong card-registration formbackground">
                                <div className="card-body p-4 p-md-5">
                                    <center> <img src='/assets/images/JOBSHOP.png' alt='logo' height={200} width={200} /></center>
                                    <h5 className="mb-4 pb-2 pb-md-0 mb-md-5  "> <FontAwesomeIcon icon={faUser} />  &nbsp;   Create your account </h5>
                                    <Alert id="action" show={showAlert} onClose={handleHideAlert} variant="success" dismissible>
                                        User Created Succesfully
                                    </Alert>

                                    <form method='POST' onSubmit={handleSubmit}>


                                        <div className="col-md-6 mb-4">
                                            <p className="mb-2 pb-1">User Type:   &nbsp;  {usertypeError && <small className="text-danger">{usertypeError}</small>}</p>

                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="userType" defaultValue="Jobseeker" value={userType} onChange={(e) => {
                                                    setuserType("Jobseeker")
                                                }} />
                                                <label className="form-check-label" htmlFor="Jobseeker">Jobseeker</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="userType" defaultValue="Employer" value={userType} onChange={(e) => {
                                                    setuserType("Employer")
                                                }} />
                                                <label className="form-check-label" htmlFor="Employer">Employer</label>
                                            </div>

                                        </div>
                                        <div className="row">


                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="firstName"><FontAwesomeIcon icon={faSignature} />&nbsp; Name <span>*</span>   &nbsp;   {nameError && <small className="text-danger">{nameError}</small>}</label>
                                                    <input type="text" className="form-control form-control-lg" name='name' value={name} onChange={(e) => {
                                                        setname(e.target.value)
                                                    }} />

                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="Email">  <FontAwesomeIcon icon={faEnvelope} />&nbsp; Email<span>*</span> &nbsp;  {emailError && <small className="text-danger">{emailError}</small>} </label>
                                                    <input type="email" className="form-control form-control-lg" name='email' value={email} onChange={(e) => {
                                                        setemail(e.target.value);
                                                    }} />

                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4 d-flex align-items-center">
                                                <div className="form-outline datepicker w-100">
                                                    <input type="tel" className="form-control form-control-lg" name='Phone' value={Phone} onChange={(e) => {
                                                        setPhone(e.target.value);
                                                    }} />
                                                    <label htmlFor="Phone" className="form-label"> <FontAwesomeIcon icon={faPhone} />&nbsp;Phone (Optional)</label>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div className="form-outline">
                                                    <input id='Password' type="password" className="form-control form-control-lg" name='Password' value={Password} onChange={(e) => {
                                                        setPassword(e.target.value);
                                                    }} />
                                                    <label className="form-label" htmlFor="Password"><FontAwesomeIcon icon={faLock} />&nbsp;Password <span>*</span> &nbsp;  {passwordError && <small className="text-danger">{passwordError}</small>} </label>

                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div className="form-outline">
                                                    <input id='cpassword' type="password" className="form-control form-control-lg" name='cpassword' value={cpassword} onChange={(e) => {
                                                        setcpassword(e.target.value);
                                                    }} />
                                                    <label className="form-label" htmlFor="cpassword"><FontAwesomeIcon icon={faLock} />&nbsp;Confirm Password <span>*</span></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <p>
                                                Already Registered <Link className='notformbackground' to="/Login"><FontAwesomeIcon icon={faRightToBracket} />&nbsp;Login</Link>
                                            </p>
                                            <div className="mt-4 pt-2">
                                                <button className="btn btn-primary btn-lg" type="submit" > &nbsp;Register </button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footerall /> </>)}

        </>
    )


}



export default Register
