import { Input } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import React from "react";
import { useState } from "react";
import { useProductLineContext } from "../../contexts/ProductLineContext";

const SearchProductLine = (props) => {
  const { handleSearchProductLine } = useProductLineContext();
  const onValueChange = async (e) => {
    await handleSearchProductLine({ input: e.target.value });
  };
  return (
    <div className="w-1/3 mr-10 mt-5 ml-auto">
      <div className="container rounded-2xl">
        <div className="flex items-center space-x-5">
          <Input
            placeholder="Tìm kiếm ở đây!"
            onChange={onValueChange}
            allowClear
          />
        </div>
      </div>
    </div>
  );
};

export default SearchProductLine;
