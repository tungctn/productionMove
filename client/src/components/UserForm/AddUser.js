import { P } from "@antv/g2plot";
import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { createUser } from "../../api/user";
import { useAppContext } from "../../contexts/AppContext";
import { useUserContext } from "../../contexts/UserContext";

const AddUser = () => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { openNotification } = useAppContext();
  const { loadListUser, handleAddUser } = useUserContext();

  const showModal = () => {
    setVisible(true);
  };
  const handelCancel = () => {
    setVisible(false);
  };

  const onValueChange = (e) => {
    const propName = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [propName]: value });
    console.log(formData);
  };

  const handleOk = async () => {
    setIsLoading(true);
    await handleAddUser(formData);
    setVisible(false);
  };
  return (
    <div className="float-right">
      <Button type="primary" onClick={showModal}>
        Add
      </Button>
      <Modal
        title="Sửa thông tin"
        confirmLoading={isLoading}
        open={visible}
        onOk={handleOk}
        destroyOnClose={true}
        onCancel={handelCancel}>
        <Form layout="vertical" initialValues={{ remember: true }}>
          <Form.Item
            label="Tên nhân viên"
            type="text"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}>
            <Input
              name="name"
              placeholder="input placeholder"
              onChange={onValueChange}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            type="text"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}>
            <Input
              name="email"
              placeholder="input placeholder"
              onChange={onValueChange}
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            type="text"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}>
            <Input
              name="password"
              placeholder="input placeholder"
              onChange={onValueChange}
            />
          </Form.Item>
          <Form.Item
            label="Chức vụ"
            type="text"
            name="role"
            rules={[
              {
                required: true,
                message: "Please input your role!",
              },
            ]}>
            <Input
              name="role"
              placeholder="input placeholder"
              onChange={onValueChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddUser;
