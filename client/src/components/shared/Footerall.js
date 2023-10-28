import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useSelector } from 'react-redux';
const Footerall = () => {
    const { user } = useSelector((state) => state.presistedReducer.auth);
    const token = localStorage.getItem('token');
    return (
        <>

            <footer className="main-footer mt-5">
                <div className="footer-content">
                    <Container>
                        <Row className="row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2 g-3">
                            <Col>
                                <div className="footer-col">
                                    <h4 className="footer-title ">About us</h4>
                                    <ul className="list-unstyled footer-nav">
                                        <li>

                                            <a className='colortext ' href="#">FAQ</a>
                                        </li>
                                        <li>
                                            <a className='colortext' href="#">Terms</a>
                                        </li>
                                        <li>
                                            <a className='colortext' href="#">Privacy</a>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col>
                                <div className="footer-col">
                                    <h4 className="footer-title">Contact &amp; Sitemap</h4>
                                    <ul className="list-unstyled footer-nav">
                                        <li>
                                            <a className='colortext' href="">Contact Us</a>
                                        </li>
                                        <li>
                                            <a className='colortext' href="">About Us </a>
                                        </li>

                                    </ul>
                                </div>
                            </Col>
                            {(!token) ? (<Col>
                                <div className="footer-col">
                                    <h4 className="footer-title">My Account</h4>
                                    <ul className="list-unstyled footer-nav">
                                        <li>
                                            <a href="/Login" className='colortext' >
                                                Log In
                                            </a>
                                        </li>
                                        <li>
                                            <a className='colortext' href="/register">Register</a>
                                        </li>
                                    </ul>
                                </div>
                            </Col>) : (<></>)}

                            <Col>
                                <div className="footer-col row">
                                    <div className="col-sm-12 col-6 p-lg-0">
                                        <div className="">
                                            <h4 className="footer-title">Follow us on</h4>
                                            <ul className="list-unstyled list-inline mx-0 footer-nav social-list-footer social-list-color footer-nav-inline">
                                                <li>
                                                    <a
                                                        className=" colortext"
                                                        data-bs-placement="top"
                                                        data-bs-toggle="tooltip"
                                                        href="#"
                                                        title=""
                                                        data-bs-original-title="Facebook"
                                                    >
                                                        <FontAwesomeIcon icon={faFacebook} />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="colortext"
                                                        data-bs-placement="top"
                                                        data-bs-toggle="tooltip"
                                                        href="#"
                                                        title=""
                                                        data-bs-original-title="Twitter"
                                                    >
                                                        <FontAwesomeIcon icon={faTwitter} />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="colortext"
                                                        data-bs-placement="top"
                                                        data-bs-toggle="tooltip"
                                                        href="#"
                                                        title=""
                                                        data-bs-original-title="Linkedin"
                                                    >
                                                        <FontAwesomeIcon icon={faLinkedin} />
                                                    </a>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr className="border-0 bg-secondary" />
                                <div className="copy-info text-center mb-md-0 mb-3 mt-md-4 mt-3 pt-2">
                                    © 2023 Job Shop All Rights Reserved.
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </footer>

        </>
    );
}

export default Footerall
