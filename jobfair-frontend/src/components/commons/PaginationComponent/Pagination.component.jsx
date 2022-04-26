import { Pagination } from 'antd';
import React from 'react';

const PaginationComponent = ({ handlePageChange, totalRecord, disable = false }) => (
  <>
    <Pagination
      total={totalRecord}
      onChange={(page, pageSize) => handlePageChange(page, pageSize)}
      showSizeChanger
      showQuickJumper
      showTotal={(total) => `Total ${total} items`}
      pageSizeOptions={[5, 10, 15, 20]}
      disabled={disable}
    />
  </>
);

export default PaginationComponent;
