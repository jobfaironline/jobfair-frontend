import './PickJobPositionForm.styles.scss';
import { BoothDescriptionValidation } from '../../../validate/BoothDescriptionValidation';
import { Card, Form, Image, Input, Modal, Typography, notification } from 'antd';
import { LoadingComponent } from '../../../components/commons/Loading/Loading.component';
import { PATH, PATH_COMPANY_EMPLOYEE } from '../../../constants/Paths/Path';
import {
  assignJobPositionToBooth,
  getCompanyBoothById
} from '../../../services/jobhub-api/JobFairBoothControllerService';
import { generatePath } from 'react-router-dom';
import { getAssignmentById } from '../../../services/jobhub-api/AssignmentControllerService';
import { handleFieldsError } from '../../../utils/handleFIeldsError';
import { mapperCompanyBooth } from '../../../utils/mapperCompanyBoooth';
import PickJobPositionForm from '../../../components/forms/PickJobPositionForm/PickJobPositionForm.component';
import PickJobPositionTableContainer from '../../JobPositionTable/JobPositionTable.container';
import React, { useEffect, useRef, useState } from 'react';

const { TextArea } = Input;
const { Text, Title } = Typography;

const PickJobPositionFormContainer = ({ assignmentId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [arrKey, setArrKey] = useState([]);
  const [formData, setFormData] = useState();

  const hasFetchData = useRef(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const calculateKeyArr = () => {
    const hasTestArr = form
      .getFieldsValue(true)
      .jobPositions?.filter((position) => position?.isHaveTest?.length > 0)
      .map((position) => position.no);
    setArrKey(hasTestArr);
  };

  const fetchData = async () => {
    const assigmentData = (await getAssignmentById(assignmentId)).data;
    const data = (await getCompanyBoothById(assigmentData.jobFairBooth.id)).data;
    const formData = mapperCompanyBooth(data, assigmentData);
    const hasTestArr = formData?.jobPositions
      ?.filter((position) => position.isHaveTest.length > 0)
      .map((position) => position.no);
    setArrKey(hasTestArr);
    setFormData(formData);
  };

  const handlePickJobPosition = () => {
    setModalVisible(true);
  };

  const handleRemove = (name, remove) => {
    remove(name);
    calculateKeyArr();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    calculateKeyArr();
  };

  const onChangeHaveTest = (e, value) => {
    if (e.target.checked) setArrKey((prevState) => [value, ...prevState]);
    else {
      const newData = arrKey.filter((item) => item !== value);
      setArrKey(newData);
    }
  };

  const onFinish = async (values) => {
    const body = {
      boothId: formData.boothId,
      name: values.name,
      description: values.description,
      jobPositions: values.jobPositions.map((item) => ({
        id: item.id,
        maxSalary: item.maxSalary,
        minSalary: item.minSalary,
        numOfPosition: item.numOfPosition,
        isHaveTest: item.isHaveTest !== undefined && item.isHaveTest.length > 0,
        passMark: item.passMark,
        testLength: item.testLength,
        testNumOfQuestion: item.testNumOfQuestion,
        note: item.note
      }))
    };
    try {
      await form.validateFields();
    } catch (e) {
      handleFieldsError(form);
      return;
    }
    try {
      const res = await assignJobPositionToBooth(body);
      if (res.status === 200) {
        notification['success']({
          message: `Finished booth description.`
        });
      }
    } catch (e) {
      notification['error']({
        message: `Error occurred when finish booth description`,
        description: `${
          e.response.data.message.includes('Binding') ? 'Some job position is invalid' : e.response.data.message
        }`
      });
    }
  };

  if (!formData) return <LoadingComponent isWholePage={true} />;

  if (hasFetchData.current === false) {
    form.setFieldsValue({ ...formData });
    hasFetchData.current = true;
  }

  const handleView3DBooth = () => {
    const url = generatePath(PATH_COMPANY_EMPLOYEE.JOB_FAIR_BOOTH_REVIEW, {
      boothId: formData.boothId
    });
    window.open(`${window.location.origin}${url}`);
  };

  const handleViewJobFairMap = () => {
    const url = generatePath(PATH.PUBLICIZED_BOOTH_PAGE, {
      jobFairId: formData.jobFair.id
    });
    window.open(`${window.location.origin}${url}`);
  };
  return (
    <>
      <Modal
        width={800}
        title='Choose job position'
        style={{ top: '2rem', verticalAlign: 'top' }}
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        destroyOnClose>
        {modalVisible ? (
          <PickJobPositionTableContainer form={form} selectable calculateKeyArr={calculateKeyArr} />
        ) : null}
      </Modal>
      <div className={'pick-job-position-container'}>
        <div className={'content-container'}>
          <div className={'left-side'}>
            <Title level={3}>My booth profile</Title>
            <div className={'card-container'}>
              <Card bordered={true} className={'card'} onClick={handleView3DBooth} hoverable>
                <Image
                  alt='example'
                  src={formData.jobFair?.thumbnailUrl}
                  preview={false}
                  height={'10rem'}
                  width={'100%'}
                />
                <Title level={5}>Booth decoration</Title>
                <Text>Detail</Text>
              </Card>
              <Card
                bordered={true}
                className={'card'}
                hoverable
                onClick={handleViewJobFairMap}
                style={{ marginLeft: '1rem' }}>
                <Image
                  alt='example'
                  src={formData.jobFair?.thumbnailUrl}
                  preview={false}
                  height={'10rem'}
                  width={'100%'}
                />
                <Title level={5}>Job fair map</Title>
                <Text>Detail</Text>
              </Card>
            </div>
            <div className={'booth-description-container'}>
              <Form form={form} onFinish={onFinish}>
                <Form.Item label='Booth name' name='name' rules={BoothDescriptionValidation.name}>
                  <Input placeholder="Booth's name" />
                </Form.Item>
                <Form.Item label='Booth description' name='description' rules={BoothDescriptionValidation.description}>
                  <TextArea autoSize={{ minRows: 5 }} showCount maxLength={500} placeholder='Description' />
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className={'right-side'}>
            <PickJobPositionForm
              handlePickJobPosition={handlePickJobPosition}
              form={form}
              onFinish={onFinish}
              handleRemove={handleRemove}
              onChangeHaveTest={onChangeHaveTest}
              arrKey={arrKey}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PickJobPositionFormContainer;
