import React, { useState } from 'react'
import Inputform from '../components/shared/Inputform.js';
import { Link } from 'react-router-dom';
import Navbarall from '../components/shared/Navbarall.js';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Footerall from "../components/shared/Footerall.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios"
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/AlertSlice.js';
import Spinner from '../components/shared/Spinner.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/features/Auth/AuthSlice.js';

const Login = () => {
    let [email, setemail] = useState("");
    let [Password, setPassword] = useState("");
    let [emailError, setEmailError] = useState("");
    let [passwordError, setPasswordError] = useState("");
    const { loading } = useSelector(state => state.alerts)

    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");
        let isValid = true;

        if (!email.trim()) {
            setEmailError("Email is required");
            isValid = false;
        }
        if (!Password) {
            setPasswordError("Password cant be Blank");
            isValid = false;
        }


        if (isValid) {

            dispatch(showLoading());
            await axios.post("http://localhost:5000/api/v1/auth/login", {
                email,
                Password

            }).then(function (res) {

                dispatch(hideLoading());
                if (res.status === 200) {
                    toast.success("User Login Successfully");
                    localStorage.setItem("token", res.data.token)
                    dispatch(setUser(res.data.user))
                    Navigate('/dashboard')

                }

            }).catch(function (error) {

                console.log(error.response);
                toast.warning(error.response.data.message)
                dispatch(hideLoading());
            });











        }
    }
    return (
        <>
            {loading ? (<Spinner />) : (
                <>
                    <Navbarall />

                    <div className="container py-5 h-100 ">

                        <div className="row justify-content-center align-items-center h-100 ">
                            <div className="col-12 col-lg-9 col-xl-7">
                                <div className="card shadow-2-strong card-registration formbackground">
                                    <div className="card-body p-4 p-md-5">
                                        <center> <img src='/assets/images/JOBSHOP.png' alt='logo' height={200} width={200} /></center>
                                        <h5 className="mb-4 pb-2 pb-md-0 mb-md-5  ">Login</h5>

                                        <form onSubmit={handleSubmit} >


                                            <Inputform htmlfor="Email" labeltext={"Email"} type={"email"} name={"email"} value={email} handleChange={(e) => {
                                                setemail(e.target.value);
                                            }} icon={faEnvelope} errortype={emailError} />

                                            <Inputform htmlfor="Password" labeltext={"Password"} type={"Password"} name={"Password"} value={Password} handleChange={(e) => {
                                                setPassword(e.target.value);
                                            }} icon={faLock} errortype={passwordError} />
                                            <div className='d-flex justify-content-between'>
                                                <p >
                                                    Not a User <Link className='notformbackground' to="/register">Register Here</Link>
                                                </p>
                                                <div className="mt-4 pt-2">
                                                    <button className="btn btn-primary btn-lg" type="submit" >Login</button>
                                                </div>
                                            </div>

                                        </form>

                                        <div className=" justify-content-center align-items-center">
                                            <div className="col-xl-12 col-md-12 col-sm-12 col-12 btn btn-ggl ">
                                                <a className='notformbackground' href='/Login' title="Login with Google">
                                                    <FontAwesomeIcon icon={faGoogle} />  &nbsp;     Login with <strong>Google</strong>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <Footerall />
                </>)}
        </>
    )
}

export default Login;
