import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Navigate } from 'react-router-dom';
import { setUser } from '../../redux/features/Auth/AuthSlice';
import { NavDropdown } from 'react-bootstrap';
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const AdminSharedDashbaord = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.presistedReducer.auth);
    const signout = () => {
        dispatch(setUser(null));
        localStorage.clear();
        <Navigate to="/Login" />
    }
    return (
        <>
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href='/' >{user.name}</a>
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
                                    <a className="nav-link" href="/companies">
                                        <span data-feather="shopping-cart" />
                                        Companies
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/jobs">
                                        <span data-feather="users" />
                                        Jobs
                                    </a>
                                </li>
                                <h4 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">

                                    My Profile
                                </h4>
                                <li>
                                    <NavDropdown title="Profile" id="nav-dropdown" className="me-3 ms-3">

                                        <NavDropdown.Item href="/update/:id"><FontAwesomeIcon icon={faUser} /> Update</NavDropdown.Item>

                                    </NavDropdown>
                                </li>

                            </ul>


                        </div>
                    </nav>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Dashboard</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                                </div>
                                <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                                    <span data-feather="calendar" />
                                    This week
                                </button>
                            </div>
                        </div>


                    </main>
                </div>
            </div>
        </>
    )
}

export default AdminSharedDashbaord
