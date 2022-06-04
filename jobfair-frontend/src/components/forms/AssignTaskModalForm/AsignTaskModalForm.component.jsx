import { AssignmentConst } from '../../../constants/AssignmentConst';
import { Checkbox, Form, Modal, Select, Typography } from 'antd';
import React, { useState } from 'react';
import moment from 'moment';

const { Text } = Typography;

export const AssignTaskModal = (props) => {
  const { date, visible, fullName, form, onCancel, onOk, shiftData } = props;
  const [, setForceRerender] = useState(false);
  return (
    <Modal visible={visible} title={`Assign task - ${date} - ${fullName}`} onCancel={onCancel} onOk={onOk}>
      <Form form={form}>
        <Text>Available shift</Text>
        {shiftData?.map((shift, index) => {
          const startOfDate = moment().startOf('day');
          const beginTime = startOfDate.clone().add(shift.beginTime);
          const endTime = startOfDate.clone().add(shift.endTime);
          return (
            <div key={`shift-${index}`}>
              <Form.Item name={`shift-${index}`} valuePropName='checked'>
                <Checkbox
                  onChange={() => {
                    setForceRerender((prevState) => !prevState);
                  }}>{`Shift ${index + 1} (${beginTime.format('kk:mm')}-${endTime.format('kk:mm')})`}</Checkbox>
              </Form.Item>
              {form.getFieldsValue(true)[`shift-${index}`] ? (
                <Form.Item name={`shift-${index}-type`}>
                  <Select placeholder={'Select role'}>
                    <Select.Option value={AssignmentConst.RECEPTION}>{AssignmentConst.RECEPTION}</Select.Option>
                    <Select.Option value={AssignmentConst.INTERVIEWER}>{AssignmentConst.INTERVIEWER}</Select.Option>
                  </Select>
                </Form.Item>
              ) : null}
            </div>
          );
        })}
      </Form>
    </Modal>
  );
};
