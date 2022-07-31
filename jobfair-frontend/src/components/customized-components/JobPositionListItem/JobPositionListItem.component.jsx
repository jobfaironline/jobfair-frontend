import { Col, List, Row, Tag, Typography } from 'antd';
import { convertEnumToString } from '../../../utils/common';
import React from 'react';

const { Text } = Typography;

export const JobPositionComponent = (props) => {
  const { data, onClick, key } = props;
  return (
    <List.Item className={'companyJobPositionTab'} onClick={onClick} key={key}>
      <div style={{ height: 'max-content', width: '100%' }}>
        <div
          key={data.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Text strong>{`${data.title}`}</Text>
        </div>
        <div>
          <Col>
            <Row>
              <Col span={12}>
                <Text strong>Job level: </Text>
                <Tag color={'purple'}>
                  {data.level !== undefined ? convertEnumToString(data.level) : convertEnumToString(data.jobLevel)}
                </Tag>
              </Col>
              <Col span={12}>
                <Text strong>Job type: </Text>
                <Text>{convertEnumToString(data?.jobType)}</Text>
              </Col>
            </Row>
            <Row style={{ marginTop: '2px' }}>
              <Text strong style={{ marginRight: '5px' }}>
                Required skills:
              </Text>
              {data.skillTagDTOS.map((skill) => (
                <Tag color='green' style={{ padding: '0px 5px' }}>
                  {skill.name}
                </Tag>
              ))}
            </Row>
            <Row style={{ marginTop: '2px' }}>
              <Text strong style={{ marginRight: '5px' }}>
                Category:
              </Text>
              {data.subCategoryDTOs.map((category) => (
                <Tag color='blue' style={{ padding: '0px 5px' }}>
                  {category.name}
                </Tag>
              ))}
            </Row>
          </Col>
        </div>
      </div>
    </List.Item>
  );
};
