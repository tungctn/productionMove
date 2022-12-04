import { Button, Pagination } from "antd";
import { Input, Table } from "antd";
import Title from "antd/lib/skeleton/Title";
import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import App from "../../App";
import ProduceSearch from "../../components/Produce/ProduceSearch";
import TableInfo from "../../components/TableInfo/TableInfo";
import { AppContext, useAppContext } from "../../contexts/AppContext";
import { useProductContext } from "../../contexts/ProductContext";
import Default from "../../Layouts/Default";
import "./index.css";

const Home = () => {
  const { Search } = Input;
  const {
    handleProfile,
    authState: { user },
    authState,
  } = useAppContext();
  const {
    productState: { listProduct },
  } = useProductContext();
  const dataColumn = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Mã định danh",
      dataIndex: "identifier",
      key: "identifier",
    },
    {
      title: "Dòng sản phẩm",
      dataIndex: "productLine",
      key: "productLine",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Ngày sản xuất",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];
  const dataSource = listProduct.map((product, index) => {
    return {
      ...product,
      key: index + 1,
      // productLine: product.productLine.name
      createdAt: product.createdAt.split("T")[0],
    };
  });

  return (
    <div className="w-full">
      <Default tagName="kho">
        <ProduceSearch></ProduceSearch>
        <div className="mt-5">
          <TableInfo dataColumn={dataColumn} dataSource={dataSource} />
        </div>
      </Default>
    </div>
  );
};

export default Home;
