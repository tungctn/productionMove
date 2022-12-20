import { SyncOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Tag } from "antd";
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
import { updateProduct } from "../../api/product";
import ProduceSearch from "../../components/Produce/ProduceSearch";

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
  const [record, setRecord] = useState({});
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
  const handleClick = (record) =>
    // id,
    // status,
    // type,
    // requester,
    // recipient,
    // amount,
    // productLine,
    // refRequest
    {
      setVisible(true);
      // if (status === 2) {
      setDesc(<h1>{convertTypeToName(record.type)}</h1>);
      if (record.type === 0) {
        setInformation(
          `${record.requester.name} muốn nhập ${record.amount} sản phẩm loại ${record.productLine.name} từ ${record.recipient.name}`
        );
        setData({
          ...data,
          amount: record.amount,
          store: record.requester._id,
          productLine: record.productLine._id,
        });
      } else if (record.type === 4) {
        setInformation(
          `${record.requester.name} yêu cầu trả sản phẩm từ ${record.recipient.name}`
        );
        setData({
          ...data,
          amount: record.amount,
          store: record.recipient._id,
          productLine: record.productLine._id,
        });
      } else if (record.type === 1) {
        setInformation(
          `${record.requester.name} yêu cầu bảo hành sản phẩm từ ${record.recipient.name}`
        );
        setData({
          ...data,
          amount: record.amount,
          store: record.requester._id,
          productLine: record.product.productLine._id,
        });
      } else if (record.type === 2) {
        setInformation(
          `${record.requester.name} yêu cầu nhân sản phẩm bảo hành từ ${record.recipient.name}`
        );
        setData({
          ...data,
          amount: record.amount,
          store: record.requester._id,
          productLine: record.product.productLine._id,
        });
      } else {
        setInformation("");
        setData({});
        setId("");
        setRefId("");
      }
      // }
    };
  const handleOk = async () => {
    let response;
    console.log(record);
    if (record.type === 0) {
      response = await handleImportRequest(data);
      console.log(data);
    } else if (record.type === 4) {
      response = await updateProduct(
        record.product._id,
        convertObjectToArray({
          ...feedback,
          status: 11,
          location: record.product.factory,
        })
      );
    } else if (record.type === 1) {
      response = await updateProduct(
        record.product._id,
        convertObjectToArray({
          ...feedback,
          status: 4,
          location: user._id,
        })
      );
    } else if (record.type === 2) {
      response = await updateProduct(
        record.product._id,
        convertObjectToArray({
          ...feedback,
          status: 5,
          location: user._id,
        })
      );
    } else if (record.type === 3) {
      response = await updateProduct(
        record.product._id,
        convertObjectToArray({
          ...feedback,
          status: 8,
          location: user._id,
        })
      );
    }
    if (response.success) {
      openNotification("success", response.msg);
      await updateRequest(
        record._id,
        convertObjectToArray({ ...feedback, status: 3 })
      );
      await updateRequest(
        record.refRequest,
        convertObjectToArray({ ...feedback, status: 3 })
      );
      refreshPage();
      setVisible(false);
    }
  };
  const handleReject = async () => {
    const response1 = await updateRequest(
      id,
      convertObjectToArray({ ...feedback, status: 4 })
    );
    const response2 = await updateRequest(
      refId,
      convertObjectToArray({ ...feedback, status: 4 })
    );
    if (response1.success && response2.success) {
      openNotification("success", response1.msg);
      setVisible(false);
    } else {
      openNotification("error", response1.msg);
      setVisible(false);
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
            if (record.status === 2) {
              handleClick(record);
            }
          }}
          color={color(record.status)}>
          {convertStatusToName(text)}
        </Tag>
      ),
    },
  ];

  useEffect(() => {
    console.log(listRequest);
    console.log(record);
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

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (!visible) {
      console.log(record);
    }
  }, [visible]);

  return (
    <div className="w-full">
      <Default tagName="yc">
        <ProduceSearch />
        <TableInfo
          onRow={(record) => ({
            onClick: () => {
              if (record.status === 2) {
                handleClick(record);
                setRecord(record);
              }
              console.log(record);
            },
          })}
          dataColumn={dataColumn}
          dataSource={dataSource}
        />
      </Default>
      <Modal
        destroyOnClose={true}
        open={visible}
        title="Thông tin đơn hàng"
        footer={[
          <Button key="1" onClick={handleReject}>
            Từ chối
          </Button>,
          <Button key="2" type="primary" onClick={handleOk}>
            Chấp nhận
          </Button>,
        ]}
        onCancel={handleCancel}>
        <div>{desc}</div>
        <div>{information}</div>
        Phản hồi:
        <TextArea onChange={onChange} />
      </Modal>
    </div>
  );
};

export default Request;
