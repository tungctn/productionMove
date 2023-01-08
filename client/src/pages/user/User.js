import React, { useEffect } from "react";
import SearchUser from "../../components/SearchFilter/SearchUser";
import TableInfo from "../../components/TableInfo/TableInfo";
import DeleteUser from "../../components/UserForm/DeleteUser";
import EditUser from "../../components/UserForm/EditUser";
import { useAppContext } from "../../contexts/AppContext";
import { useUserContext } from "../../contexts/UserContext";
import Default from "../../Layouts/Default";

const User = () => {
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
        <>
          <EditUser id={record._id} />
          <DeleteUser id={record._id} />
        </>
      ),
    },
  ];

  const {
    userState: { listUser, isLoading },
    loadListUser,
  } = useUserContext();

  const {
    convertRoleToName,
    authState: { user },
    checkMiddleware,
  } = useAppContext();

  useEffect(() => {
    checkMiddleware(user, () => {
      loadListUser();
    });
  }, []);

  const dataSource = listUser?.map((user, index) => {
    return {
      ...user,
      key: index + 1,
      role: convertRoleToName(user.role),
    };
  });

  return (
    <div className="w-full">
      <Default tagName="tk">
        <SearchUser data={dataSource} />
        <div className="mt-5">
          <div className="w-11/12 mx-auto">
            <TableInfo
              dataColumn={dataColumn}
              dataSource={dataSource}
              loading={isLoading}
            />
          </div>
        </div>
      </Default>
    </div>
  );
};

export default User;
