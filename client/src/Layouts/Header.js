import React from "react";
import {DownOutlined} from '@ant-design/icons';
import { Dropdown, Space } from "antd";

const items = [
    {
        key: 1,
        label: (
            <a className="text">Profile</a>
        )
    },
    {
        key: 2,
        label:(
            <a>Log out</a>
        )
    }
]

const Header = () => {
    return (
    <div className=" bg-white drop-shadow-xl h-16">
        <div className="flex flex-row-reverse w-full h-full">
            <Dropdown menu={{items}} className="mr-5 my-auto">
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    Nhà sản xuất
                    <DownOutlined />
                </Space>
            </a>
            </Dropdown>
        </div>
    </div>
    );


}

export default Header;