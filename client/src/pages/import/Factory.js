import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { quantityInStock } from "../../api/factory";
import TableInfo from "../../components/TableInfo/TableInfo";
import Default from "../../Layouts/Default";
import Order from "./Order";

const Factory = () => {
  const [listQuantity, setListQuantity] = useState([]);
  const { id } = useParams();
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
      dataIndex: "amount",
      key: "amount",
    },
    {
      //   title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (_, record) => <Order record={record} />,
    },
  ];

  const loadListQuantity = async () => {
    const response = await quantityInStock(id);
    if (response.success) {
      setListQuantity(response.data);
      console.log(response.data);
    }
  };

  useEffect(() => {
    loadListQuantity();
  }, [id]);

  const dataSource = listQuantity?.map((quantity, index) => {
    return {
      ...quantity,
      name: quantity.factory.name,
      key: index + 1,
      amount: quantity.listProduct.length,
    };
  });

  return (
    <div>
      <Default tagName="nh">
        <TableInfo dataColumn={dataColumn} dataSource={dataSource} />
      </Default>
    </div>
  );
};

export default Factory;
