import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { useUserContext } from "../../contexts/UserContext";
import { useAppContext } from "../../contexts/AppContext";

const SearchUser = (props) => {
  const { data } = props;
  const [form, setForm] = useState({});
  const { convertRoleToName } = useAppContext();
  const { handleSearchUser } = useUserContext();
  useEffect(() => {
    handleSearchUser({ ...form });
  }, [form]);
  const onValueChange = (e) => {
    setForm({ ...form, input: e.target.value });
    console.log(form);
  };
  const onRoleChange = (value) => {
    setForm({ ...form, role: value });
    console.log(form);
  };
  const onFilterChange = (value) => {
    console.log(value);
    setForm({ ...form, filter: value });
  };
  return (
    <div className="w-1/3 mr-10 mt-5 ml-auto">
      <div className="container rounded-2xl">
        <Select
          className="mt-[5px]"
          placeholder="Chuc vu"
          style={{ width: 120 }}
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
        <Select
          className="mt-[5px]"
          placeholder="Lọc theo"
          style={{ width: 120 }}
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
        <div className="flex items-center space-x-5">
          <Input
            placeholder="Tìm kiếm ở đây!"
            onChange={onValueChange}
            allowClear
            style={{ width: 120 }}
          />
          <div className="w-[40px] h-[40px] rounded-full border border-solid border-gray-300 hover:border-blue-500">
            <button className="mt-[5px]">
              <SearchOutlined
                style={{
                  color: "#1677ff",
                  width: "40px",
                }}
              />
            </button>
          </div>
          <div className="w-[40px] h-[40px] rounded-full border border-solid border-gray-300 hover:border-blue-500">
            <button className="mt-[5px]">
              <FilterOutlined
                style={{
                  color: "#1677ff",
                  width: "40px",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
