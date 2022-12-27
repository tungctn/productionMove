import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { useUserContext } from "../../contexts/UserContext";
import { useAppContext } from "../../contexts/AppContext";
import { useProductContext } from "../../contexts/ProductContext";
import { useProductLineContext } from "../../contexts/ProductLineContext";

const SearchProduct = (props) => {
  const { data } = props;
  const [form, setForm] = useState({});
  const { convertRoleToName } = useAppContext();
  const { handleSearchUser } = useUserContext();
  const { handleSearchProduct } = useProductContext();
  const {
    productlineState: { listProductLine },
    loadListProductLine,
  } = useProductLineContext();
  useEffect(() => {
    // handleSearchUser({ ...form });
    handleSearchProduct({ ...form });
    console.log(form);
  }, [form]);
  useEffect(() => {
    loadListProductLine();
  }, []);
  const onValueChange = (e) => {
    setForm({ ...form, input: e.target.value });
    console.log(form);
  };
  const onProductLineChange = (value) => {
    setForm({ ...form, prdl: value });
    console.log(form);
  };
  const onStatusChange = (value) => {
    console.log(value);
    setForm({ ...form, status: value });
  };
  const dataStatus = [
    {
      value: 0,
      label: "Mới sản xuất",
    },
    {
      value: 1,
      label: "Được đưa về đại lý",
    },
    {
      value: 2,
      label: "Đã bán",
    },
    {
      value: 3,
      label: "Lỗi cần bảo hành",
    },
    {
      value: 4,
      label: "Đang bảo hành",
    },
    {
      value: 5,
      label: "Đã bảo hành xong",
    },
    {
      value: 6,
      label: "Đã trả lại cho khách hàng",
    },
    {
      value: 7,
      label: "Lỗi, cần đưa về cơ sở sản xuất",
    },
    {
      value: 8,
      label: "Lỗi, đã đưa về cơ sở sản xuất",
    },
    {
      value: 9,
      label: "Lỗi cần thu hồi",
    },
    {
      value: 10,
      label: "Đã hết thời gian bảo hành",
    },
    {
      value: 11,
      label: "Trả lại cơ sở sản xuất do lâu không được bán",
    },
  ];
  const dataProductLine = listProductLine?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });
  console.log(dataProductLine);
  return (
    <div className="w-1/3 mr-10 mt-5 ml-auto">
      <div className="container rounded-2xl">
        <Select
          className="mt-[5px]"
          placeholder="Dòng sản phẩm"
          style={{ width: 120 }}
          onChange={onProductLineChange}
          options={dataProductLine}
        />
        <Select
          className="mt-[5px]"
          placeholder="Trạng thái"
          style={{ width: 120 }}
          onChange={onStatusChange}
          options={dataStatus}
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

export default SearchProduct;
