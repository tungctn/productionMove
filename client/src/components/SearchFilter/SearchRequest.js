import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useAppContext } from "../../contexts/AppContext";
import { useRequestContext } from "../../contexts/RequestContext";

const SearchRequest = () => {
  const [form, setForm] = useState({});
  const { convertTypeToName, convertStatusToName } = useAppContext();
  const {
    requestState: { listRequest },
    loadListRequest,
    handleSearchRequest,
  } = useRequestContext();
  useEffect(() => {
    handleSearchRequest({ ...form });
  }, [form]);
  useEffect(() => {
    loadListRequest();
  }, []);
  const onStatusChange = (value) => {
    setForm({ ...form, status: value });
  };
  const onRequesterChange = (value) => {
    setForm({ ...form, requester: value });
  };
  const onTypeChange = (value) => {
    setForm({ ...form, type: value });
  };
  let dataType = [0, 1, 2, 3, 4, 5, 6].map((item) => {
    return {
      value: item,
      label: convertTypeToName(item),
    };
  });
  dataType = [{ value: "", label: "" }, ...dataType];
  let dataStatus = [1, 2, 3, 4].map((item) => {
    return {
      value: item,
      label: convertStatusToName(item),
    };
  });
  dataStatus = [{ value: "", label: "" }, ...dataStatus];
  let dataRequester = listRequest
    ?.map((item) => {
      return {
        value: item?.requester?._id,
        label: item?.requester?.name,
      };
    })
    .filter(
      (item, index, self) =>
        self.findIndex((t) => t.value === item.value) === index
    );
  dataRequester = [{ value: "", label: "" }, ...dataRequester];
  return (
    <div className="w-1/3 mr-10 mt-5 ml-auto">
      <div className="container rounded-2xl">
        <Select
          className="mt-[5px]"
          placeholder="Loại yêu cầu"
          style={{ width: 120 }}
          onChange={onTypeChange}
          options={dataType}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          optionFilterProp="children"
        />
        <Select
          className="mt-[5px]"
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
        <Select
          className="mt-[5px]"
          placeholder="Nguời yêu cầu"
          style={{ width: 120 }}
          onChange={onRequesterChange}
          options={dataRequester}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          optionFilterProp="children"
          showSearch
        />
      </div>
    </div>
  );
};

export default SearchRequest;
