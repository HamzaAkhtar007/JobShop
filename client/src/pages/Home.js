import React, { useEffect, useState } from 'react';
import Navbarall from '../components/shared/Navbarall.js';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocation, faHeading, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import Footerall from "../components/shared/Footerall.js"
import JobTemplate from '../components/shared/JobTemplate.js';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Spinner from './../components/shared/Spinner';
import { Link } from 'react-router-dom';

const Homepage = () => {

    const [formdata, setformdata] = useState({
        "jobTitle": "",
        "City": "",
    })
    const [img1, setimg1] = useState([]);
    const [img2, setimg2] = useState([]);
    const [img3, setimg3] = useState([]);
    const [img4, setimg4] = useState([]);
    const [company, setcompany] = useState("");
    const [job, setjob] = useState(null);
    const [jobTitle, setjobTitle] = useState("")
    const [City, setCity] = useState("");
    const itemsPerPage = 10;
    let currentPage = 1;
    const [pagecount, setpagecount] = useState(1);
    const load = async function () {

        const res = await axios.post(`https://vercel.com/hamzaakhtar007s-projects/job-shop/37NfM4LHK727KoRsgQptx1vk7B5G/api/v1/job/search-job?page=${currentPage}&limit=${itemsPerPage}`)
        console.log(res.data.results);
        setjob(res.data.results.job);
        setpagecount(res.data.results.pagecount)
        const result = await axios.post(`http://localhost:5000/api/v1/company/allcompanies2`);
        console.log(result)

        setimg1(require("../../../server/public/companylogos/" + result.data.data[0].logo))
        setimg2(require("../../../server/public/companylogos/" + result.data.data[1].logo))
        setimg3(require("../../../server/public/companylogos/" + result.data.data[2].logo))
        setimg4(require("../../../server/public/companylogos/" + result.data.data[3].logo))

    }

    const handlePageClick = async (e) => {
        console.log(e);
        currentPage = e.selected + 1;
        await load();
    }

    useEffect(() => {
        if (!job) {
            load();

        }
    }, [job]);


    if (!job) {
        return <Spinner />
    }
    else {

        return (
            <>

                <Navbarall />
                <div className="background full-size-container">
                    <Container>



                        <Row>
                            <Col md={6}>
                                <InputGroup className="search-1">
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faHeading} />
                                    </InputGroup.Text>
                                    <FormControl type="text" placeholder="Job Title" name="jobTitle" value={formdata.jobTitle} onChange={(e) => {
                                        setformdata({ ...formdata, [e.target.name]: e.target.value })
                                    }} />
                                </InputGroup>
                            </Col>
                            <Col md={6}>
                                <InputGroup className="search-2">
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faLocation} />
                                    </InputGroup.Text>
                                    <FormControl type="text" placeholder="Location" name="City" value={formdata.City} onChange={(e) => {
                                        setformdata({ ...formdata, [e.target.name]: e.target.value })

                                    }} />
                                    <Link to="/searchresult" state={formdata} color='white'>      <Button className='me-3 ms-3' type="submit" variant="primary">Submit</Button></Link>
                                </InputGroup>
                            </Col>
                        </Row>

                    </Container>

                </div >



                <section className="bg-light content-visibility-auto pt-5">
                    <Container>
                        <div className="row space-top-lg space-bottom-lg">
                            <div className="col-sm-24">
                                <h3 className="text-center space-bottom-med text-hg">Join top employers currently hiring</h3>
                                <div className="container-xs-height container-height-med container-block space-bottom-med">
                                    <Row className="row-xs-height">
                                        <Col xs={3} className="col-xs-height col-middle">
                                            <a title="Coca Cola">
                                                <img
                                                    src={img1}
                                                    className="img-responsive center-block"
                                                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                                                    title="Coca Cola"
                                                    alt="Coca Cola"
                                                />
                                            </a>
                                        </Col>
                                        <Col xs={3} className="col-xs-height col-middle">
                                            <a title="Coca Cola">
                                                <img
                                                    src={img2}
                                                    className="img-responsive center-block"
                                                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                                                    title="Coca Cola"
                                                    alt="Coca Cola"
                                                />
                                            </a>
                                        </Col>
                                        <Col xs={3} className="col-xs-height col-middle">
                                            <a title="Coca Cola">
                                                <img
                                                    src={img3}
                                                    className="img-responsive center-block"
                                                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                                                    title="Coca Cola"
                                                    alt="Coca Cola"
                                                />
                                            </a>
                                        </Col>
                                        <Col xs={3} className="col-xs-height col-middle">
                                            <a title="Coca Cola">
                                                <img
                                                    src={img4}
                                                    className="img-responsive center-block"
                                                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                                                    title="Coca Cola"
                                                    alt="Coca Cola"
                                                />
                                            </a>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>







                        <div className="row pt-4 pb-4">
                            <div className="col-10">
                                <a href="/recruitment-solutions?path=join-top-employers " >
                                    <p>
                                        Is your company hiring?
                                        <span><FontAwesomeIcon icon={faAngleDoubleRight} classname="notformbackground">
                                        </FontAwesomeIcon> </span> </p>
                                </a>
                            </div>
                            <div className="col-2">
                                <a href="/companies">
                                    <p>
                                        More Companies
                                        <span><FontAwesomeIcon icon={faAngleDoubleRight} classname=" notformbackground">
                                        </FontAwesomeIcon> </span>  </p>
                                </a>
                            </div>
                        </div>


                    </Container>
                </section>


                <Container className='card-body  p-4 p-md-5 '>
                    <div className='row pt-1 pb-1 ps-3 jobhead'>
                        <div className='col-10 fonts' >
                            Latest<span className='fonts'> Jobs</span>
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





                <section

                    className="bg-cover content-visibility-auto jobbanner text-color pt-5 pb-5"
                >
                    <Container>
                        <Row className="space-top-sm space-bottom-sm">
                            <Col sm={{ offset: 2, span: 8 }} className="text-center">
                                <h3 className=" space-bottom-sm space-top-sm text-hg">Register now and let employers find you</h3>
                                <div className="space-top-sm space-bottom-sm">
                                    <span className="  text-hg text-primary text-elegant">60,000 &nbsp;</span>
                                    <span className=" text-xxl text-muted text-elegant spancolor">
                                        professionals get contacted by employers every <br />
                                        month through JobShop
                                    </span>
                                </div>
                                <div className=" space-bottom-sm text-hg text-muted text-elegant spancolor">
                                    Be the next one
                                    <div className="row">
                                        <div className="col-sm-8 col-sm-offset-8">
                                            <hr className="space-top-sm" />
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant="primary"
                                    className="ng-scope"
                                    href="/register"
                                    target="_blank"
                                >
                                    Register for Jobs
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <Footerall />

            </>
        );
    }
}
export default Homepage;
