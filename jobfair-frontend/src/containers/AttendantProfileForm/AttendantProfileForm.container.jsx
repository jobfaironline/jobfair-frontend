import React, {useEffect, useState} from 'react';
import {Form, notification} from "antd";
import {useSelector} from "react-redux";
import {getAttendantDetailAPI, updateAttendantProfileAPI} from "../../services/attendantService";
import AttendantProfileFormComponent from "../../components/attendant-profile-form/AttendantProfileForm.component";
import {convertToDateString, convertToDateValue} from "../../utils/common";
import moment from "moment";


const AttendantProfileFormContainer = props => {
    const [form] = Form.useForm();
    const attendantId = useSelector((state) => state.authentication.user.userId);
    const [data, setData] = useState({});


    const handleConvert = (data) => {
        const result = data.map(item => {
            return {
                ...item,
                fromDate: convertToDateValue(item.fromDate.format()),
                toDate: convertToDateValue(item.toDate.format())
            };
        });
        return result;
    }

    const onFinish = (values) => {
        console.log('values :', values);
        const body = {
            account: values.account,
            accountId: attendantId,
            activities: handleConvert(values.activities),
            address: values.address,
            certifications: values.certifications,
            countryId: values.countryId,
            dob:convertToDateValue(values.dob.format()),
            educations: handleConvert(values.educations),
            jobLevel: values.jobLevel,
            jobTitle: values.jobTitle,
            maritalStatus: values.maritalStatus,
            references: values.references,
            residenceId: values.residenceId,
            skills: values.skills,
            title: values.title,
            workHistories: handleConvert(values.workHistories),
            yearOfExp: values.yearOfExp
        }
        console.log('request body:' , body)
        updateAttendantProfileAPI(body)
            .then(res => {
                notification['success']({
                    message: `Update attendant profile successfully`,
                    description:
                        `Update attendant: ${attendantId} successfully`,
                });
                fetchData();
            })
            .catch(err => {
                notification['error']({
                    message: `Update attendant profile failed`,
                    description:
                        `There is problem while updating, try again later`,
                });
            })
    }
    const fetchData = async () => {
        console.log(attendantId)
        getAttendantDetailAPI(attendantId)
            .then(res => {
                notification['success']({
                    message: `Fetch attendant profile successfully`,
                    description:
                        `For attendant with ${attendantId}`,
                });
                setData(res.data);
            })
            .catch((err) => {
                notification['error']({
                    message: `Fetch attendant profile failed`,
                    description:
                        `Failed for attendant with ${attendantId}`,
                });
            })
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <AttendantProfileFormComponent form={form} onFinish={onFinish} data={data}/>
        </>
    );
};



export default AttendantProfileFormContainer;