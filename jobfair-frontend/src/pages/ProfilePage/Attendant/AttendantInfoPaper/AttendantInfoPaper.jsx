import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-grid-system";
import styles from "../ProfilePage.module.scss";
import {Input} from "antd";
import {
    countryConst,
    jobLevelConst,
    maritalStatusConst,
    residenceConst
} from "../../../../constants/AppConst";
import {convertToDateString, ExpandMore} from "../../../../utils/common";
import Dropdown from "../../../../components/react-hook-form/dropdown/Dropdown";
import {Card, CardActions, CardContent, CardHeader, Collapse, Rating, Typography} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AttendantInfoPaper = ({initData, isShow, header}) => {
    const [address, setAddress] = useState("");
    const [title, setTitle] = useState("");
    const [yearOfExp, setYearOfExp] = useState(0);
    const [jobTitle, setJobTitle] = useState("");
    const [dob, setDob] = useState(0);
    const [countryId, setCountryId] = useState("");
    const [residenceId, setResidenceId] = useState("");
    const [jobLevelValue, setJobLevelValue] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [enable, setEnable] = useState(isShow);
    const [expanded, setExpanded] = useState(false);

    //life cycle
    useEffect(() => {
        handleSetValues(initData);
    }, [initData])

    //function
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleSetValues = (values) => {
        setAddress(values.address);
        setTitle(values.title);
        setYearOfExp(values.yearOfExp);
        setJobTitle(values.jobTitle);
        setDob(values.dob);
        setCountryId(values.countryId);
        setResidenceId(values.residenceId);
        setJobLevelValue(values.jobLevel);
        setMaritalStatus(values.maritalStatus);
    }

    return (
        enable === true ?
            <Card sx={{maxWidth: 1500}}>
                <CardHeader title={header}/>
                <CardContent>
                    <Row>
                        <Col sm={3}>
                            <Typography>
                                Address: {address}
                            </Typography>
                            <Typography>
                                Title: {title}
                            </Typography>
                        </Col>
                        <Col sm={3}>
                            <Typography>
                                Year of experience: {yearOfExp}
                            </Typography>
                            <Typography>
                                {dob == null
                                ? `Date of birth - default: ${convertToDateString(dob)}`
                            : `Date of birth: ${convertToDateString(dob)}`}
                            </Typography>
                        </Col>
                    </Row>
                </CardContent>
                <CardActions disableSpacing>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon/>
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Container>
                        <Row>
                            <Col sm={6}>
                                <div className={styles.element_form}>
                                    <label htmlFor="address" className={styles.label}>Address: </label> <br/>
                                    <Input name="address"
                                           type="text"
                                           value={address}
                                           onChange={e => {
                                               setAddress(e.target.value)
                                           }}
                                           className={styles.input}/>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <div className={styles.element_form}>
                                    <label htmlFor="title" className={styles.label}>Title: </label> <br/>
                                    <Input name="title"
                                           type="text"
                                           value={title}
                                           onChange={e => {
                                               setTitle(e.target.value)
                                           }}
                                           className={styles.input}/>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className={styles.element_form}>
                                    <label htmlFor="yearOfExp" className={styles.label}>Year of experience: </label> <br/>
                                    <Input name="yearOfExp"
                                           type="text"
                                           value={yearOfExp}
                                           onChange={e => {
                                               setYearOfExp(e.target.value)
                                           }}
                                           className={styles.input}/>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <div className={styles.element_form}>
                                    <label htmlFor="jobTitle" className={styles.label}>Job title: </label> <br/>
                                    <Input name="jobTitle"
                                           type="text"
                                           value={jobTitle}
                                           onChange={e => {
                                               setJobTitle(e.target.value)
                                           }}
                                           className={styles.input}/>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className={styles.element_form}>
                                    <label htmlFor="dob" className={styles.label}>Date of birth: </label> <br/>
                                    <Input name="dob"
                                           type="date"
                                           value={convertToDateString(dob)}
                                           onChange={e => {
                                               setDob(e.target.value)
                                           }}
                                           className={styles.input}/>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <div className={styles.element_form}>
                                    <label htmlFor="countryId" className={styles.label}>Country: </label> <br/>
                                    <Dropdown options={countryConst} currentValue={countryId}/>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <label htmlFor="residenceId" className={styles.label}>Residence: </label> <br/>
                                <Dropdown options={residenceConst} currentValue={residenceId}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <label htmlFor="jobLevel" className={styles.label}>Job Level: </label> <br/>
                                <Dropdown options={jobLevelConst} currentValue={jobLevelValue}/>
                            </Col>
                            <Col sm={6}>
                                <label htmlFor="marital" className={styles.label}>Marital: </label> <br/>
                                <Dropdown options={maritalStatusConst} currentValue={maritalStatus}/>
                            </Col>
                        </Row>
                    </Container>
                </Collapse>
            </Card> : null
    );
};


export default AttendantInfoPaper;