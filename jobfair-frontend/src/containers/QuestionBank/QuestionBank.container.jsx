import './QuestionBank.styles.scss';
import { Button, Input, Space, Tooltip, Upload } from 'antd';
import { DeleteOutlined, EyeOutlined, UploadOutlined } from '@ant-design/icons';
import { loadCSVFile, uploadUtil } from '../../utils/uploadCSVUtil';
import { useLocation } from 'react-router-dom';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import CreateQuestionFormContainer from '../forms/CreateQuestionForm/CreateQuestionForm.container';
import JobPositionDetailCollapseComponent from '../../components/customized-components/JobPositionDetailCollapse/JobPositionDetailCollapse.component';
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
  //TODO: for set data when fetch API
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  //pagination
  //TODO: for pagination
  // eslint-disable-next-line no-unused-vars
  const [totalRecord, setTotalRecord] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  //add question modal
  const [addModalVisible, setAddModalVisible] = useState(false);
  //view detail and edit modal
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  //re-render
  const [reRender, setReRender] = useState(false);
  //useLocation
  const location = useLocation();
  const jobPosition = location.state?.jobPosition;

  const fetchData = async () => {
    //
  };
  useLayoutEffect(() => {
    fetchData();
  }, [currentPage, pageSize, reRender]);

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);

    setPageSize(pageSize);
  };

  const handleSearchQuestion = (values) => {
    //TODO: call API to search
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
    //TODO: call API delete + fetch data again.
  };

  const onChangeUpload = async (info) => {
    await uploadUtil(info);
    //force render to fetch data after upload
    setReRender((prevState) => !prevState);
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
        <Space className={'upload-section'}>
          <Upload {...loadCSVFile(onChangeUpload)}>
            <Button icon={<UploadOutlined />}>Upload CSV</Button>{' '}
          </Upload>
        </Space>
      </div>
      <ViewQuestionDetailModalContainer visible={detailModalVisible} onCancel={onCloseDetailModal} />
      <JobPositionDetailCollapseComponent jobPosition={jobPosition} />
      <CreateQuestionFormContainer />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <CommonTableContainer {...questionBankTableProps} />
      </div>
    </div>
  );
};

export default QuestionBankContainer;
