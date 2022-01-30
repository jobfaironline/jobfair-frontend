import React, {useState} from 'react';
import {Card, CardHeader} from "@mui/material";
import {Col, Container, Row} from "react-grid-system";
import styles from "../ProfilePage.module.scss";
import {Input} from "antd";

const EducationPaper = ({isShow, title}) => {
    const [achievement, setAchievement] = useState("");
    const [fromDate, setFromDate] = useState(0);
    const [toDate, setToDate] = useState(0);
    const [qualification, setQualification] = useState("");
    const [school, setSchool] = useState("");
    const [subject, setSubject] = useState("");

    const handleFormChange = (e,key) => {
        switch (key) {
            case "achievement":
                setAchievement(e.target.value)
                break;
            case "fromDate":
                setFromDate(e.target.value);
                break;
            case "toDate":
                setToDate(e.target.value);
                break;
            case "qualification":
                setQualification(e.target.value);
                break;
            case "school":
                setSchool(e.target.value);
                break;
            case "subject":
                setSubject(e.target.value);
                break;
        }
    }

    return (
        isShow ?
            <Card sx={{maxWidth: 1500}}>
                <CardHeader title={title}/>
                <Container>
                    <Row>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="achievement">Achievement: </label> <br/>
                                <Input name="achievement"
                                       type="text"
                                       value={achievement}
                                       onChange={e => handleFormChange(e, "achievement")}
                                       className={styles.input}/>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="qualification">Qualification: </label> <br/>
                                <Input name="qualification"
                                       value={qualification}
                                       type="text"
                                       onChange={e => handleFormChange(e, "qualification")}
                                       className={styles.input}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="fromDate">From date: </label> <br/>
                                <Input name="fromDate" type="date"
                                       value={fromDate}
                                       onChange={e => handleFormChange(e, "fromDate")}
                                       className={styles.input}/>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="toDate">To date: </label> <br/>
                                <Input name="toDate"
                                       value={toDate}
                                       type="date"
                                       onChange={e => handleFormChange(e, "toDate")}
                                       className={styles.input}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="school">School: </label> <br/>
                                <Input name="school"
                                       type="text"
                                       value={school}
                                       onChange={e => handleFormChange(e, "school")}
                                       className={styles.input}/>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="subject">Subject: </label> <br/>
                                <Input name="subject"
                                       value={subject}
                                       type="text"
                                       onChange={e => handleFormChange(e, "subject")}
                                       className={styles.input}/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Card> : null
    );
};



export default EducationPaper;