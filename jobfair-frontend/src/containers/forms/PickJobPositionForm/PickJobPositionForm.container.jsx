/* eslint-disable no-unused-vars */
import { Form, Modal, Typography, notification } from 'antd';
import { LoadingComponent } from '../../../components/commons/Loading/Loading.component';
import { PATH } from '../../../constants/Paths/Path';
import {
  assignJobPositionToBooth,
  getCompanyBoothById
} from '../../../services/jobhub-api/JobFairBoothControllerService';
import { generatePath, useHistory } from 'react-router-dom';
import { getAssignmentById } from '../../../services/jobhub-api/AssignmentControllerService';
import AnchorComponent from '../../../components/commons/Anchor/Achor.component';
import PickJobPositionForm from '../../../components/forms/PickJobPositionForm/PickJobPositionForm.component';
import PickJobPositionTableContainer from '../../JobPositionTable/JobPositionTable.container';
import React, { useEffect, useRef, useState } from 'react';

const PickJobPositionFormContainer = ({ assignmentId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [arrKey, setArrKey] = useState([]);
  const [formData, setFormData] = useState();
  const hasFetchData = useRef(false);
  const history = useHistory();
  const [form] = Form.useForm();

  const [anchorList, setAnchorList] = useState(
    form.getFieldsValue().jobPositions
      ? form.getFieldsValue().jobPositions.map((item) => ({
          href: `#${item.id}`,
          title: item.title
        }))
      : []
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const assigmentData = (await getAssignmentById(assignmentId)).data;
    console.log(assigmentData);
    const data = (await getCompanyBoothById(assigmentData.jobFairBooth.id)).data;
    const formData = {
      name: data.name,
      description: data.description,
      boothId: assigmentData.jobFairBooth.id,
      jobPositions: data.boothJobPositions.map((position, index) => ({
        ...position,
        id: position.originJobPosition,
        key: position.originJobPosition,
        no: index,
        isHaveTest: position.isHaveTest ? [true] : [],
        testLength: position.testTimeLength,
        testNumOfQuestion: position.numOfQuestion
      })),
      jobFair: data.jobFair
    };
    const hasTestArr = formData.jobPositions?.filter((position) => position.isHasTest).map((position) => position.no);
    setArrKey(hasTestArr);
    setFormData(formData);
  };

  const handlePickJobPosition = () => {
    setModalVisible(true);
  };

  const handleRemove = (name, remove) => {
    remove(name);
    setAnchorList(
      form.getFieldsValue().jobPositions
        ? form.getFieldsValue().jobPositions.map((item) => ({
            href: `#${item.id}`,
            title: item.title
          }))
        : []
    );
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setAnchorList(
      form.getFieldsValue().jobPositions
        ? form.getFieldsValue().jobPositions.map((item) => ({
            href: `#${item.id}`,
            title: item.title
          }))
        : []
    );
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
      const errorsArray = form.getFieldsError();
      for (const error of errorsArray) {
        if (error.errors.length > 0) {
          form.scrollToField(error.name, { behavior: 'smooth', block: 'center' });
          break;
        }
      }
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
        description: `${e.response.data.message}`
      });
    }
  };

  if (!formData) return <LoadingComponent isWholePage={true} />;

  if (hasFetchData.current === false) {
    form.setFieldsValue({ ...formData });
    hasFetchData.current = true;
  }

  const handleView3DBooth = () => {
    const url = generatePath(PATH.DECORATE_BOOTH_PAGE, {
      jobFairId: formData.jobFair.id,
      companyBoothId: formData.boothId
    });
    history.push(url);
  };

  const handleViewJobFairMap = () => {
    const url = generatePath(PATH.PUBLICIZED_BOOTH_PAGE, {
      jobFairId: formData.jobFair.id
    });
    history.push(url);
  };

  return (
    <>
      <Modal
        width={800}
        title='Choose job position'
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        destroyOnClose>
        {modalVisible ? <PickJobPositionTableContainer form={form} selectable /> : null}
      </Modal>
      <div style={{ display: 'flex', margin: '5rem 1rem' }}>
        <div style={{ padding: '1rem' }}>
          <Typography style={{ fontSize: '1rem', paddingBottom: '0.3rem' }}>Content list</Typography>
          <AnchorComponent
            listData={
              form.getFieldsValue().jobPositions
                ? form.getFieldsValue().jobPositions.map((item) => ({
                    href: `#${item.id}`,
                    title: item.title
                  }))
                : []
            }
            href={'#description'}
            title={'Booth description'}
          />
        </div>
        <div style={{ flex: '1', padding: '0 5rem' }}>
          <PickJobPositionForm
            handlePickJobPosition={handlePickJobPosition}
            handleView3DBooth={handleView3DBooth}
            handleViewJobFairMap={handleViewJobFairMap}
            form={form}
            onFinish={onFinish}
            handleRemove={handleRemove}
            onChangeHaveTest={onChangeHaveTest}
            arrKey={arrKey}
            jobFair={formData.jobFair}
          />
        </div>
      </div>
    </>
  );
};

export default PickJobPositionFormContainer;
