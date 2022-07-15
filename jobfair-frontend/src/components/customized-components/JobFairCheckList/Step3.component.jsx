import { Button, Col, Row, Tooltip, Typography } from 'antd';
import { StepComponent } from './Step.component';
const { Text } = Typography;

export const Step3Component = (props) => {
  const { isFinish, statistics, handleEditAssignEmployee, isPublish, isChooseLayout, handleViewDetail } = props;
  return (
    <StepComponent isFinish={isFinish}>
      <div className={'title'}>
        <div style={{ flex: 1 }}>
          <Text className={'content'} strong>
            Step 3: Assign employee
          </Text>
          <Row className={'time'}>
            <Col span={10}>
              <Text>Number of assigned employee: </Text>
            </Col>
            <Col>
              <Text strong style={{ color: statistics.assignedEmployeeNum === 0 ? 'red' : 'green' }}>
                {statistics.assignedEmployeeNum}
              </Text>
            </Col>
          </Row>
          <Row className={'time'}>
            <Col span={10}>
              <Text>Number of assigned booth: </Text>
            </Col>
            <Col>
              <Text strong style={{ color: statistics.assignedBoothNum === 0 ? 'red' : 'green' }}>
                {statistics.assignedBoothNum}
              </Text>
            </Col>
          </Row>
        </div>

        <div className={'button-container'}>
          <Button onClick={handleViewDetail} className={'button'} type={'primary'} style={{ marginRight: '5px' }}>
            View detail
          </Button>
          {!isChooseLayout ? (
            <Tooltip title={'Please choose layout for job fair first'}>
              {/* need to wrap span outside disable button if using tool tip: https://github.com/react-component/tooltip/issues/18#issuecomment-411476678*/}
              <span>
                <Button
                  style={{ pointerEvents: 'none' }}
                  className={'button'}
                  type={'primary'}
                  disabled={!isChooseLayout}
                  onClick={handleEditAssignEmployee}>
                  Assign more
                </Button>
              </span>
            </Tooltip>
          ) : (
            <Button
              className={'button'}
              type={'primary'}
              disabled={isPublish}
              onClick={handleEditAssignEmployee}
              style={{ display: isPublish ? 'none' : 'block' }}>
              Assign more
            </Button>
          )}
        </div>
      </div>
    </StepComponent>
  );
};
