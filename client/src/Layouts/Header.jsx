import React, { useEffect } from 'react';
import { BellOutlined, DownOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Space } from 'antd';
import { useAppContext } from '../contexts/AppContext';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const { setVisible, visible, dataSource } = props;
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
        <Dropdown menu={{ items }} className="mx-5 my-auto">
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar src={user?.img} className="cursor-pointer" size="large" />
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <span>
          <p className="rounded-[50%] border-2 w-[25px] h-[25px] bg-red-600 text-white">
            {dataSource?.length}
          </p>
        </span>
        <BellOutlined
          className="text-[30px] my-auto cursor-pointer"
          onClick={() => {
            setVisible(!visible);
          }}
        />
      </div>
    </div>
  );
};

export default Header;
