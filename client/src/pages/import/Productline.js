import { Button } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProduceSearch from "../../components/Produce/ProduceSearch";
import TableInfo from "../../components/TableInfo/TableInfo";
import { useProductLineContext } from "../../contexts/ProductLineContext";
import Default from "../../Layouts/Default";

const Import = () => {
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

  useEffect(() => {
    loadListProductLine();
  }, []);

  const dataSource = listProductLine.map((productline, index) => {
    return {
      ...productline,
      key: index + 1,
      createdAt: productline.createdAt.split("T")[0],
    };
  });
  return (
    <div className="w-full">
      <Default tagName="nh">
        <ProduceSearch />

        <div className="mt-5">
          <TableInfo
            dataColumn={dataColumn}
            dataSource={dataSource}
            onRow={(r) => ({
              onClick: () => {
                navigate(`/import/productline/${r._id}`);
              },
            })}
            setTitle={() => "Chọn dòng sản phẩm cần nhập"}
          />
        </div>
      </Default>
    </div>
  );
};

export default Import;
