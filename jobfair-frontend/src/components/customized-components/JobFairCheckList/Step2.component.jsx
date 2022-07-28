import { Button, Col, Row, Tag, Typography } from 'antd';
import { DateFormat } from '../../../constants/ApplicationConst';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StepComponent } from './Step.component';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { getTimeZoneCode } from '../../../utils/common';
import moment from 'moment';

const { Text } = Typography;

export const Step2Component = (props) => {
  const { isFinish, jobFairData, handleEditSchedule, isPublish } = props;
  return (
    <StepComponent isFinish={isFinish}>
      <div className={'title'}>
        <div style={{ flex: 1 }}>
          <Text className={'content'} strong>
            Step 2: Schedule job fair
          </Text>
          <Row className={'time'}>
            <Col span={7}>
              <Text>Decorate time ({getTimeZoneCode()}):</Text>
            </Col>
            <Col>
              {jobFairData.decorateStartTime ? (
                <Tag color={'green'}>{moment(jobFairData.decorateStartTime).format(DateFormat)}</Tag>
              ) : (
                <Tag color={'red'}>Not enter</Tag>
              )}
              <Tag color='orange'>
                <FontAwesomeIcon icon={faMinus} />
              </Tag>
              {jobFairData.decorateEndTime ? (
                <Tag color={'green'}>{moment(jobFairData.decorateEndTime).format(DateFormat)}</Tag>
              ) : (
                <Tag color={'red'}>Not enter</Tag>
              )}
            </Col>
          </Row>
          <Row className={'time'}>
            <Col span={7}>
              <Text>Public time ({getTimeZoneCode()}):</Text>
            </Col>
            <Col>
              {jobFairData.publicStartTime ? (
                <Tag color={'green'}>{moment(jobFairData.publicStartTime).format(DateFormat)}</Tag>
              ) : (
                <Tag color={'red'}>Not enter</Tag>
              )}
              <Tag color='orange'>
                <FontAwesomeIcon icon={faMinus} />
              </Tag>
              {jobFairData.publicEndTime ? (
                <Tag color={'green'}>{moment(jobFairData.publicEndTime).format(DateFormat)}</Tag>
              ) : (
                <Tag color={'red'}>Not enter</Tag>
              )}
            </Col>
          </Row>
          <Row className={'time'}>
            <Col span={7}>
              <Text>Morning shift ({getTimeZoneCode()}):</Text>
            </Col>
            <Col>
              {jobFairData.morningShift[0] ? (
                <Tag color={'green'}>{jobFairData.morningShift[0]}</Tag>
              ) : (
                <Tag color={'red'}>Not enter</Tag>
              )}
              <Tag color='orange'>
                <FontAwesomeIcon icon={faMinus} />
              </Tag>
              {jobFairData.morningShift[1] ? (
                <Tag color={'green'}>{jobFairData.morningShift[1]}</Tag>
              ) : (
                <Tag color={'red'}>Not enter</Tag>
              )}
            </Col>
          </Row>
          <Row className={'time'}>
            <Col span={7}>
              <Text>Afternoon shift ({getTimeZoneCode()}):</Text>
            </Col>
            <Col>
              {jobFairData.afternoonShift[0] ? (
                <Tag color={'green'}>{jobFairData.afternoonShift[0]}</Tag>
              ) : (
                <Tag color={'red'}>Not enter</Tag>
              )}
              <Tag color='orange'>
                <FontAwesomeIcon icon={faMinus} />
              </Tag>
              {jobFairData.afternoonShift[1] ? (
                <Tag color={'green'}>{jobFairData.afternoonShift[1]}</Tag>
              ) : (
                <Tag color={'red'}>Not enter</Tag>
              )}
            </Col>
          </Row>
        </div>

        <div className={'button-container'}>
          <Button
            className={'button'}
            type={'primary'}
            onClick={handleEditSchedule}
            disabled={isPublish}
            style={{ display: isPublish ? 'none' : 'block' }}>
            Edit schedule
          </Button>
        </div>
      </div>
    </StepComponent>
  );
};
