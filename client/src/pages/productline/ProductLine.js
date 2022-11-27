import { Select } from "antd";
import React, { useEffect, useState } from "react";
import TableInfo from "../../components/TableInfo/TableInfo";
import { useAppContext } from "../../contexts/AppContext";
import Default from "../../Layouts/Default";

const ProductLine = () => {
  const dataColumn = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
  ];
  const [pagination, setPagination] = useState({
    position: ["bottomCenter"],
    pageSize: 5,
    showSizeChanger: false,
  });

  const {
    authState: { listProductLine },
  } = useAppContext();

  const dataSource = listProductLine.map((productline, index) => {
    return {
      key: index + 1,
      ...productline,
    };
  });

  const handleChange = (value) => {
    setPagination((preState) => ({ ...preState, pageSize: value }));
  };

  useEffect(() => {
    console.log(listProductLine);
    // setDataSource()
  }, []);

  return (
    <div>
      <Default>
        <div style={{ width: "80%", margin: "0 auto" }}>
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
          <TableInfo
            dataColumn={dataColumn}
            dataSource={dataSource}
            pagination={pagination}
            onRow={(r) => ({
              onClick: () => {
                console.log(r._id);
              },
            })}
          />
        </div>
      </Default>
    </div>
  );
};

export default ProductLine;
