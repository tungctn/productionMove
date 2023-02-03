import { Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useAppContext } from '../../contexts/AppContext';
import { useUserContext } from '../../contexts/UserContext';
import Loading from '../loading/Loading';

const AddUser = () => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { convertRoleToName } = useAppContext();
  const { handleAddUser } = useUserContext();

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
  };

  const onRoleChange = (value) => {
    setFormData({ ...formData, role: value });
  };

  const handleOk = async () => {
    setIsLoading(true);
    if (isError === false) {
      await handleAddUser(formData);
      setVisible(false);
      setIsLoading(false);
    }
  };
  return (
    <div className="float-right">
      <div className="w-1/12">
        <button onClick={showModal}>
          <PlusCircleOutlined className="text-2xl text-blue-500 hover:text-blue-700" />
        </button>
      </div>
      <Loading spinning={isLoading}>
        <Modal
          title="Sửa thông tin"
          open={visible}
          onOk={handleOk}
          destroyOnClose={true}
          onCancel={handelCancel}
        >
          <Form layout="vertical" initialValues={{ remember: true }}>
            <Form.Item
              label="Tên nhân viên"
              type="text"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
                {
                  validator: (_, value) => {
                    if (!value) {
                      setIsError(true);
                      return Promise.reject('Vui lòng nhập tên nhân viên');
                    } else if (value.length < 6) {
                      setIsError(true);
                      return Promise.reject(
                        'Tên nhân viên phải có ít nhất 6 ký tự',
                      );
                    } else if (value.length > 50) {
                      setIsError(true);
                      return Promise.reject(
                        'Tên nhân viên không được quá 50 ký tự',
                      );
                    } else if (!/^[a-zA-Z 0-9]+$/.test(value)) {
                      setIsError(true);
                      return Promise.reject(
                        'Tên nhân viên không được chứa ký tự đặc biệt',
                      );
                    } else {
                      setIsError(false);
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
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
                  message: 'Please input your email!',
                },
                {
                  validator: (_, value) => {
                    if (!value) {
                      setIsError(true);
                      return Promise.reject('Vui lòng nhập email');
                    } else if (value.length < 6) {
                      setIsError(true);
                      return Promise.reject('Email phải có ít nhất 6 ký tự');
                    } else if (value.length > 50) {
                      setIsError(true);
                      return Promise.reject('Email không được quá 50 ký tự');
                    } else if (
                      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)
                    ) {
                      setIsError(true);
                      return Promise.reject('Email không hợp lệ');
                    } else {
                      setIsError(false);
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
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
                  validator: (_, value) => {
                    if (!value) {
                      setIsError(true);
                      return Promise.reject('Vui lòng nhập mật khẩu');
                    } else if (value.length < 6) {
                      setIsError(true);
                      return Promise.reject('Mật khẩu phải có ít nhất 6 ký tự');
                    } else if (value.length > 50) {
                      setIsError(true);
                      return Promise.reject('Mật khẩu không được quá 50 ký tự');
                    } else if (!/^[a-zA-Z 0-9]+$/.test(value)) {
                      setIsError(true);
                      return Promise.reject(
                        'Mật khẩu không được chứa ký tự đặc biệt',
                      );
                    } else {
                      setIsError(false);
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Input.Password
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
                  message: 'Please input your role!',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a warrantyCenter"
                optionFilterProp="children"
                onChange={onRoleChange}
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={dataOption}
              />
            </Form.Item>
          </Form>
        </Modal>
      </Loading>
    </div>
  );
};

export default AddUser;
