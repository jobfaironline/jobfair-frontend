import './QuestionBank.styles.scss';
import { DeleteOutlined, EyeOutlined, FileAddOutlined } from '@ant-design/icons';
import { Input, Space, Tooltip } from 'antd';
import AddQuestionModalContainer from '../AddQuestionModal/AddQuestionModal.container';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import QuestionBankTableColumn from '../QuestionBankTable/QuestionBankTable.column';
import React, { useLayoutEffect, useState } from 'react';
import ViewQuestionDetailModalContainer from '../ViewQuestionDetailModal/ViewQuestionDetailModal.container';

const fakeData = [
  {
    no: 1,
    id: 'id1',
    content: 'abcccccc'
  },
  {
    no: 2,
    id: 'id2',
    content: 'abcccccc'
  },
  {
    no: 3,
    id: 'id3',
    content: 'abcccccc'
  },
  {
    no: 4,
    id: 'id4',
    content: 'abcccccc'
  },
  {
    no: 5,
    id: 'id5',
    content: 'abcccccc'
  }
];

const { Search } = Input;

const QuestionBankContainer = () => {
  const [data, setData] = useState([]);
  //pagination
  const [totalRecord, setTotalRecord] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  //add question modal
  const [addModalVisible, setAddModalVisible] = useState(false);
  //view detail and edit modal
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const fetchData = async () => {
    //
  };
  useLayoutEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);

    setPageSize(pageSize);
  };

  const handleSearchQuestion = (values) => {};

  const handleAddQuestion = () => {
    setAddModalVisible(true);
  };
  const onCloseAddModal = () => {
    setAddModalVisible(false);
  };

  const handleViewDetail = () => {
    setDetailModalVisible(true);
  };

  const onCloseDetailModal = () => {
    setDetailModalVisible(false);
  };

  const handleDeleteQuestion = (id) => {
    console.log(id);
    //TODO: call API delete + fetch data again.
  };

  const questionBankTableProps = {
    tableData: fakeData,
    tableColumns: QuestionBankTableColumn,
    onSearch: () => {
      //TODO: fetch data for search
    },
    extra: [
      {
        title: 'Actions',
        key: 'action',
        render: (text, record) => ({
          props: {
            style: { textAlign: 'center', width: '10rem' }
          },
          children: (
            <Space size='middle'>
              <>
                <a onClick={() => handleViewDetail()}>
                  <Tooltip title='View question detail'>
                    <EyeOutlined />
                  </Tooltip>
                </a>
                <a onClick={() => handleDeleteQuestion(record.id)}>
                  <Tooltip title='Delete the question'>
                    <DeleteOutlined />
                  </Tooltip>
                </a>
              </>
            </Space>
          )
        })
      }
    ],
    paginationObject: {
      handlePageChange,
      totalRecord
    }
  };

  return (
    <div>
      <div className={'header'}>
        <Search placeholder='Search question' onSearch={handleSearchQuestion} className={'search-bar'} />
        <div>
          <Tooltip title='Add more question'>
            <FileAddOutlined onClick={handleAddQuestion} />
          </Tooltip>
        </div>
      </div>
      <AddQuestionModalContainer visible={addModalVisible} onCancel={onCloseAddModal} />
      <ViewQuestionDetailModalContainer visible={detailModalVisible} onCancel={onCloseDetailModal} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <CommonTableContainer {...questionBankTableProps} />
      </div>
    </div>
  );
};

export default QuestionBankContainer;
