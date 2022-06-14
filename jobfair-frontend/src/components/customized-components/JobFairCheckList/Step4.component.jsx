import { Button, Row, Typography } from 'antd';
import { StepComponent } from './Step.component';

const { Text } = Typography;

export const Step4Component = (props) => {
  const { isFinish, handleEditLandingPage, handleReviewLandingPage, isPublish } = props;
  return (
    <StepComponent isFinish={isFinish}>
      <div className={'title'}>
        <div style={{ flex: 1 }}>
          <Row>
            <Text className={'content'} strong>
              Step 4: Create landing page
            </Text>
          </Row>
          <Row>
            <Text>Decorate your job fair's landing page</Text>
          </Row>
        </div>

        <div className={'button-container'}>
          <Button
            style={{ marginRight: '0.3rem', display: isPublish ? 'none' : 'block' }}
            className={'button'}
            type={'primary'}
            disabled={isPublish}
            onClick={handleEditLandingPage}>
            Decorate landing page
          </Button>
          <Button disabled={!isFinish} className={'button'} type={'primary'} onClick={handleReviewLandingPage}>
            Review
          </Button>
        </div>
      </div>
    </StepComponent>
  );
};
