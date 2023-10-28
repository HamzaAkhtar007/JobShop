import React, { useState } from 'react'
import Inputform from './Inputform';
import { faFont, faSignature } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Company = () => {
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [logo, setlogo] = useState(null);
    const [nameerror, setnamerror] = useState("");
    const [descriptionerorr, setdescriptionerror] = useState("");
    const [logoerorr, setlogoerror] = useState("");
    let { user } = useSelector((state) => state.presistedReducer.auth);
    const handleLogoChange = (e) => {
        const selectedFile = e.target.files[0]; // Only store the first selected file
        setlogo(selectedFile);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            setnamerror("Name is Required");
        }
        if (!description) {
            setdescriptionerror("Name is Required");
        }
        if (!logo) {
            setlogoerror("Logo is Required")
        }
        const formData = new FormData();
        formData.append('token', localStorage.getItem('token'));
        formData.append('name', name);
        formData.append('description', description);
        formData.append('logo', logo)
        formData.append('registeredBy', user._id)

        await axios.post("http://localhost:5000/api/v1/company/create-company",

            formData, {
            headers: {
                Authorization: localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            }
        }).then(function (res) {

            if (res.status === 201) {
                toast.success("Company Created Succesfully");
                <Navigate to="/addcompany" />
            }
            else {
                toast.error("Company Created Succesfully");
            }
        }).catch(function (error) {

            <Navigate to="/Login" />
        })

    };
    return (
        <>
            <div className="container py-5 h-100 ">

                <div className="row justify-content-center align-items-center h-100 ">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration formbackground">
                            <div className="card-body p-4 p-md-5">
                                <center> <img src='/assets/images/JOBSHOP.png' alt='logo' height={200} width={200} /></center>
                                <h5 className="mb-4 pb-2 pb-md-0 mb-md-5  ">Add Company </h5>

                                <form onSubmit={handleFormSubmit} encType="multipart/form-data" >


                                    <Inputform htmlfor="Name" labeltext={"Company Name"} type={"text"} name={"name"} value={name} handleChange={(e) => {
                                        setname(e.target.value);
                                    }} icon={faSignature} errortype={nameerror} />

                                    <Inputform htmlfor="description" labeltext={"Company Description"} type={"text"} name={"description"} value={description} handleChange={(e) => {
                                        setdescription(e.target.value);
                                    }} icon={faFont} errortype={descriptionerorr} />

                                    <Inputform
                                        htmlfor="logo"
                                        labeltext={"Company Logo"}
                                        type={"file"}
                                        name={"logo"}
                                        handleChange={handleLogoChange}
                                        icon={faFont}
                                        errortype={logoerorr}
                                    />
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

export default Company
