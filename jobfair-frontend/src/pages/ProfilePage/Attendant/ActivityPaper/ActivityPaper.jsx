import React, {useEffect, useState} from 'react';
import {Card, CardActions, CardContent, CardHeader, Collapse, Typography} from "@mui/material";
import {Col, Container, Row} from "react-grid-system";
import styles from "../ProfilePage.module.scss";
import {Input} from "antd";
import {convertToDateString, convertToDateValue, ExpandMore} from "../../../../utils/common";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FromToDate from "../FromToDate";
import Dropdown from "../../../../components/react-hook-form/dropdown/Dropdown";
import {YesNoConst} from "../../../../constants/AppConst";

const ActivityPaper = ({isShow, title, initData}) => {
    const [id, setId] = useState("");
    const [description, setDescription] = useState();
    const [fromDate, setFromDate] = useState(0);
    const [functionTitle, setFunctionTitle] = useState("");
    const [isCurrentActivity, setIsCurrentActivity] = useState(false);
    const [name, setName] = useState("");
    const [organization, setOrganization] = useState("");
    const [toDate, setToDate] = useState(0);


    const [activity, setActivity] = useState(initData);
    const [enable, setEnable] = useState(isShow);
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        handleSetValues(activity);
    },[initData])

    const handleDelete = (e) => {
        let confirmMsg = "Are you sure to remove?";
        if (window.confirm(confirmMsg)) {
            setEnable(!isShow);
        }
    }

    const handleSetValues = (data) => {
        if (data !== undefined) {
            setId(data.id);
            setDescription(data.description);
            setFromDate(data.fromDate);
            setFunctionTitle(data.functionTitle);
            setIsCurrentActivity(data.isCurrentActivity);
            setName(data.name);
            setOrganization(data.organization);
            setToDate(data.toDate);
        }
    }

    return (
        enable ? <Card sx={{maxWidth: 1500}}>
            <CardHeader title={title}/>
            <CardContent>
                <Input name="id"
                       type="hidden"
                       value={id}
                       className={styles.input}
                />
                <Typography>
                    Name: {name}
                </Typography>
                <Typography>
                    From: {convertToDateString(fromDate)} - To: {convertToDateString(toDate)}
                </Typography>
                <Typography>
                    Current activity? : {isCurrentActivity ? 'Yes' : 'No'}
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
                            <label htmlFor="description" className={styles.label}>Description: </label> <br/>
                            <Input name="description"
                                   type="text"
                                   value={description}
                                   onChange={e => {
                                       setDescription(e.target.value.trim())
                                   }}
                                   className={styles.input}/>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className={styles.element_form}>
                            <label htmlFor="functionTitle" className={styles.label}>Function title: </label> <br/>
                            <Input name="functionTitle"
                                   value={functionTitle}
                                   type="text"
                                   onChange={e => {
                                       setFunctionTitle(e.target.value.trim())
                                   }}
                                   className={styles.input}/>
                        </div>
                    </Col>
                </Row>
                <FromToDate fromDate={fromDate} toDate={toDate}/>
                <Row>
                    <Col sm={6}>
                        <div className={styles.element_form}>
                            <label htmlFor="name" className={styles.label}>Name: </label> <br/>
                            <Input name="name"
                                   value={name}
                                   type="text"
                                   onChange={e => {
                                       setName(e.target.value.trim())
                                   }}
                                   className={styles.input}/>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className={styles.element_form}>
                            <label htmlFor="organization" className={styles.label}>Organization: </label> <br/>
                            <Input name="organization"
                                   value={organization}
                                   type="text"
                                   onChange={e => {
                                       setOrganization(e.target.value.trim())
                                   }}
                                   className={styles.input}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className={styles.element_form}>
                            <label htmlFor="isCurrentActivity" className={styles.label}>Is current activity?: </label> <br/>
                            <Dropdown options={YesNoConst} id="isCurrentActivity" currentValue={isCurrentActivity}/>
                        </div>
                    </Col>
                </Row>
            </Container>
            </Collapse>
        </Card> : null
    );
};



export default ActivityPaper;