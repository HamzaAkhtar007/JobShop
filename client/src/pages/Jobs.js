import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/features/Auth/AuthSlice';
import { Navigate } from 'react-router-dom';
import Table from '../components/shared/Table';
import axios from 'axios';

const Jobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.presistedReducer.auth);
    const [jobsdata, setjobsdata] = useState(null);


    const GETALLUSER = async () => {

        if (user.userType === 'Admin') {
            let res = await axios.post("http://localhost:5000/api/v1/job/alljobs", {
                token: localStorage.getItem('token')
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }).then(function (res) {
                console.log(res.data.data)
                setjobsdata(res.data.data);
            }).catch(function (error) {
                <Navigate to="/Login" />
            });
        }
        else {
            let res = await axios.post("http://localhost:5000/api/v1/job/get-jobs", {
                token: localStorage.getItem('token'),
                userId: user._id,
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }).then(function (res) {
                console.log(res.data.data)
                setjobsdata(res.data.data);
            }).catch(function (error) {
                <Navigate to="/Login" />
            });
        }


    }

    const signout = () => {
        dispatch(setUser(null));
        localStorage.clear();
        <Navigate to="/Login" />
    }
    useEffect(() => {
        if (!jobsdata) {
            GETALLUSER();
        }
    }, [jobsdata]);


    return (
        <>
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow" >
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href='/'  >{user.name}</a>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <input className="form-control  w-100" type="text" placeholder="Search" aria-label="Search" />
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <a className="btn btn-md px-3 text-danger" onClick={signout} >Sign out</a>
                    </div>
                </div>
            </header>
            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link " aria-current="page" href="/dashboard">
                                        <span data-feather="home" />
                                        Dashboard
                                    </a>
                                </li>
                                {(user.userType === 'Admin') ? (<li className="nav-item">
                                    <a className="nav-link" href="/user">
                                        <span data-feather="file" />
                                        Users
                                    </a>
                                </li>) : (<></>)}
                                <li className="nav-item">
                                    <a className="nav-link " href="/companies">
                                        <span data-feather="shopping-cart" />
                                        Companies
                                    </a>
                                </li>
                                <li className="nav-item " >
                                    <a className="nav-link active" href="/jobs">
                                        <span data-feather="users" />
                                        Jobs
                                    </a>
                                </li>


                            </ul>
                            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                <span>My profile</span>
                                <a className="link-secondary" href="#" aria-label="Add a new report">
                                    <span data-feather="plus-circle" />
                                </a>
                            </h6>

                        </div>
                    </nav>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">JOBS</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                    <a type="button" href='/addjob' className="btn btn-sm btn-primary ">Add New Job</a>

                                </div>

                            </div>
                        </div>
                        <Table headers={["jobTitle", "jobType", "Category", "MinSalary", 'MaxSalary', "ContactEmail", "City", "tags"]} data={jobsdata} />


                    </main>
                </div>
            </div>
        </>
    )
}

export default Jobs


