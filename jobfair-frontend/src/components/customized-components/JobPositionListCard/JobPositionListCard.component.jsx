import './JobPositionListCard.styles.scss';
import { Card, Descriptions, List } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATH_COMPANY_MANAGER } from '../../../constants/Paths/Path';
import { convertEnumToString } from '../../../utils/common';
import { faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import React from 'react';

export const JobPositionList = (props) => {
  const { handleCreateOnClick, handleViewDetailPage, data, handleOnDelete } = props;
  const history = useHistory();
  return (
    <div>
      <List
        grid={{
          column: 2
        }}
        dataSource={data}
        renderItem={(item) => {
          if (item.isFirst) {
            return (
              <Card className={'job-position-card add-container'} onClick={handleCreateOnClick} hoverable>
                <FontAwesomeIcon icon={faPlus} size={'xl'} />
              </Card>
            );
          }

          return (
            <Card
              className={'job-position-card'}
              actions={[
                <div
                  onClick={() =>
                    history.push(PATH_COMPANY_MANAGER.QUESTION_BANK, {
                      jobPositionId: item.id
                    })
                  }
                  style={{ height: 30 }}>
                  Question bank
                </div>
              ]}>
              <div className={'mask'}>
                <FontAwesomeIcon
                  icon={faTrash}
                  size={'4x'}
                  color={'white'}
                  className={'icon'}
                  onClick={() => handleOnDelete(item.id)}
                />
                <FontAwesomeIcon
                  icon={faEye}
                  size={'4x'}
                  color={'white'}
                  className={'icon'}
                  onClick={() => handleViewDetailPage(item.id)}
                />
              </div>
              <div className={'content-container'}>
                <Descriptions title={item.title} column={1}>
                  <Descriptions.Item label={'Type'}>{convertEnumToString(item.jobType)}</Descriptions.Item>
                  <Descriptions.Item label={'Level'}>{convertEnumToString(item.level)}</Descriptions.Item>
                </Descriptions>
              </div>
            </Card>
          );
        }}
      />
    </div>
  );
};
