import { Button, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRequest } from "../../api/request";
import { useAppContext } from "../../contexts/AppContext";
import { useRequestContext } from "../../contexts/RequestContext";

const Order = (props) => {
  const { record } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState();
  const { handleCreateRequest } = useRequestContext();
  const [formText, setFormText] = useState({ note: "", type: 0 });
  const {
    openNotification,
    authState: { user },
    refreshPage,
  } = useAppContext();

  const showModal = () => {
    setVisible(true);
  };
  const onValueChange = (e) => {
    setInput(e.target.value);
  };
  const handelCancel = () => {
    setVisible(false);
  };
  const onChange = (e) => {
    setFormText({ ...formText, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(record);
    console.log(user);
  }, []);
  const handleOk = async () => {
    await handleCreateRequest({
      requester: user._id,
      recipient: record.factory._id,
      amount: Number(input),
      productLine: id,
      ...formText,
    });

    setVisible(false);
  };
  return (
    <div>
      <Button type="primary" className="min-w-0 h-auto" onClick={showModal}>
        Đặt hàng
      </Button>
      <Modal
        title={`Nhập số lượng đặt hàng `}
        open={visible}
        onOk={handleOk}
        destroyOnClose={true}
        onCancel={handelCancel}>
        <Form layout="vertical" initialValues={{ remember: true }}>
          <Form.Item
            label={`Nhập số lượng (nhỏ hơn hoặc bằng ${record.listProduct.length})`}
            type="text"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}>
            <Input
              name="amount"
              placeholder="input placeholder"
              onChange={onValueChange}
            />
          </Form.Item>
          <Form.Item label="Ghi chú" type="text" name="note">
            <Input
              name="note"
              placeholder="Lưu ý cho cơ sở sản xuất"
              onChange={onChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Order;
