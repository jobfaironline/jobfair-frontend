import React, {useEffect, useState} from 'react';
import {Card, CardActions, CardContent, CardHeader, Collapse, Rating, Typography} from "@mui/material";
import {Col, Container, Row} from "react-grid-system";
import styles from "../ProfilePage.module.scss";
import {Input} from "antd";
import {convertToDateString, convertToDateValue, ExpandMore} from "../../../../utils/common";
import {maritalStatusConst, qualificationConst, YesNoConst} from "../../../../constants/AppConst";
import FromToDate from "../FromToDate";
import Dropdown from "../../../../components/react-hook-form/dropdown/Dropdown";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const EducationPaper = ({isShow, title, initData}) => {
    const [id, setId] = useState("")
    const [achievement, setAchievement] = useState("");
    const [fromDate, setFromDate] = useState(0);
    const [toDate, setToDate] = useState(0);
    const [qualification, setQualification] = useState("");
    const [school, setSchool] = useState("");
    const [subject, setSubject] = useState("");

    const [education, setEducation] = useState(initData);
    const [enable, setEnable] = useState(isShow);
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        handleSetValues(education)
    },[initData])

    const handleSetValues = (data) => {
        if (data !== undefined) {
            setId(data.id);
            setAchievement(data.achievement);
            setFromDate(data.fromDate);
            setToDate(data.toDate);
            setQualification(data.qualification);
            setSchool(data.school);
            setSubject(data.subject);
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
                        School: {school}
                    </Typography>
                    <Typography>
                        Subject: {subject}
                    </Typography>
                    <Typography>
                        Achievement: {achievement}
                    </Typography>
                    <Typography>
                        Qualification: {qualification}
                    </Typography>
                    <Typography>
                        From: {convertToDateString(fromDate)} - To: {convertToDateString(toDate)}
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
                                <label htmlFor="achievement" className={styles.label}>Achievement: </label> <br/>
                                <Input name="achievement"
                                       type="text"
                                       value={achievement}
                                       onChange={e => {
                                           setAchievement(e.target.value)
                                       }}
                                       className={styles.input}/>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="qualification" className={styles.label}>Qualification: </label> <br/>
                                <Dropdown options={qualificationConst} id="qualification" currentValue={qualification}/>
                            </div>
                        </Col>
                    </Row>
                   <FromToDate fromDate={fromDate} toDate={toDate}/>
                    <Row>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="school" className={styles.label}>School: </label> <br/>
                                <Input name="school"
                                       type="text"
                                       value={school}
                                       onChange={e => {
                                           console.log(e.target.value)
                                           setSchool(e.target.value)
                                       }}
                                       className={styles.input}/>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="subject" className={styles.label}>Subject: </label> <br/>
                                <Input name="subject"
                                       value={subject}
                                       type="text"
                                       onChange={e => {
                                           setSubject(e.target.value)
                                       }}
                                       className={styles.input}/>
                            </div>
                        </Col>
                    </Row>
                </Container>
                </Collapse>
            </Card> : null
    );
};



export default EducationPaper;