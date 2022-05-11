/* eslint-disable no-unused-vars */
import { LoadingComponent } from '../../../components/commons/Loading/Loading.component';
import { Modal, Typography, notification } from 'antd';
import {
  assignJobPositionToBooth,
  getCompanyBoothById
} from '../../../services/jobhub-api/JobFairBoothControllerService';
import { useHistory } from 'react-router-dom';
import AnchorComponent from '../../../components/commons/Anchor/Achor.component';
import PickJobPositionForm from '../../../components/forms/PickJobPositionForm/PickJobPositionForm.component';
import PickJobPositionTableContainer from '../../JobPositionTable/JobPositionTable.container';
import React, { useEffect, useRef, useState } from 'react';

const PickJobPositionFormContainer = ({ form, companyBoothId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [arrKey, setArrKey] = useState([]);
  const [formData, setFormData] = useState();
  const hasFetchData = useRef(false);
  const history = useHistory();

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
    const data = (await getCompanyBoothById(companyBoothId)).data;
    const formData = {
      name: data.name,
      description: data.description,
      jobPositions: data.boothJobPositions.map((position, index) => ({
        ...position,
        id: position.originJobPosition,
        key: position.originJobPosition,
        no: index,
        isHaveTest: position.isHaveTest ? [true] : [],
        testLength: position.testTimeLength,
        testNumOfQuestion: position.numOfQuestion
      }))
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
      boothId: companyBoothId,
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
      const res = await assignJobPositionToBooth(body);
      if (res.status === 200) {
        notification['success']({
          message: `Decorate booth successfully.`
        });
      }
    } catch (e) {
      notification['error']({
        message: `Assign job position failed`,
        description: `${e.response.data.message}`
      });
    }
  };

  if (!formData) return <LoadingComponent isWholePage={true} />;

  if (hasFetchData.current === false) {
    form.setFieldsValue({ ...formData });
    hasFetchData.current = true;
  }

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
            form={form}
            onFinish={onFinish}
            handleRemove={handleRemove}
            onChangeHaveTest={onChangeHaveTest}
            arrKey={arrKey}
          />
        </div>
      </div>
    </>
  );
};

export default PickJobPositionFormContainer;
