import { Button, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import "./index.scss";

const TableInfo = (props) => {
  const { dataColumn, dataSource, onRow, isLoading } = props;
  const [pagination, setPagination] = useState({
    position: ["bottomCenter"],
    pageSize: 3,
    showSizeChanger: false,
  });

  const handleChange = (value) => {
    setPagination((preState) => ({ ...preState, pageSize: value }));
  };

  return (
    <div>
      <Select
        defaultValue={3}
        onChange={handleChange}
        options={[
          {
            value: 1,
            label: "1",
          },
          {
            value: 2,
            label: "2",
          },
          {
            value: 3,
            label: "3",
          },
        ]}
      />

      <Table
        columns={dataColumn}
        dataSource={dataSource}
        pagination={pagination}
        onRow={onRow}
        loading={isLoading}
      />
    </div>
  );
};

export default TableInfo;
