import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-grid-system";
import styles from "../ProfilePage.module.scss";
import {Input} from "antd";
import {Card, CardActions, CardContent, CardHeader, Collapse, IconButton, styled, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {convertToDateString, convertToDateValue, ExpandMore} from "../../../../utils/common";
import FromToDate from "../FromToDate";
import Dropdown from "../../../../components/react-hook-form/dropdown/Dropdown";
import {YesNoConst} from "../../../../constants/AppConst";

const WorkHistoryPaper = ({title, isShow, initData}) => {
    const [id, setId] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [fromDate, setFromDate] = useState(0);
    const [isCurrentJob, setIsCurrentJob] = useState(false);
    const [position, setPosition] = useState("");
    const [toDate, setToDate] = useState(0);

    const [workHistory, setWorkHistory] = useState(initData);
    const [enable, setEnable] = useState(isShow);
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        handleSetValues(workHistory);
        // console.log(convertToDateString(toDate))
    }, [initData])

    const handleSetValues = (data) => {
        if (data !== undefined) {
            setId(data.id);
            setCompany(data.company)
            setDescription(data.description)
            setFromDate(data.fromDate)
            setToDate(data.toDate)
            setIsCurrentJob(data.isCurrentJob)
            setPosition(data.position)
        }
    }

    const handleDelete = (e) => {
        let confirmMsg = "Are you sure to remove?";
        if (window.confirm(confirmMsg)) {
            setEnable(!isShow);
        }
    }

    return (
        enable ?
            <Card sx={{maxWidth: 1500}}>
                <CardHeader title={title}/>
                <CardContent>
                    <Input name="id"
                           type="hidden"
                           value={id}
                           className={styles.input}
                    />
                    <Typography>
                        Company name: {company}
                    </Typography>
                    <Typography>
                        Position: {position}
                    </Typography>
                    <Typography>
                        From: {convertToDateString(fromDate)} - To: {convertToDateString(toDate)}
                    </Typography>
                    <Typography>
                        Current job ?: {isCurrentJob ? 'Yes' : 'No' }
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <DeleteOutlinedIcon onClick={e => handleDelete(e)}/>
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
                                    <label htmlFor="company" className={styles.label}>Company: </label> <br/>
                                    <Input name="company"
                                           type="text"
                                           value={company}
                                           onChange={e => {
                                               setCompany(e.target.value)
                                           }}
                                           className={styles.input}/>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className={styles.element_form}>
                                    <label htmlFor="description" className={styles.label}>Description: </label> <br/>
                                    <Input name="description"
                                           value={description}
                                           type="text"
                                           onChange={e => {
                                               setDescription(e.target.value)
                                           }}
                                           className={styles.input}/>
                                </div>
                            </Col>
                        </Row>
                        <FromToDate fromDate={fromDate} toDate={toDate}/>
                        <Row>
                            <Col sm={6}>
                                <div className={styles.element_form}>
                                    <label htmlFor="position" className={styles.label}>Position: </label> <br/>
                                    <Input name="position"
                                           value={position}
                                           type="text"
                                           onChange={e => {
                                               setPosition(e.target.value)
                                           }}
                                           className={styles.input}/>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className={styles.element_form}>
                                    <label htmlFor="isCurrentJob" className={styles.label}>Is current job?: </label> <br/>
                                    <Dropdown options={YesNoConst} id="isCurrentJob" currentValue={isCurrentJob}/>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Collapse>
            </Card> : null
    );
};


export default WorkHistoryPaper;