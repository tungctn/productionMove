import { LeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { quantityInStock } from "../../api/factory";
import TableInfo from "../../components/TableInfo/TableInfo";
import Default from "../../Layouts/Default";
import Order from "./Order";
import { useAppContext } from "../../contexts/AppContext";

const Factory = () => {
  const [listQuantity, setListQuantity] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    openNotification,
    authState: { user, url },
    gotoMainPage,
  } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();
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
      render: (_, record) => {
        return <Order record={record} />;
      },
    },
  ];

  const loadListQuantity = async () => {
    setLoading(true);
    const response = await quantityInStock(id);
    if (response.success) {
      setListQuantity(response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.role !== 1) {
      loadListQuantity();
    } else {
      openNotification("error", "Bạn không có quyền truy cập");
      gotoMainPage(user);
    }
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
        <div className="w-1/12 mt-5">
          <Link to={`/import/productline/${id}`}>
            <LeftOutlined></LeftOutlined>
          </Link>
        </div>
        <div className="w-11/12 mt-5 mx-auto">
          <TableInfo
            dataColumn={dataColumn}
            dataSource={dataSource}
            loading={loading}
          />
        </div>
      </Default>
    </div>
  );
};

export default Factory;
