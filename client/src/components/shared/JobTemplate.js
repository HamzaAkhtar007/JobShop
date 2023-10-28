import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import BrowserJobs from '../../pages/BrowserJobs.js';

const JobTemplate = ({ jobs }) => {
    const [companyData, setCompanyData] = useState([]);

    useEffect(() => {
        const fetchCompanyData = async () => {
            const companyPromises = jobs.map(async (job) => {
                const res = await axios.post("http://localhost:5000/api/v1/company/get-comapny", {
                    createdby: job.createdby,
                });
                return res.data.companyname.name;
            });

            const companyNames = await Promise.all(companyPromises);
            setCompanyData(companyNames);
        };

        fetchCompanyData();
    }, [jobs]);

    return (
        <div>
            {jobs.map((job, index) => (
                <Card key={index} className="mb-4">
                    <Card.Body>
                        <Card.Title>{companyData[index]}</Card.Title>
                        <a href={'/browsejobs/' + job._id} > {job.jobTitle}</a>
                        <Card.Text>
                            <strong>Salary Range:</strong> ${job.MinSalary} - ${job.MaxSalary}
                        </Card.Text>
                        <Card.Text>
                            <strong>Location:</strong> {job.City}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default JobTemplate;
