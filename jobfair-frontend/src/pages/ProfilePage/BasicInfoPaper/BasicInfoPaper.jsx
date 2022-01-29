import React, {useState} from 'react';
import {Col, Container, Row} from "react-grid-system";
import styles from "../ProfilePage.module.scss";
import {Avatar, Input} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {DEFAULT_PROFILE_IMAGE} from "../../../constants/AppConst";

const BasicInfoPaper = (props) => {
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [middlename, setMiddlename] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [profileImage, setProfileImage] = useState(DEFAULT_PROFILE_IMAGE);

    const handleFormChange = (e, key) => {
        switch (key) {
            case "email" :
                setEmail(e.target.value);
                console.log('email: ', e.target.value)
                break;
            case "firstname" :
                setFirstname(e.target.value);
                console.log('firstname: ', e.target.value)
                break;
            case "lastname" :
                setLastname(e.target.value);
                console.log('lastname: ', e.target.value)
                break;
            case "middlename":
                setMiddlename(e.target.value);
                console.log('middlename: ', e.target.value)
                break;
            case "phone":
                setPhone(e.target.value);
                console.log('phone: ', e.target.value)
                break;
            case "gender":
                setGender(e.target.value);
                console.log('gender: ', e.target.value)
                break;
            case "image":
                setProfileImage(e.target.value);
                console.log("image upload");
                break;
        }
    }

    return (
        <Container>
            <Row>
                <Col sm={6}>
                    <div className={styles.element_form}>
                        <label htmlFor="email">Email: </label> <br/>
                        <Input name="email"
                               type="text"
                               value={email}
                               onChange={e => handleFormChange(e, "email")}
                               className={styles.input}/>
                    </div>
                    <div className={styles.element_form}>
                        <label htmlFor="firstname">First Name: </label> <br/>
                        <Input name="firstname"
                               value={firstname}
                               type="text"
                               onChange={e => handleFormChange(e, "firstname")}
                               className={styles.input}/>
                    </div>
                    <div className={styles.element_form}>
                        <label htmlFor="middlename">Middle Name: </label> <br/>
                        <Input name="middlename" type="text"
                               value={middlename}
                               onChange={e => handleFormChange(e, "middlename")}
                               className={styles.input}/>
                    </div>
                    <div className={styles.element_form}>
                        <label htmlFor="lastname">Last Name: </label> <br/>
                        <Input name="lastname"
                               value={lastname}
                               type="text"
                               onChange={e => handleFormChange(e, "lastname")}
                               className={styles.input}/>
                    </div>
                    <div className={styles.element_form}>
                        <label htmlFor="phone">Phone: </label> <br/>
                        <Input name="phone"
                               value={phone}
                               type="text"
                               onChange={e => handleFormChange(e, "phone")}
                               className={styles.input}/>
                    </div>
                    <div className={styles.element_form}>
                        <label htmlFor="gender">Gender: </label> <br/>
                        <select id="gender"
                                onChange={e => handleFormChange(e, "gender")}
                                className={styles.gender_select}>
                            <option value="MALE" selected={gender === "MALE"}>
                                Male
                            </option>
                            <option value="FEMALE" selected={gender === "FEMALE"}>
                                Female
                            </option>
                        </select>
                    </div>
                </Col>
                <Col sm={6}>
                    <div className={styles.avatar}>
                        <div className={styles.father_div}>
                            <Avatar
                                shape="square"
                                size="large"
                                icon={<UserOutlined/>}
                                src={profileImage}
                                className={styles.image}
                            />
                        </div>
                        <div>
                            <input type="file" onChange={e => handleFormChange(e, "image")}
                                   className={styles.upload_button}/>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};


export default BasicInfoPaper;