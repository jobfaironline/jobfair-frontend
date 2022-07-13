import { Pagination } from 'antd';
import React, { useState } from 'react';

const PaginationComponent = ({ handlePageChange, totalRecord, disable = false }) => {
  const [currentPageNum, setCurrentPageNum] = useState(1);
  return (
    <>
      <Pagination
        current={currentPageNum}
        total={totalRecord}
        onChange={(page, pageSize) => {
          setCurrentPageNum(page);
          handlePageChange(page, pageSize);
        }}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `Total ${total} items`}
        pageSizeOptions={[5, 10, 15, 20]}
        disabled={disable}
      />
    </>
  );
};

export default PaginationComponent;
