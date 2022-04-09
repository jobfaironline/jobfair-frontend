import React from 'react';

export const DragAndDropResumeComponent = (props) => {
  const { onDragOver, onDrop } = props;

  return (
    <div
      style={{
        width: '100%',
        padding: '20px',
        background: '#fafafa',
        border: '1px dashed #d9d9d9',
        textAlign: 'center'
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}>
      Drag your cv here
    </div>
  );
};
