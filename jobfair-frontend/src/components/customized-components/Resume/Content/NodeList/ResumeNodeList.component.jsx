import { Col, Row, Timeline, Typography } from 'antd';
import React from 'react';

const NodeListComponent = (props) => {
  const { listData, titleSize, subTitleSize } = props;
  const { Title, Text } = Typography;
  return (
    <>
      <Timeline>
        {listData.map((data) => (
          <Timeline.Item>
            <div style={{ marginLeft: '3rem' }}>
              <Row>
                <Col span={titleSize}>
                  <Title level={4}>{data?.titleName}</Title>
                </Col>
                <Col span={subTitleSize} style={{ marginTop: '2px' }}>
                  <Text>{data?.subName}</Text>
                </Col>
              </Row>
              <Text type='secondary' style={{ fontWeight: 'bold' }}>
                {data?.time}
              </Text>
              <br />
              <Text type='secondary'>{data?.description}</Text>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  );
};
export default NodeListComponent;
