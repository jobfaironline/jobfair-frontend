import { Button, Empty, Image, Row, Typography } from 'antd';
import { StepComponent } from './Step.component';

const { Text } = Typography;

export const Step1Component = (props) => {
  const { isFinish, handleReviewLayout, handleEditLayout, layoutData, isPublish } = props;
  return (
    <StepComponent isFinish={isFinish}>
      <div className={'title'}>
        <div style={{ flex: 1 }}>
          <Row>
            <Text className={'content'} strong>
              Step 1: Choosing your layout
            </Text>
          </Row>
          <Row>
            <Text>Select your job fair layout</Text>
          </Row>
        </div>

        <div className={'button-container'}>
          <Button
            disabled={!isFinish}
            style={{ marginRight: '0.3rem' }}
            className={'button'}
            type={'primary'}
            onClick={handleReviewLayout}>
            Enter map
          </Button>
          <Button
            className={'button'}
            type={'primary'}
            onClick={handleEditLayout}
            disabled={isPublish}
            style={{ display: isPublish ? 'none' : 'block' }}>
            Change layout
          </Button>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {layoutData?.thumbnailUrl === undefined ? (
          <Empty />
        ) : (
          <Image style={{ borderRadius: '8px' }} width={'100%'} height={'200px'} src={layoutData?.thumbnailUrl} />
        )}
      </div>
    </StepComponent>
  );
};
