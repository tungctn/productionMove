import { P } from "@antv/g2plot";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import { createUser } from "../../api/user";
import { useAppContext } from "../../contexts/AppContext";
import { useUserContext } from "../../contexts/UserContext";

const AddUser = () => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { openNotification, convertRoleToName } = useAppContext();
  const {
    loadListUser,
    handleAddUser,
    userState: { listUser },
  } = useUserContext();

  const showModal = () => {
    setVisible(true);
  };
  const handelCancel = () => {
    setVisible(false);
  };

  const dataOption = [
    {
      label: convertRoleToName(2),
      value: 2,
    },
    {
      label: convertRoleToName(3),
      value: 3,
    },
    {
      label: convertRoleToName(4),
      value: 4,
    },
  ];

  const onValueChange = (e) => {
    const propName = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [propName]: value });
    console.log(formData);
  };

  const onRoleChange = (value) => {
    setFormData({ ...formData, role: value });
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
        // confirmLoading={isLoading}
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
              {
                min: 6,
                message: "Tên nhân viên phải có ít nhất 6 ký tự",
              },
              {
                max: 20,
                message: "Tên nhân viên không được quá 20 ký tự",
              },
              {
                pattern: /^[a-zA-Z0-9 ]+$/,
                message: "Tên nhân viên không được chứa ký tự đặc biệt",
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
              {
                type: "email",
                message: "Email không hợp lệ",
              },
              {
                min: 6,
                message: "Email phải có ít nhất 6 ký tự",
              },
              {
                max: 20,
                message: "Email không được quá 20 ký tự",
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
              {
                min: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự",
              },
              {
                max: 20,
                message: "Mật khẩu không được quá 20 ký tự",
              },
              {
                pattern: /^[a-zA-Z0-9]+$/,
                message: "Mật khẩu không được chứa ký tự đặc biệt",
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
            <Select
              showSearch
              placeholder="Select a warrantyCenter"
              optionFilterProp="children"
              onChange={onRoleChange}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={dataOption}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddUser;
