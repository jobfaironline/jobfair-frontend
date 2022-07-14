import { Col, Divider, Row, Tag, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertEnumToString } from '../../../utils/common';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const { Text } = Typography;

export const RemoveResumeComponent = (props) => {
  const { selectedResume, onRemoveResume } = props;
  return (
    <>
      <Divider style={{ margin: '1rem 0' }} />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1 }}>
          <Text strong style={{ fontSize: '1.2rem' }}>
            CV detail
          </Text>
          <Row>
            <Col span={4}>
              <Text strong style={{ fontSize: '1rem' }}>
                Name{' '}
              </Text>
              {selectedResume?.name}
            </Col>
            <Col span={10}>
              <Text strong style={{ fontSize: '1rem' }}>
                Skills{' '}
              </Text>
              {selectedResume?.skills.map((item) => (
                <Tag color='green' style={{ fontSize: '0.9rem', padding: '1px 5px' }}>
                  {item.name}
                </Tag>
              ))}
            </Col>
            <Col span={10}>
              <Text strong style={{ fontSize: '1rem' }}>
                Job level{' '}
              </Text>
              <Tag color='purple' style={{ fontSize: '0.9rem', padding: '1px 5px' }}>
                {convertEnumToString(selectedResume?.jobLevel)}
              </Tag>
            </Col>
          </Row>
        </div>
        <div
          className={'remove-resume'}
          style={{
            marginLeft: '3rem',
            display: 'flex',
            alignItems: 'center'
          }}>
          <FontAwesomeIcon icon={faTrash} size={'2x'} style={{ display: 'block' }} onClick={onRemoveResume} />
        </div>
      </div>
      <Divider style={{ margin: '1rem 0' }} />
    </>
  );
};
