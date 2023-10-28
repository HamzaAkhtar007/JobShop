import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Navbarall from './../components/shared/Navbarall';
import Footerall from './../components/shared/Footerall';
import axios from 'axios';
import { Container, Row, Form, Col, Button } from 'react-bootstrap';
import JobTemplate from '../components/shared/JobTemplate.js';
import ReactPaginate from 'react-paginate';
import Spinner from '../components/shared/Spinner';

const Country = require("country-state-city").Country
const Searchpage = () => {

    const location = useLocation();
    const [state, setLocationState] = useState({ FormData })
    const itemsPerPage = 10;
    let currentPage = 1;
    const [jobType, setjobType] = useState("")
    const [Category, setCategory] = useState("")
    const [pagecount, setpagecount] = useState(1);
    const [jobTitle, setjobTitle] = useState("");
    const [City, setCity] = useState("");
    const [job, setjob] = useState(null);
    const [cities, setCities] = useState([]);
    const load = async function () {


        const res = await axios.post(`http://localhost:5000/api/v1/job/search-job?page=${currentPage}&limit=${itemsPerPage}&jobTitle=${jobTitle}&City=${City}&Category=${Category}&jobType=${jobType}`)
        setjob(res.data.results.job);
        setpagecount(res.data.results.pagecount)


    }
    const handlePageClick = async (e) => {
        console.log(e);
        currentPage = e.selected + 1;
        await load();
    }
    const handlesubmit = async (e) => {
        e.preventDefault();

        load();
    }

    useEffect(() => {
        let state = location.state



        if (!job) {
            const cityData = Country.getAllCountries();
            setCities(cityData.map(city => city.name));
            setLocationState(state)
            setjobTitle(state.jobTitle)
            setCity(state.City)
            load();
        }
    })
    if (!job) {
        return <Spinner />
    }
    else {


        return (
            <>
                <Navbarall />
                <div class="container-fluid py-5  page-header mb-5 background">
                    <div class="container my-5 pt-5 pb-4">
                        <h1 class="display-3 text-white mb-3 animated slideInDown">Job Detail</h1>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb text-uppercase">
                                <li class="breadcrumb-item text-white"><a href="/">Home </a></li>

                                <li class="breadcrumb-item text-white active" aria-current="page">Search Result</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <Container className="mb-2 serp-search-bar">
                    <Form onSubmit={handlesubmit}>
                        <Row className="m-0">
                            <Col xl={2} md={3} sm={12} xs={12}>
                                <Form.Group controlId="catSearch">

                                    <Form.Control as="select" name="Category" onChange={(e) => {
                                        setCategory(e.target.value);
                                    }}>
                                        <option value="">All Categories</option>
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
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xl={3} md={4} sm={12} xs={12}>
                                <Form.Group controlId="keyword">

                                    <Form.Control type="text" name="jobTitle" placeholder="Job Title" onChange={(e) => {
                                        setjobTitle(e.target.value);
                                    }} />
                                </Form.Group>
                            </Col>
                            <input type="hidden" id="rSearch" name="r" value="" />
                            <input type="hidden" id="lSearch" name="l" value="" />
                            <Col xl={3} md={3} sm={12} xs={12} className="search-col locationicon">
                                <Form.Group controlId="catSearch">

                                    <select
                                        className="form-select form-select-lg"
                                        name="City"
                                        id='City'
                                        onChange={(e) => {
                                            setCity(e.target.value);
                                        }}
                                    >
                                        <option value="">Select location </option>
                                        {cities.map(city => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                </Form.Group>
                            </Col>
                            <Col xl={2} md={3} sm={12} xs={12}>
                                <Form.Group controlId="catSearch">

                                    <Form.Control as="select" name="jobType" onChange={(e) => {
                                        setjobType(e.target.value);
                                    }}>
                                        <option value="">Job Type</option>
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Temporary">Temporary</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                        <option value="Permanent">Permanent</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col xl={2} md={2} sm={12} xs={12}>
                                <Button variant="primary" type="submit" className="btn-block">
                                    Find
                                </Button>
                            </Col>
                        </Row>
                    </Form>


                    <Container className='card-body  p-4 p-md-5 '>
                        <div className='row pt-1 pb-1 ps-3 '>
                            <div className='col-10 fonts' >
                                Search Results
                            </div>
                        </div>
                        <Row>
                            <JobTemplate jobs={job} />
                        </Row>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pagecount}
                            previousLabel="< previous"
                            renderOnZeroPageCount={null}
                            containerClassName="pagination justify-content-center"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            activeClassName="active"
                            marginPagesDisplayed={2}
                        />
                    </Container>
                </Container>





                <Footerall />
            </>
        )
    }
}

export default Searchpage
