import { Input } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import React from "react";
import { useState } from "react";

const ProduceSearch = () => {
    const [name, setName] = useState('');

    return (
        <div className="w-1/3 mr-10 mt-5 ml-auto">
            <div className="container rounded-2xl">
                <div className="flex items-center space-x-5">
                    <Input
                        placeholder="Search Here!"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        allowClear
                    />
                    <div  className="w-[40px] h-[40px] rounded-full border border-solid border-gray-300 hover:border-blue-500">
                        <button className="mt-[5px]">
                            <SearchOutlined style={{
                                color: '#1677ff',
                                width: '40px',
                            }} />
                        </button>
                    </div>
                    <div  className="w-[40px] h-[40px] rounded-full border border-solid border-gray-300 hover:border-blue-500">
                        <button className="mt-[5px]">
                            <FilterOutlined style={{
                                color: '#1677ff',
                                width: '40px',
                            }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ProduceSearch;