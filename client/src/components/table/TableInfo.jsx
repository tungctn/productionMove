import { LoadingOutlined } from '@ant-design/icons';
import { Select, Table } from 'antd';
import React, { useState } from 'react';
import './index.scss';

const TableInfo = (props) => {
  const { dataColumn, dataSource, onRow, loading, setTitle, ...other } = props;
  const [pagination, setPagination] = useState({
    position: ['bottomCenter'],
    pageSize: 5,
    showSizeChanger: false,
  });
  const tableLoading = {
    spinning: loading,
    indicator: <LoadingOutlined />,
  };

  const handleChange = (value) => {
    setPagination((preState) => ({ ...preState, pageSize: value }));
  };

  return (
    <div>
      <div>
        <span className="text-[20px] font-bold">Số dòng hiển thị: </span>
        <Select
          defaultValue={5}
          onChange={handleChange}
          options={[
            {
              value: 5,
              label: '5',
            },
            {
              value: 10,
              label: '10',
            },
            {
              value: 15,
              label: '15',
            },
          ]}
        />
      </div>

      <Table
        columns={dataColumn}
        dataSource={dataSource}
        pagination={pagination}
        onRow={onRow}
        loading={tableLoading}
        title={setTitle}
        id="table"
        {...other}
      />
    </div>
  );
};

export default TableInfo;
