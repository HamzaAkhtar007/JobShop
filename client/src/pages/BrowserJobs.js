import React, { useState, useEffect } from 'react'
import Navbarall from './../components/shared/Navbarall';
import Footerall from './../components/shared/Footerall';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../components/shared/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faClock, faEnvelope, faMapLocation, faMapMarker, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
const BrowserJobs = () => {
    const { id }: { id: string } = useParams();
    const [companyData, setCompanyData] = useState("");
    const [job, setjob] = useState("");
    const [img, setimg] = useState([])
    const [date, setdate] = useState("");
    let [paragraphsWithBreaks, setparagraphsWithBreaks] = useState("");
    const data = async () => {

        const res = await axios.post("http://localhost:5000/api/v1/job/findonejob", {
            _id: id

        })
        console.log(res);
        setjob(res.data.job[0]);
        console.log(res.data.job[0].createdby)
        const result = await axios.post("http://localhost:5000/api/v1/company/get-comapny", {
            createdby: res.data.job[0].createdby,
        })

        setCompanyData(result.data.companyname)
        setimg(require("../../../server/public/companylogos/" + result.data.companyname.logo))

        const timestamp = res.data.job[0].createdAt;
        const dateObject = new Date(timestamp);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        const formattedDate = dateObject.toLocaleDateString(undefined, options);
        setdate(formattedDate);
        const paragraphs = res.data.job[0].jobdescription.split('\n'); // Split into paragraphs



        const para = paragraphs.map((paragraph, paragraphIndex) => {
            const sentences = paragraph.split('.'); // Split each paragraph into sentences

            const sentencesWithBreaks = sentences.map((sentence, sentenceIndex) => {
                const sentenceWithBreaks = sentence.trim() + (sentenceIndex < sentences.length - 1 ? '.<br />' : ''); // Add <br> after each period except the last one

                return <p key={`s${sentenceIndex}-${paragraphIndex}`} dangerouslySetInnerHTML={{ __html: sentenceWithBreaks }} />;
            });

            return (
                <div key={`p${paragraphIndex}`}>
                    {sentencesWithBreaks}
                </div>
            );

        });
        setparagraphsWithBreaks(para)

    };
    useEffect(() => {
        if (!job) {

            data();
        }


    });

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
                                <li class="breadcrumb-item text-white"><a href="/">Home /</a></li>

                                <li class="breadcrumb-item text-white active" aria-current="page">Job Detail</li>
                            </ol>
                        </nav>
                    </div>
                </div>



                <div className="container-xxl py-5 wow fadeInUp " data-wow-delay="0.1s">
                    <div className="container">
                        <div className="row gy-5 gx-4">
                            <div className="col-lg-8">
                                <div className="d-flex align-items-center mb-5">
                                    <img classname="flex-shrink-0 img-fluid border rounded" src={img} alt="logo" style={{ width: 100, height: 100 }} />

                                    <div className=" ps-4">
                                        <h3 className="mb-3">{job.jobTitle}</h3>
                                        <span className="text-truncate me-3 text-primary">&nbsp; &nbsp;<FontAwesomeIcon icon={faMapLocation} /></span>{job.City}&nbsp;
                                        <span className="text-truncate me-3 text-primary">&nbsp;&nbsp;<FontAwesomeIcon icon={faClock} /></span>{job.jobType}&nbsp;
                                        <span className="text-truncate me-0 text-primary">&nbsp;&nbsp;<FontAwesomeIcon icon={faMoneyBill} /></span>${job.MinSalary} - ${job.MaxSalary}&nbsp;
                                        <span className="text-truncate me-0 text-primary">&nbsp;&nbsp;<FontAwesomeIcon icon={faEnvelope} /></span>{job.ContactEmail}&nbsp;
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <h4 className="mb-3">Job description</h4>
                                    <p className='para'> {paragraphsWithBreaks}</p>

                                </div>

                            </div> <div class="col-lg-4 ">
                                <div class="bg-light rounded p-5 mb-4 wow slideInUp text-primary-back" data-wow-delay="0.1s">
                                    <h4 class="mb-4">Job Summery</h4>
                                    <p>  <span className="text-truncate me-3 text-primary">&nbsp; &nbsp;<FontAwesomeIcon icon={faArrowRight} /></span>Published On: {date}</p>

                                    <p><span className="text-truncate me-3 text-primary">&nbsp; &nbsp;<FontAwesomeIcon icon={faArrowRight} /></span>Job Nature:{job.jobType} </p>
                                    <p><span className="text-truncate me-3 text-primary">&nbsp; &nbsp;<FontAwesomeIcon icon={faArrowRight} /></span>${job.MinSalary} - ${job.MaxSalary}</p>
                                    <p><span className="text-truncate me-3 text-primary">&nbsp; &nbsp;<FontAwesomeIcon icon={faArrowRight} /></span>Location: {job.City}</p>

                                </div>

                                <div class="bg-light rounded p-5 wow slideInUp text-primary-back" data-wow-delay="0.1s">
                                    <h4 class="mb-4">{companyData.name}</h4>
                                    <p class="m-0">{companyData.description}</p>
                                </div>
                            </div></div></div></div>

                <Footerall />
            </>
        )
    }
}

export default BrowserJobs
