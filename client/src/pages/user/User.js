import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProduceSearch from "../../components/Produce/ProduceSearch";
import TableInfo from "../../components/TableInfo/TableInfo";
import AddUser from "../../components/UserForm/AddUser";
import DeleteUser from "../../components/UserForm/DeleteUser";
import EditUser from "../../components/UserForm/EditUser";
import { useAppContext } from "../../contexts/AppContext";
import { useProductLineContext } from "../../contexts/ProductLineContext";
import { useUserContext } from "../../contexts/UserContext";
import Default from "../../Layouts/Default";

const User = () => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState();
  const dataColumn = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Chức vụ",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <div>
          <EditUser id={record._id} />
          <DeleteUser id={record._id} />
        </div>
      ),
    },
  ];

  const navigate = useNavigate();

  const {
    userState: { listUser },
    loadListUser,
  } = useUserContext();

  const { convertRoleToName } = useAppContext();

  const dataSource = listUser.map((user, index) => {
    return {
      ...user,
      key: index + 1,
      role: convertRoleToName(user.role),
    };
  });

  const handelCancel = () => {
    setVisible(false);
  };

  const setValue = (id) => {
    setVisible(true);
    setId(id);
  };

  return (
    <div className="w-full">
      <Default tagName="tk">
        <ProduceSearch />
        <div className="mt-5">
          <AddUser />
          <TableInfo dataColumn={dataColumn} dataSource={dataSource} />
        </div>
      </Default>
    </div>
  );
};

export default User;
