import { Form, List } from 'antd';
import React, { useEffect } from 'react';
import TestContentFormComponent from '../../../components/forms/TestContentForm/TestContentForm.component';
import TestCountDownComponent from '../../../components/customized-components/TestCountDown/TestCountDown.component';
import TestDescriptionCardComponent from '../../../components/customized-components/TestDescriptionCard/TestDescriptionCard.component';

const fakeData = [
  {
    id: 'id1',
    title: 'con bo co bao nhieu cai canh',
    mark: 0.5,
    choicesList: [
      {
        content: 'mot cai'
      },
      {
        content: '2 cai'
      },
      {
        content: '5  cai'
      },
      {
        content: '10 cai'
      }
    ]
  },
  {
    id: 'id2',
    title: 'con bo co bao nhieu cai canh',
    mark: 0.5,
    choicesList: [
      {
        content: 'mot cai'
      },
      {
        content: '2 cai'
      },
      {
        content: '5  cai'
      },
      {
        content: '10 cai'
      }
    ]
  }
];

const AttendantAttemptTestContainer = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { testId } = props;
  const [form] = Form.useForm();
  // eslint-disable-next-line no-unused-vars

  useEffect(() => {
    form.setFieldsValue(...fakeData);
  }, []);

  const handleSelect = (e, id) => {};

  return (
    <div>
      <TestDescriptionCardComponent
        title={'Tiêu đề bài test'}
        metaData={'You have 20 minutes to attempt this test'}
        content={'PRJ321 - Final exam'}
      />
      <TestCountDownComponent duration={1} totalQuestion={10} />
      <List
        grid={{
          gutter: 20,
          column: 1
        }}
        dataSource={fakeData}
        renderItem={(item) => (
          <List.Item>
            <TestContentFormComponent
              title={item.title}
              mark={item.mark}
              choicesList={item.choicesList}
              id={item.id}
              handleSelect={handleSelect}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default AttendantAttemptTestContainer;
