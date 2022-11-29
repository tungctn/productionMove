import { Button, Pagination } from "antd";
import { Input, Table } from "antd";
import Title from "antd/lib/skeleton/Title";
import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import App from "../../App";
import ProduceSearch from "../../components/ProduceComponent/ProduceSearch";
import { AppContext, useAppContext } from "../../contexts/AppContext";
import Default from "../../Layouts/Default";
import "./index.css";

const Home = () => {
  const { Search } = Input;
  const {
    handleProfile,
    authState: { user },
    authState,
  } = useAppContext();
  useEffect(() => {
    console.log(user);
    // console.log(authState);
  }, []);

  const onSearch = (value) => {
    console.log(value);
  };
  const Column = [
    {
      title: "Mã định danh",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Dòng sản phẩm",
      dataIndex: "productline",
      key: "productline",
    },
    {
      title: "Nơi sản xuất",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Ngày sản xuất",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];
  const data = [
    {
      key: "1",
      id: "A",
      productline: "A",
      location: "A",
      date: "A",
    },
    {
      key: "1",
      id: "A",
      productline: "A",
      location: "A",
      date: "A",
    },
    {
      key: "1",
      id: "A",
      productline: "A",
      location: "A",
      date: "A",
    },
    {
      key: "1",
      id: "A",
      productline: "A",
      location: "A",
      date: "A",
    },
  ];

  return (
    <div className="w-full">
      <Default tagName="kho">
        <ProduceSearch></ProduceSearch>
        <div className="mt-5">
          <Table
            columns={Column}
            dataSource={data}
            pagination={{ position: ["bottomCenter"] }}></Table>
        </div>
      </Default>
    </div>
  );
};

export default Home;
