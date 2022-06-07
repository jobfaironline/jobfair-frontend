import './SampleItemList.style.scss';
import { Button, Card } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import React from 'react';

export const SampleItemMenu = (props) => {
  const { items, onItemClick, selectedItemId } = props;
  const isItemSelected = (id) => selectedItemId === id;

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {items.map((item) => (
        <CardElement
          itemId={item.id}
          title={item.name}
          key={item.id}
          onClick={onItemClick(item.id)}
          selected={isItemSelected(item.id)}
          imgUrl={item?.thumbnailUrl}
        />
      ))}
    </ScrollMenu>
  );
};

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);
  return (
    <Button disabled={isFirstItemVisible} onClick={() => scrollPrev()} style={{ height: '105px' }}>
      <LeftOutlined />
    </Button>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);
  return (
    <Button disabled={isLastItemVisible} onClick={() => scrollNext()} style={{ height: '105px' }}>
      <RightOutlined />
    </Button>
  );
}

function CardElement({ onClick, selected, title, imgUrl }) {
  return (
    <div onClick={onClick} tabIndex={0}>
      <div style={{ border: ` ${!!selected ? '1px solid blue' : 'none'}` }}>
        <Card
          style={{ width: '120px' }}
          cover={<img alt='example' src={imgUrl} style={{ width: '100%' }} />}
          bodyStyle={{ padding: '0.5rem' }}>
          <Card.Meta title={title} />
        </Card>
      </div>
    </div>
  );
}
