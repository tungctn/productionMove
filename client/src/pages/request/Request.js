import { SyncOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import React, { useEffect, useState } from "react";
import { getAllRequest } from "../../api/request";
import TableInfo from "../../components/TableInfo/TableInfo";
import { useAppContext } from "../../contexts/AppContext";
import Default from "../../Layouts/Default";

const Request = () => {
  const {
    authState: { user },
    convertTypeToName,
    convertStatusToName,
  } = useAppContext();
  const [listRequest, setListRequest] = useState([]);
  const color = (status) => {
    switch (status) {
      case 1:
        return "magenta";
      case 2:
        return "processing";
      case 3:
        return "success";
      case 4:
        return "error";
      default:
        throw new Error("status is not match");
    }
  };
  const dataColumn = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Người gửi",
      dataIndex: "requester",
      key: "requester",
    },
    {
      title: "Người nhận",
      dataIndex: "recipient",
      key: "recipient",
    },
    {
      title: "Loai yêu cầu",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Tag color={color(record.status)}>{convertStatusToName(text)}</Tag>
      ),
    },
  ];

  const loadListRequest = async () => {
    const response = await getAllRequest();
    if (response.success) {
      console.log(response.data);
      setListRequest(response.data);
    }
  };

  useEffect(() => {
    loadListRequest();
  }, []);

  const dataSource = listRequest?.map((request, index) => {
    return {
      ...request,
      key: index + 1,
      requester: request.requester.name,
      recipient: request.recipient.name,
      type: convertTypeToName(request.type),
    };
  });

  return (
    <div class="w-full">
      <Default tagName="yc">
        <TableInfo dataColumn={dataColumn} dataSource={dataSource} />
      </Default>
    </div>
  );
};

export default Request;
