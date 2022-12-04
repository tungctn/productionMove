import { Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProduceSearch from "../../components/Produce/ProduceSearch";
import TableInfo from "../../components/TableInfo/TableInfo";
import { useAppContext } from "../../contexts/AppContext";
import { useProductLineContext } from "../../contexts/ProductLineContext";
import Default from "../../Layouts/Default";

const ProductLine = () => {
  const dataColumn = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên dòng sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Mã dòng sản phẩm",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Ngày sản xuất",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  const navigate = useNavigate();

  const {
    productlineState: { listProductLine },
    loadListProductLine,
  } = useProductLineContext();

  const dataSource = listProductLine.map((productline, index) => {
    return {
      ...productline,
      key: index + 1,
      createdAt: productline.createdAt.split("T")[0],
    };
  });

  useEffect(() => {
    loadListProductLine();
  }, []);

  return (
    <div className="w-full">
      <Default tagName="dsp">
        <ProduceSearch />
        <div className="mt-5">
          <Button
            className="float-right"
            type="primary"
            onClick={() => {
              navigate("/productline/create");
            }}>
            Add
          </Button>
          <TableInfo
            dataColumn={dataColumn}
            dataSource={dataSource}
            onRow={(r) => ({
              onClick: () => {
                navigate(`/productline/${r._id}`);
              },
            })}
          />
        </div>
      </Default>
    </div>
  );
};

export default ProductLine;
