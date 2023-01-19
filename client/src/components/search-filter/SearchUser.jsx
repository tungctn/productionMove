import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import AddUser from "../user/AddUser";
import { useUserContext } from "../../contexts/UserContext";
import { useAppContext } from "../../contexts/AppContext";

const SearchUser = () => {
  const [form, setForm] = useState({});
  const { convertRoleToName } = useAppContext();
  const { handleSearchUser } = useUserContext();
  useEffect(() => {
    handleSearchUser({ ...form });
  }, [form]);
  const onValueChange = (e) => {
    setForm({ ...form, input: e.target.value });
  };
  const onRoleChange = (value) => {
    setForm({ ...form, role: value });
  };
  const onFilterChange = (value) => {
    setForm({ ...form, filter: value });
  };
  const selectRole = (
    <>
      <Select
        className="mt-[5px]"
        placeholder="Chuc vu"
        style={{ width: 80 }}
        onChange={onRoleChange}
        options={[
          {
            value: 2,
            label: convertRoleToName(2),
          },
          {
            value: 3,
            label: convertRoleToName(3),
          },
          {
            value: 4,
            label: convertRoleToName(4),
          },
        ]}
      />
    </>
  );
  const selectFilter = (
    <Select
      className="mt-[5px]"
      placeholder="Lọc theo"
      style={{ width: 80 }}
      onChange={onFilterChange}
      options={[
        {
          value: "name",
          label: "Tên nhân viên",
        },
        {
          value: "email",
          label: "Email",
        },
      ]}
    />
  );
  return (
    <div className="w-1/3 mr-10 mt-5 ml-auto">
      <div className="container rounded-2xl">
        <div className="flex items-center space-x-5">
          <Input
            placeholder="Tìm kiếm ở đây!"
            onChange={onValueChange}
            allowClear
            //style={{ width: 120 }}
            addonBefore={selectRole}
            addonAfter={selectFilter}
          />
          <AddUser />
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
