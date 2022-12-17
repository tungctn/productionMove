import { SyncOutlined } from "@ant-design/icons";
import { Input, Modal, Tag } from "antd";
import React, { useEffect, useState } from "react";
import {
  getAllRequest,
  handleImportRequest,
  updateRequest,
} from "../../api/request";
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
    openNotification,
    convertObjectToArray,
    refreshPage,
  } = useAppContext();
  const {
    requestState: { listRequest },
    loadListRequest,
  } = useRequestContext();
  // const [listRequest, setListRequest] = useState([]);
  const [visible, setVisible] = useState(false);
  const [desc, setDesc] = useState("");
  const [information, setInformation] = useState("");
  const [data, setData] = useState({});
  const [id, setId] = useState();
  const [refId, setRefId] = useState();
  const [feedback, setFeedback] = useState({});
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
  const handleClick = (
    id,
    status,
    type,
    requester,
    recipient,
    amount,
    productLine,
    refRequest
  ) => {
    if (status === 2) {
      console.log("1");
      setDesc(<h1>{convertTypeToName(type)}</h1>);
      setVisible(true);
    }
    if (type === 0) {
      setInformation(
        `${requester.name} muốn nhập ${amount} sản phẩm loại ${productLine.name} từ ${recipient.name}`
      );
      setData({
        ...data,
        amount: amount,
        store: requester._id,
        productLine: productLine._id,
      });
      setId(id);
      setRefId(refRequest);
    }
  };
  const handleOk = async () => {
    const response = await handleImportRequest(data);
    console.log(response);
    if (response.success) {
      openNotification("success", response.msg);
      await updateRequest(id, convertObjectToArray({ ...feedback, status: 3 }));
      await updateRequest(
        refId,
        convertObjectToArray({ ...feedback, status: 3 })
      );
      refreshPage();
      setVisible(false);
    } else {
      openNotification("error", response.msg);
    }
  };
  const handleCancel = async () => {
    const response = await handleImportRequest(data);
    console.log(response);
    if (response.success) {
      openNotification("success", response.msg);
      await updateRequest(id, convertObjectToArray({ ...feedback, status: 4 }));
      await updateRequest(
        refId,
        convertObjectToArray({ ...feedback, status: 4 })
      );
      refreshPage();
    }
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
      dataIndex: "requester1",
      key: "requester1",
    },
    {
      title: "Người nhận",
      dataIndex: "recipient1",
      key: "recipient1",
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
              record._id,
              record.status,
              record.type,
              record.requester,
              record.recipient,
              record.amount,
              record.productLine,
              record.refRequest
            );
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

  const dataSource = listRequest
    ?.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    .map((request, index) => {
      return {
        ...request,
        key: index + 1,
        requester1: request?.requester.name,
        recipient1: request?.recipient.name,
      };
    });
  const onChange = (e) => {
    // setFeedback(e.target.value);
    console.log(e.target.value);
    // setData({ ...data, feedback: e.target.value });
    setFeedback({ feedback: e.target.value });
  };

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
                record.recipient,
                record.amount,
                record.productLine,
                record.refRequest
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
        <div>{desc}</div>
        <div>{information}</div>
        Phản hồi:
        <TextArea onChange={onChange} />
      </Modal>
    </div>
  );
};

export default Request;
