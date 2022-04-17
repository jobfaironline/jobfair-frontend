import './SideBar.style.scss';
import { Button, Col, Row } from 'antd';
import React from 'react';

export const SideBarComponent = ({
  leftSide,
  rightSide,
  ratio,
  onNext,
  onPrev,
  isNextButtonDisable,
  isPrevButtonDisable
}) => (
  <Row wrap={false} className={'organize-job-fair-side-bar'}>
    <Col flex={ratio.toString()}>{leftSide}</Col>
    <Col flex={(1 - ratio).toString()}>
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)' }}>
        {rightSide}
        <div className={'button-container'}>
          <Button className={'confirm-button'} type='primary' onClick={onNext} disabled={isNextButtonDisable}>
            Choose
          </Button>
        </div>
      </div>
    </Col>
  </Row>
);
