import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableColumns, faUser, faPlus, faPenToSquare, faBuilding, faSearch, faGear, faDoorClosed } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setUser } from '../../redux/features/Auth/AuthSlice';


const Navbarall = () => {
    const { user } = useSelector((state) => state.presistedReducer.auth);
    const dispatch = useDispatch();
    const [formdata, setformdata] = useState({
        "jobTitle": "",
        "City": "",
    })
    const token = localStorage.getItem('token');
    const signout = () => {
        dispatch(setUser(null));
        localStorage.clear();
        <Navigate to="/Login" />
    }
    return (
        <Navbar bg="light" >
            <Container>

                <Navbar.Brand href="/">
                    <img
                        src="/assets/images/JOBSHOP.png"
                        alt="Your Logo"
                        height="70"
                    />



                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" />

                <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                    {/* Right-side elements */}
                    <Nav className="mr-auto">
                        <form>
                            <input name='jobTitle' value="" hidden></input>
                            <input name='City' value="" hidden></input>

                            <Link to="/searchresult" state={formdata} color='white'>       <Button variant="primary" name='jobTitle' className="me-2"><FontAwesomeIcon icon={faTableColumns} /> Browser Job</Button></Link>   </form>
                        {(token === null) ? (<NavDropdown title="Login" id="nav-dropdown" className="me-3 ms-3">

                            <NavDropdown.Item href="/Login"><FontAwesomeIcon icon={faUser} /> Login</NavDropdown.Item>
                            <NavDropdown.Item href="/register"><FontAwesomeIcon icon={faPlus} />Signup</NavDropdown.Item>
                        </NavDropdown>) : (<></>)}
                        {(user && user.type !== 'Jobseeker') ? (<NavDropdown title={user.name} id="nav-dropdown" className="me-3 ms-3">

                            <NavDropdown.Item href="/companies"><FontAwesomeIcon icon={faBuilding} /> My Companies</NavDropdown.Item>
                            <NavDropdown.Item href="/jobs"><FontAwesomeIcon icon={faSearch} />My Jobs</NavDropdown.Item>
                            <NavDropdown.Item href="/register"><FontAwesomeIcon icon={faGear} />My Account</NavDropdown.Item>
                            <NavDropdown.Item onClick={signout}><FontAwesomeIcon icon={faDoorClosed} />Sign Out</NavDropdown.Item>
                        </NavDropdown>) : (<></>)}

                        <Button type='submit' href='/addjob' variant="success"><FontAwesomeIcon icon={faPenToSquare} />  Create new job</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbarall
