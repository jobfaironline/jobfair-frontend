import React, {useEffect, useState} from 'react';
import {Table, Tabs} from "antd";
import {DeleteOutlined, PlusCircleOutlined} from '@ant-design/icons';
import styles from "./ProfilePage.module.scss";
import {appliedColumns, appliedData, joinData, joinedColumns} from "./MockData";
import {useHistory} from "react-router-dom";
import {Paper} from '@mui/material';
import SkillPaper from "./SkillPaper/SkillPaper";
import BasicInfoPaper from "./BasicInfoPaper/BasicInfoPaper";
import AttendantInfoPaper from "./AttendantInfoPaper/AttendantInfoPaper";
import WorkHistoryPaper from "./WorkHistoryPaper/WorkHistoryPaper";
import ActivityPaper from "./ActivityPaper/ActivityPaper";
import CertificationPaper from "./CertificationPaper/CertificationPaper";
import EducationPaper from "./EducationPaper/EducationPaper";
import ReferencePaper from "./ReferencePaper/ReferencePaper";
import {getAttendantDetailAPI} from "../../../services/userService";
import {ATTENDANT_DEFAULT_MODEL, USER_STORAGE} from "../../../constants/AppConst";
import {notify} from "../../../utils/toastutil";
import {injectStyle} from "react-toastify/dist/inject-style";

if (typeof window !== "undefined") {
    injectStyle();
}

const ProfilePage = props => {
    const history = useHistory();

    const sampleEducations = ['College', 'Undergraduate', 'Graduate']
    const {TabPane} = Tabs;

    //attendant states
    const [data, setData] = useState(ATTENDANT_DEFAULT_MODEL);

    const [numOfSkill, setNumOfSkill] = useState(0);

    const [numOfWork, setNumOfWork] = useState(0);

    const [numOfActivity, setNumOfActivity] = useState(0);

    const [numOfCert, setNumOfCert] = useState(0);

    const [numOfEducation, setNumOfEducation] = useState(0);

    const [numOfReference, setNumOfReference] = useState(0);
    //life cycle
    useEffect(() => {
        fetchingInitData();
    }, [])

    useEffect(() => {
        // console.log('==========================')
        // console.log('num of skill:', numOfSkill);
        // console.log('num of work:', numOfWork);
        // console.log('num of activity:', numOfActivity);
        // console.log('num of certification:', numOfCert);
        // console.log('num of education:', numOfEducation);
        // console.log('num of reference:', numOfReference);
        // console.log('==========================')
    }, [numOfSkill, numOfWork, numOfActivity, numOfCert, numOfEducation, numOfReference])

    //Call API

    async function fetchingInitData() {
        const attendantId = JSON.parse(localStorage.getItem(USER_STORAGE)).userId;
        if (attendantId === undefined) {
            return (
                <div>You have to login first bitch</div>
            )
        }
        console.log(attendantId)
        getAttendantDetailAPI(attendantId)
            .then((res) => {
                if (res.status === 200) {
                    setData(res.data);
                    setNumOfSkill(res.data.skills.length);
                    setNumOfWork(res.data.workHistories.length);
                    setNumOfEducation(res.data.educations.length);
                    setNumOfCert(res.data.certifications.length);
                    setNumOfReference(res.data.references.length);
                    setNumOfActivity(res.data.activities.length);

                }
            })
            .catch((error) => {
                console.log(error);
                notify(0, `${error}`)
            })
    }


    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log("hello bitch");

    }
    //function
    const onChangeAppliedAttendant = (pagination, filters, sorter, extra) => {
        console.log("Applied attendant table changed");
        console.log('params', pagination, filters, sorter, extra);
    }

    const handleAddNewSkill = (e) => {
        setNumOfSkill(numOfSkill + 1)
    }

    const handleAddNewWork = (e) => {
        setNumOfWork(numOfWork + 1);
    }

    const handleAddNewActivity = (e) => {
        setNumOfActivity(numOfActivity + 1);
    }


    const handleAddNewCert = (e) => {
        setNumOfCert(numOfCert + 1);
    }


    const handleAddNewEducation = (e) => {
        setNumOfEducation(numOfEducation + 1);
    }


    const handleAddNewReference = (e) => {
        setNumOfReference(numOfReference + 1);
    }


    return (
        <div>
            <h1 className={styles.header}>This is Profile page</h1>
            <Tabs defaultActiveKey="1">
                <TabPane tab="PROFILE" key="1">
                    <form onSubmit={e => handleOnSubmit(e)}>
                        <Paper elevation={16} variant="outlined" className={styles.paper}>
                            <BasicInfoPaper initData={data} isShow={true} header={'Basic information'}/>
                        </Paper>
                        <Paper elevation={16} variant="outlined" className={styles.paper}>
                            <AttendantInfoPaper initData={data} isShow={true} header={'Attendant information'}/>
                        </Paper>
                        <Paper elevation={16} variant="outlined" className={styles.paper}>
                            Skill
                            <PlusCircleOutlined onClick={e => handleAddNewSkill(e)}/>
                            {Array.from(Array(numOfSkill)).map((c, index) => <SkillPaper key={index} isShow={numOfSkill > 0}
                                                                                         title={`Skill-${index}`}
                                                                                         initData={data.skills[index]}/>)}
                        </Paper>
                        <Paper elevation={16} variant="outlined" className={styles.paper}>
                            Work History
                            <PlusCircleOutlined onClick={e => handleAddNewWork(e)}/>
                            {Array.from(Array(numOfWork)).map((c, index) => <WorkHistoryPaper key={index}
                                                                                              isShow={numOfWork > 0}
                                                                                              title={`Work history-${index}`}
                                                                                              initData={data.workHistories[index]}/>)}
                        </Paper>
                        <Paper elevation={16} variant="outlined" className={styles.paper}>
                            Activity
                            <PlusCircleOutlined onClick={e => handleAddNewActivity(e)}/>
                            {Array.from(Array(numOfActivity)).map((c, index) => <ActivityPaper key={index}
                                                                                               isShow={numOfActivity > 0}
                                                                                               title={`Activity-${index}`}
                                                                                               initData={data.activities[index]}/>)}
                        </Paper>
                        <Paper elevation={16} variant="outlined" className={styles.paper}>
                            Certification
                            <PlusCircleOutlined onClick={e => handleAddNewCert(e)}/>
                            {Array.from(Array(numOfCert)).map((c, index) => <CertificationPaper key={index}
                                                                                                isShow={numOfCert > 0}
                                                                                                title={`Certification-${index}`}
                                                                                                initData={data.certifications[index]}/>)}
                        </Paper>
                        <Paper elevation={16} variant="outlined" className={styles.paper}>
                            Education
                            <PlusCircleOutlined onClick={e => handleAddNewEducation(e)}/>
                            {Array.from(Array(numOfEducation)).map((c, index) => <EducationPaper key={index}
                                                                                                 isShow={numOfEducation > 0}
                                                                                                 title={`Education-${index}`}
                                                                                                 initData={data.educations[index]}/>)}
                        </Paper>
                        <Paper elevation={16} variant="outlined" className={styles.paper}>
                            Reference
                            <PlusCircleOutlined onClick={e => handleAddNewReference(e)}/>
                            {Array.from(Array(numOfReference)).map((c, index) => <ReferencePaper key={index}
                                                                                                 isShow={numOfReference > 0}
                                                                                                 title={`Reference-${index}`}
                                                                                                 initData={data.references[index]}/>)}
                        </Paper>
                        <input type="submit" value="Edit profile"/>
                    </form>
                </TabPane>
                <TabPane tab="APPLIED" key="2">
                    <h2>Applied attendants</h2>
                    <Table columns={appliedColumns} dataSource={appliedData} onChange={onChangeAppliedAttendant}
                           className={styles.table}/>
                </TabPane>
                <TabPane tab="JOINED" key="3">
                    <h2>Joined attendants</h2>
                    <Table columns={joinedColumns} dataSource={joinData} className={styles.table}/>
                </TabPane>
            </Tabs>
        </div>
    );
};

ProfilePage.propTypes = {};

export default ProfilePage;

