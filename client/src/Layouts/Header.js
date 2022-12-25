import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useAppContext } from "../contexts/AppContext";
import { Link } from "react-router-dom";

const Header = () => {
  const {
    handleLogout,
    authState: { user },
  } = useAppContext();
  const items = [
    {
      key: 1,
      label: (
        <Link className="text" to="/profile">
          Profile
        </Link>
      ),
    },
    {
      key: 2,
      label: <a onClick={handleLogout}>Log out</a>,
    },
  ];
  return (
    <div className=" bg-white drop-shadow-xl h-16">
      <div className="flex flex-row-reverse w-full h-full">
        <Dropdown menu={{ items }} className="mr-5 my-auto">
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {user.name}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
