/* eslint-disable no-unused-vars */
import { Modal, Typography, notification } from 'antd';
import { assignJobPositionToBooth } from '../../../services/jobhub-api/JobFairBoothControllerService';
import { convertHH_mmToMinute } from '../../../utils/common';
import AnchorComponent from '../../../components/commons/Anchor/Achor.component';
import PickJobPositionForm from '../../../components/forms/PickJobPositionForm/PickJobPositionForm.component';
import PickJobPositionTableContainer from '../../JobPositionTable/JobPositionTable.container';
import React, { useState } from 'react';

const PickJobPositionFormContainer = ({ form, companyBoothId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [arrKey, setArrKey] = useState([]);

  const [anchorList, setAnchorList] = useState(
    form.getFieldsValue().jobPositions
      ? form.getFieldsValue().jobPositions.map((item) => ({
          href: `#${item.id}`,
          title: item.title
        }))
      : []
  );

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
      description: values.description,
      jobPositions: values.jobPositions.map((item) => ({
        id: item.id,
        maxSalary: item.maxSalary,
        minSalary: item.minSalary,
        note: item.note,
        numOfPosition: item.numOfPosition,
        passMark: item.passMark,
        testLength: convertHH_mmToMinute(item.testLength),
        testNumOfQuestion: item.testNumOfQuestion
      }))
    };
    try {
      const res = await assignJobPositionToBooth(body);
      if (res.status === 200) {
        notification['success']({
          message: `submitted successfully`
        });
      }
    } catch (e) {
      notification['error']({
        message: `Assign job position failed`,
        description: `${e.response.data}`
      });
    }
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: '0.8rem',
          top: '200px',
          zIndex: '1000'
        }}>
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
      <Modal
        width={800}
        title='Choose job position'
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        destroyOnClose>
        {modalVisible ? <PickJobPositionTableContainer form={form} selectable /> : null}
      </Modal>
      <PickJobPositionForm
        handlePickJobPosition={handlePickJobPosition}
        form={form}
        onFinish={onFinish}
        handleRemove={handleRemove}
        onChangeHaveTest={onChangeHaveTest}
        arrKey={arrKey}
      />
    </>
  );
};

export default PickJobPositionFormContainer;
