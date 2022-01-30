import React, {useState} from 'react';
import {Card, CardHeader} from "@mui/material";
import {Col, Container, Row} from "react-grid-system";
import styles from "../ProfilePage.module.scss";
import {Input} from "antd";

const ActivityPaper = ({isShow, title}) => {
    const [description, setDescription] = useState();
    const [fromDate, setFromDate] = useState(0);
    const [functionTitle, setFunctionTitle] = useState("");
    const [isCurrentActivity, setIsCurrentActivity] = useState(false);
    const [name, setName] = useState("");
    const [organization, setOrganization] = useState("");
    const [toDate, setToDate] = useState(0);


    const handleFormChange = (e, key) => {
        switch (key) {
            case "description":
                setDescription(e.target.value);
                break;
            case "fromDate":
                setFromDate(e.target.value);
                break;
            case "functionTitle":
                setFunctionTitle(e.target.value)
                break;
            case "isCurrentActivity":
                setIsCurrentActivity(e.target.value)
                break;
            case "name":
                setName(e.target.value)
                break;
            case "organization":
                setOrganization(e.target.value);
                break;
            case "toDate":
                setToDate(e.target.value);
                break;
        }
    }

    return (
        isShow ? <Card sx={{maxWidth: 1500}}>
            <CardHeader title={title}/>
            <Container>
                <Row>
                    <Col sm={6}>
                        <div className={styles.element_form}>
                            <label htmlFor="description">Description: </label> <br/>
                            <Input name="description"
                                   type="text"
                                   value={description}
                                   onChange={e => handleFormChange(e, "description")}
                                   className={styles.input}/>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className={styles.element_form}>
                            <label htmlFor="functionTitle">Function title: </label> <br/>
                            <Input name="functionTitle"
                                   value={functionTitle}
                                   type="text"
                                   onChange={e => handleFormChange(e, "functionTitle")}
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
                            <label htmlFor="name">Name: </label> <br/>
                            <Input name="name"
                                   value={name}
                                   type="text"
                                   onChange={e => handleFormChange(e, "name")}
                                   className={styles.input}/>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className={styles.element_form}>
                            <label htmlFor="organization">Organization: </label> <br/>
                            <Input name="organization"
                                   value={organization}
                                   type="text"
                                   onChange={e => handleFormChange(e, "organization")}
                                   className={styles.input}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className={styles.element_form}>
                            <label htmlFor="isCurrentActivity">Is current activity?: </label> <br/>
                            <select id="isCurrentActivity"
                                    onChange={e => handleFormChange(e, "isCurrentActivity")}
                                    className={styles.gender_select}>
                                <option value="true" selected={isCurrentActivity === true}>
                                    Yes
                                </option>
                                <option value="false" selected={isCurrentActivity === false}>
                                    No
                                </option>
                            </select>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Card> : null
    );
};



export default ActivityPaper;