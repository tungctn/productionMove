import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { useProductContext } from "../../contexts/ProductContext";
import { useProductLineContext } from "../../contexts/ProductLineContext";

const SearchProduct = () => {
  const [form, setForm] = useState({});
  const { handleSearchProduct } = useProductContext();
  const {
    productlineState: { listProductLine },
    loadListProductLine,
  } = useProductLineContext();

  useEffect(() => {
    handleSearchProduct({ ...form });
  }, [form]);

  useEffect(() => {
    loadListProductLine();
  }, []);

  const onValueChange = (e) => {
    setForm({ ...form, input: e.target.value });
  };
  const onProductLineChange = (value) => {
    setForm({ ...form, prdl: value });
  };
  const onStatusChange = (value) => {
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
      value: item?._id,
      label: item?.name,
    };
  });
  return (
    <div className="w-1/3 mr-10 mt-5 ml-auto">
      <div className="container rounded-2xl">
        <div className="flex-row space-x-2">
          <Select
            className="mb-[5px]"
            placeholder="Dòng sản phẩm"
            style={{ width: 120 }}
            onChange={onProductLineChange}
            options={dataProductLine}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            optionFilterProp="children"
          />
          <Select
            className="mb-[5px]"
            placeholder="Trạng thái"
            style={{ width: 120 }}
            onChange={onStatusChange}
            options={dataStatus}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            optionFilterProp="children"
          />
        </div>
        <div>
          <Input
            placeholder="Tìm kiếm ở đây!"
            onChange={onValueChange}
            allowClear
            style={{ width: 244 }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
