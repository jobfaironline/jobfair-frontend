import React from 'react';
import {Pagination} from "antd";

const PaginationComponent = ({handlePageChange, totalRecord}) => {

    return (
        <>
            <Pagination
                total={totalRecord}
                onChange={(page, pageSize) => handlePageChange(page, pageSize)}
                showSizeChanger
                showQuickJumper
                showTotal={total => `Total ${total} items`}
                pageSizeOptions={[5, 10, 15, 20]}
            />
        </>
    );
};

export default PaginationComponent;