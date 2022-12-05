import React from "react";
import TableInfo from "../../components/TableInfo/TableInfo";
import Default from "../../Layouts/Default";

const Factory = () => {
  const dataColumn = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên nhà máy",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Số hàng tồn kho",
      dataIndex: "stock",
      key: "stock",
    },
  ];

  const dataSource = [];

  return (
    <div>
      <Default>
        <TableInfo dataColumn={dataColumn} dataSource={dataSource} />
      </Default>
    </div>
  );
};

export default Factory;
