import { Select, Table } from "antd";
import React, { useState } from "react";
import "./index.scss";

const TableInfo = (props) => {
  const { dataColumn, dataSource, onRow } = props;
  const [pagination, setPagination] = useState({
    position: ["bottomCenter"],
    pageSize: 5,
    showSizeChanger: false,
  });
  const handleChange = (value) => {
    setPagination((preState) => ({ ...preState, pageSize: value }));
  };
  return (
    <div>
      <Select
        defaultValue={5}
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          {
            value: 5,
            label: "5",
          },
          {
            value: 10,
            label: "10",
          },
          {
            value: 15,
            label: "15",
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
