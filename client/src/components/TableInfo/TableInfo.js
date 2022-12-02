import { Button, Select, Table } from "antd";
import React, { useState } from "react";
import "./index.scss";

const TableInfo = (props) => {
  const { dataColumn, dataSource, onRow } = props;
  const [pagination, setPagination] = useState({
    position: ["bottomCenter"],
    pageSize: 1,
    showSizeChanger: false,
  });
  const handleChange = (value) => {
    setPagination((preState) => ({ ...preState, pageSize: value }));
  };
  return (
    <div>
      <Select
        defaultValue={1}
        // style={{ width: 120 }}
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
      />
    </div>
  );
};

export default TableInfo;
