import React, {useEffect, useState} from 'react';
import {Paper, Card, CardHeader} from "@mui/material";
import styles from "../ProfilePage.module.scss";
import {Col, Container, Row} from "react-grid-system";
import {Input} from "antd";

const SkillPaper = ({isShow, title}) => {
    const [name, setName] = useState("");
    const [proficiency, setProficiency] = useState(0);

    // useEffect(() => {
    //     console.log(isShow);
    // },[])

    const handleInputChange = (e, key) => {
        switch (key) {
            case "name":
                setName(e.target.value);
                console.log(e.target.value);
                break;
            case "proficiency":
                setProficiency(e.target.value);
                console.log(e.target.value);
                break
        }
    }
    return (
        isShow === true ?
        <Card sx={{maxWidth: 1500}}>
        {/*    can add image here by using
        <CardMedia*/}
        {/*    component="img"*/}
        {/*    height="140"*/}
        {/*    image="/static/images/cards/contemplative-reptile.jpg"*/}
        {/*    alt="green iguana"*/}
        {/*/>*/}
            <CardHeader title={title}/>
            <Container>
                <Row>
                    <Col sm={6}>
                        <div className={styles.element_form}>
                            <label htmlFor="name">Name: </label> <br/>
                            <Input name="name"
                                   type="text"
                                   value={name}
                                   onChange={e => handleInputChange(e, "name")}
                                   className={styles.input}/>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className={styles.element_form}>
                            <label htmlFor="name">Proficiency: </label> <br/>
                            <Input name="proficiency"
                                   type="text"
                                   value={proficiency}
                                   onChange={e => handleInputChange(e, "proficiency")}
                                   className={styles.input}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Card> : null
    );
};


export default SkillPaper;