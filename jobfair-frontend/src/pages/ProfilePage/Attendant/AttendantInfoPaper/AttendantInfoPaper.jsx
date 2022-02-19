import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Col, Container, Row} from "react-grid-system";
import {Input} from "antd";
import {jobLevel} from "../../../../Constants/AppConst";
import styles from "../../ProfilePage.module.scss";

const AttendantInfoPaper = props => {
    const [accountId, setAccountId] = useState("");
    const [address, setAddress] = useState("");
    const [title, setTitle] = useState("");
    const [yearOfExp, setYearOfExp] = useState(0);
    const [jobTitle, setJobTitle] = useState("");
    const [dob, setDob] = useState("");
    const [countryId, setCountryId] = useState("");
    const [residenceId, setResidenceId] = useState("");
    const [jobLevelValue, setJobLevelValue] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const handleFormChange = (e, key) => {
        switch (key) {
            case "address":
                setAddress(e.target.value);
                console.log('address: ', e.target.value)
                break;
            case "title":
                setTitle(e.target.value);
                console.log('title: ', e.target.value)
                break;
            case "yearOfExp" :
                setYearOfExp(e.target.value);
                console.log('year of exp: ', e.target.value)
                break;
            case "jobTitle" :
                setJobTitle(e.target.value);
                console.log('job title: ', e.target.value)
                break;
            case "dob":
                const dobValue = Date.parse(e.target.value);
                setDob(e.target.value);
                console.log('dob value: ', dobValue)
                break;
            case "countryId":
                setCountryId(e.target.value);
                console.log('country id: ', e.target.value);
                break;
            case "residenceId":
                setResidenceId(e.target.value);
                console.log('residence id: ', e.target.value);
                break;
            case "jobLevel":
                setJobLevelValue(e.target.value);
                console.log('job level: ', e.target.value);
                break;
            case "marital":
                setMaritalStatus(e.target.value);
                console.log('marital: ', e.target.value);
                break;
        }
    }

    return (
        <Container>
            <Row>
                <Col sm={6}>
                    <div className={styles.element_form}>
                        <label htmlFor="address">Address: </label> <br/>
                        <Input name="address"
                               type="text"
                               value={address}
                               onChange={e => handleFormChange(e, "address")}
                               className={styles.input}/>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <div className={styles.element_form}>
                        <label htmlFor="title">Title: </label> <br/>
                        <Input name="title"
                               type="text"
                               value={title}
                               onChange={e => handleFormChange(e, "title")}
                               className={styles.input}/>
                    </div>
                </Col>
                <Col sm={6}>
                    <div className={styles.element_form}>
                        <label htmlFor="yearOfExp">Year of experience: </label> <br/>
                        <Input name="yearOfExp"
                               type="text"
                               value={yearOfExp}
                               onChange={e => handleFormChange(e, "yearOfExp")}
                               className={styles.input}/>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <div className={styles.element_form}>
                        <label htmlFor="jobTitle">Job title: </label> <br/>
                        <Input name="jobTitle"
                               type="text"
                               value={jobTitle}
                               onChange={e => handleFormChange(e, "jobTitle")}
                               className={styles.input}/>
                    </div>
                </Col>
                <Col sm={6}>
                    <div className={styles.element_form}>
                        <label htmlFor="dob">Date of birth: </label> <br/>
                        <Input name="dob"
                               type="date"
                               value={dob}
                               onChange={e => handleFormChange(e, "dob")}
                               className={styles.input}/>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <div className={styles.element_form}>
                        <label htmlFor="countryId">Country: </label> <br/>
                        <select id="countryId"
                                onChange={e => handleFormChange(e, "countryId")}
                                className={styles.gender_select}>
                            <option value="60ebd8bd-2b10-4d03-a3a4-ccfd0ab504d3"
                                    selected={countryId === "60ebd8bd-2b10-4d03-a3a4-ccfd0ab504d3"}>
                                Vietnam
                            </option>
                            <option value="31aefa5c-9d9f-49e0-bced-fe727434cb85"
                                    selected={countryId === "31aefa5c-9d9f-49e0-bced-fe727434cb85"}>
                                Portugal
                            </option>
                        </select>
                    </div>
                </Col>
                <Col sm={6}>
                    <label htmlFor="residenceId">Residence: </label> <br/>
                    <select id="residenceId"
                            onChange={e => handleFormChange(e, "residenceId")}
                            className={styles.gender_select}>
                        <option value="ddce0336-dd98-4ed4-88ad-b85f18001551"
                                selected={residenceId === "ddce0336-dd98-4ed4-88ad-b85f18001551"}>
                            Small village
                        </option>
                        <option value="e55c522a-b595-4992-a2a6-9abb9aa8cc69"
                                selected={residenceId === "e55c522a-b595-4992-a2a6-9abb9aa8cc69"}>
                            Apartment
                        </option>
                    </select>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <label htmlFor="jobLevel">Job Level: </label> <br/>
                    <select id="jobLevel"
                            onChange={e => handleFormChange(e, "jobLevel")}
                            className={styles.gender_select}>
                        {jobLevel.map(job => (<option value={job.id}>{job.name}</option>))}
                    </select>
                </Col>
                <Col sm={6}>
                    <label htmlFor="marital">Marital: </label> <br/>
                    <select id="marital"
                            onChange={e => handleFormChange(e, "marital")}
                            className={styles.gender_select}>
                        <option value="MARRIED">Married</option>
                        <option value="SINGLE">Single</option>
                    </select>
                </Col>
            </Row>
        </Container>
    );
};

AttendantInfoPaper.propTypes = {

};

export default AttendantInfoPaper;