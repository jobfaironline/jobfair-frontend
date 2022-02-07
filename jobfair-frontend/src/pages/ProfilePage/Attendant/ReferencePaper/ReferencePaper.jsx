import React, {useEffect, useState} from 'react';
import {Card, CardActions, CardContent, CardHeader, Collapse, Typography} from "@mui/material";
import {Col, Container, Row} from "react-grid-system";
import styles from "../ProfilePage.module.scss";
import {Input} from "antd";
import {convertToDateString, ExpandMore} from "../../../../utils/common";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ReferencePaper = ({isShow, title, initData}) => {
    const [id, setId] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [position, setPosition] = useState("");

    const [reference, setReference] = useState(initData);
    const [enable, setEnable] = useState(isShow);
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        handleSetValues(reference);
    }, [initData])

    const handleSetValues = (data) => {
        if (data !== undefined) {
            setId(data.id);
            setCompany(data.company);
            setEmail(data.email);
            setFullname(data.fullname);
            setPhone(data.phone);
            setPosition(data.position);
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
                        Email: {email}
                    </Typography>
                    <Typography>
                        Full name: {fullname}
                    </Typography>
                    <Typography>
                        Phone: {phone}
                    </Typography>
                    <Typography>
                        Position: {position}
                    </Typography>
                    <Typography>
                        Company: {company}
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
                                           setCompany(e.target.value.trim());
                                       }}
                                       className={styles.input}/>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="email" className={styles.label}>Email: </label> <br/>
                                <Input name="email"
                                       value={email}
                                       type="text"
                                       onChange={e => {
                                           setEmail(e.target.value.trim())
                                       }}
                                       className={styles.input}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="fullname" className={styles.label}>Full Name: </label> <br/>
                                <Input name="fullname" type="text"
                                       value={fullname}
                                       onChange={e => {
                                           setFullname(e.target.value.trim())
                                       }}
                                       className={styles.input}/>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="position" className={styles.label}>Position: </label> <br/>
                                <Input name="position"
                                       value={position}
                                       type="text"
                                       onChange={e => {
                                           setPosition(e.target.value.trim())
                                       }}
                                       className={styles.input}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="phone" className={styles.label}>Phone: </label> <br/>
                                <Input name="phone"
                                       type="text"
                                       value={phone}
                                       onChange={e => {
                                           setPhone(e.target.value.trim())
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


export default ReferencePaper;