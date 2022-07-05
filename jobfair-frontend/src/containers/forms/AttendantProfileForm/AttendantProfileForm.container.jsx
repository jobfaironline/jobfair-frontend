import { Form, Modal, Typography, notification } from 'antd';
import { LoadingComponent } from '../../../components/commons/Loading/Loading.component';
import { PATH } from '../../../constants/Paths/Path';
import {
  convertToDateString,
  convertToDateValue,
  convertToMoment,
  deepClone,
  handleConvertRangePicker
} from '../../../utils/common';
import { deactivateOwnAccountAPI } from '../../../services/jobhub-api/AccountControllerService';
import {
  getAttendantDetailAPI,
  updateAttendantProfileAPI
} from '../../../services/jobhub-api/AttendantControllerService';
import { logoutHandler } from '../../../redux-flow/authentication/authentication-action';
import { selectWebSocket } from '../../../redux-flow/web-socket/web-socket-selector';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AttendantProfileFormComponent from '../../../components/forms/AttendantProfileForm/AttendantProfileForm.component';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const removeIdNewItem = (data) => {
  const result = deepClone(data);
  result.forEach((history) => {
    if (history.isNew) history.id = null;
  });
  return result;
};

const mapperForWorkHistoryRequestBody = (workHistories) => {
  let result = deepClone(workHistories);
  result = handleConvertRangePicker(result);
  result = removeIdNewItem(result);
  return result;
};

const mapperForEducationRequestBody = (educations) => {
  let result = deepClone(educations);
  result = handleConvertRangePicker(result);
  result = removeIdNewItem(result);
  return result;
};

const mapperForReferencesRequestBody = (references) => {
  let result = deepClone(references);
  result = removeIdNewItem(result);
  return result;
};

const mapperForCertificationRequestBody = (certifications) => {
  let result = deepClone(certifications);
  result.forEach((certification) => {
    certification.issueDate = certification.issueDate ? certification.issueDate.unix() * 1000 : null;
  });
  result = removeIdNewItem(result);
  return result;
};

const mapperForActivitiesRequestBody = (activities) => {
  let result = deepClone(activities);
  result = handleConvertRangePicker(result);
  result = removeIdNewItem(result);
  return result;
};

const mapperProfileDate = (data) => ({
  ...data,
  residenceId: data.countryId !== 60 ? 62 : data.residenceId,
  dob: data.dob ? moment(convertToDateString(data.dob)) : moment(),
  workHistories: convertToMoment(data.workHistories),
  activities: convertToMoment(data.activities),
  educations: convertToMoment(data.educations),
  certifications: data.certifications.map((certification) => {
    certification.issueDate = moment(certification.issueDate);
    return certification;
  })
});

const { Text, Title } = Typography;

const AttendantProfileFormContainer = () => {
  const [form] = Form.useForm();
  const attendantId = useSelector((state) => state.authentication.user.userId);
  const webSocketClient = useSelector(selectWebSocket);
  const history = useHistory();
  const dispatch = useDispatch();

  const [data, setData] = useState({});
  const [deactivateAccountModalVisibility, setDeactivateAccountModalVisibility] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await getAttendantDetailAPI(attendantId);
      setData(mapperProfileDate(data));
    } catch (e) {
      notification['error']({
        message: `Fetch attendant profile failed`,
        description: `Failed for attendant with ${attendantId}`
      });
    }
  };

  const onFinish = async (values) => {
    const body = {
      account: values.account,
      accountId: attendantId,
      activities: mapperForActivitiesRequestBody(values.activities),
      address: values.address,
      certifications: mapperForCertificationRequestBody(values.certifications),
      countryId: values.countryId,
      dob: convertToDateValue(values.dob.format()),
      educations: mapperForEducationRequestBody(values.educations),
      jobLevel: values.jobLevel,
      jobTitle: values.jobTitle,
      maritalStatus: values.maritalStatus,
      references: mapperForReferencesRequestBody(values.references),
      residenceId: values.residenceId,
      skills: values.skills,
      title: values.title,
      workHistories: mapperForWorkHistoryRequestBody(values.workHistories),
      yearOfExp: values.yearOfExp
    };

    try {
      await updateAttendantProfileAPI(body);
      fetchData();
      notification['success']({
        message: `Update attendant profile successfully`,
        description: `Update attendant: ${attendantId} successfully`
      });
    } catch (e) {
      notification['error']({
        message: `Update attendant profile failed`,
        description: `There is problem while updating, try again later`
      });
    }
  };

  const handleDeactivateAccount = async () => {
    await deactivateOwnAccountAPI();
    webSocketClient?.close();
    dispatch(logoutHandler());
    history.push(PATH.INDEX);
  };

  const openDeactivateAccount = () => {
    setDeactivateAccountModalVisibility(true);
  };

  const handleChangePassword = () => {
    history.push(PATH.CHANGE_PASSWORD_PAGE);
  };

  if (data === undefined || data === null || Object.keys(data).length === 0)
    return <LoadingComponent isWholePage={true} />;

  return (
    <>
      <Modal
        visible={deactivateAccountModalVisibility}
        title={'Deactivate account'}
        okText={'Deactivate'}
        onOk={handleDeactivateAccount}
        onCancel={() => setDeactivateAccountModalVisibility(false)}>
        <Title level={4}>Are you sure to deactivate your account? </Title>
        <Text> You can always reactive your account by login again </Text>
      </Modal>
      <AttendantProfileFormComponent
        form={form}
        onFinish={onFinish}
        data={data}
        onDeactivateAccount={openDeactivateAccount}
        onChangePassword={handleChangePassword}
      />
    </>
  );
};

export default AttendantProfileFormContainer;
