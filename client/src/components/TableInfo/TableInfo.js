import { Table } from "antd";
import React from "react";
import "./index.scss";

const TableInfo = (props) => {
  const { dataColumn, dataSource, pagination, onRow } = props;

  return (
    <div>
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
