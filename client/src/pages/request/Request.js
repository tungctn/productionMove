import { SyncOutlined } from "@ant-design/icons";
import { Input, Modal, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { getAllRequest } from "../../api/request";
import TableInfo from "../../components/TableInfo/TableInfo";
import { useAppContext } from "../../contexts/AppContext";
import { useRequestContext } from "../../contexts/RequestContext";
import Default from "../../Layouts/Default";

const Request = () => {
  const { TextArea } = Input;
  const {
    authState: { user },
    convertTypeToName,
    convertStatusToName,
  } = useAppContext();
  const {
    requestState: { listRequest },
    loadListRequest,
  } = useRequestContext();
  // const [listRequest, setListRequest] = useState([]);
  const [visible, setVisible] = useState(false);
  const [desc, setDesc] = useState("");
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
  const handleClick = (status, type, recipient, requester) => {
    if (status === 2) {
      console.log("1");
      setDesc(`${requester} ${convertTypeToName(type)} từ ${recipient}`);
      setVisible(true);
    }
  };
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
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
      render: (text) => convertTypeToName(text),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Tag
          onClick={() => {
            handleClick(
              record.status,
              record.type,
              record.requester,
              record.recipient
            );
            console.log(record);
          }}
          color={color(record.status)}>
          {convertStatusToName(text)}
        </Tag>
      ),
    },
  ];

  // const loadListRequest = async () => {
  //   const response = await getAllRequest();
  //   if (response.success) {
  //     console.log(response.data);
  //     // setListRequest(response.data);
  //   }
  // };

  useEffect(() => {
    console.log(listRequest);
  }, []);

  const dataSource = listRequest?.map((request, index) => {
    return {
      ...request,
      key: index + 1,
      requester: request?.requester.name,
      recipient: request?.recipient.name,
    };
  });

  return (
    <div class="w-full">
      <Default tagName="yc">
        <TableInfo
          onRow={(record) => ({
            onClick: () => {
              handleClick(
                record.status,
                record.type,
                record.requester,
                record.recipient
              );
              console.log(record);
            },
          })}
          dataColumn={dataColumn}
          dataSource={dataSource}
        />
      </Default>
      <Modal
        open={visible}
        title="Thông tin đơn hàng"
        cancelText="Từ chối"
        okText="Chấp nhận"
        onCancel={handleCancel}
        onOk={handleOk}>
        <p>{desc}</p>
      </Modal>
    </div>
  );
};

export default Request;
