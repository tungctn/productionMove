import { EditOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../api/user';
import { useAppContext } from '../../contexts/AppContext';
import { useUserContext } from '../../contexts/UserContext';
import Loading from '../loading/Loading';

const EditUser = (props) => {
  const { id } = props;
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({});
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loadListUser, handleEditUser } = useUserContext();
  const loadUser = async (id) => {
    const response = await getUser(id);
    if (response.success) {
      setUser(response.data);
    }
  };
  const onValueChange = (e) => {
    const propName = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [propName]: value });
  };

  const handelCancel = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    if (isError === false) {
      setLoading(true);
      await handleEditUser(formData, id);
      setVisible(false);
      loadListUser();
    }
    setLoading(false);
  };

  const onRoleChange = (value) => {
    setFormData({ ...formData, role: value });
  };

  useEffect(() => {
    loadUser(id);
    if (Object.keys(user).length > 0 && visible) {
      form.setFieldsValue({
        ...user,
      });
    }
  }, [id, Object.keys(user).length, visible]);

  return (
    <div>
      <EditOutlined onClick={showModal} />
      <Modal title="Sửa thông tin" open={visible} onOk={handleOk} destroyOnClose={true} onCancel={handelCancel}>
        <Loading spinning={loading}>
          <Form layout="vertical" form={form} initialValues={{ remember: true }}>
            <Form.Item
              label="Tên nhân viên"
              type="text"
              name="name"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject(new Error('Vui lòng nhập tên'));
                    } else if (value.length > 50) {
                      setIsError(true);
                      return Promise.reject(new Error('Tên nhân viên không được quá 50 ký tự'));
                    } else if (value.length < 3) {
                      setIsError(true);
                      return Promise.reject(new Error('Tên nhân viên không được ít hơn 3 ký tự'));
                    } else if (!/^[a-zA-Z 0-9]+$/g.test(value)) {
                      setIsError(true);
                      return Promise.reject(new Error('Tên nhân viên không được chứa ký tự đặc biệt'));
                    } else {
                      setIsError(false);
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Input name="name" placeholder="input placeholder" onChange={onValueChange} />
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
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={[
                  { label: 'Cơ sở sản xuất', value: 2 },
                  { label: 'Đại lý phân phối', value: 3 },
                  { label: 'Trung tâm bảo hành', value: 4 },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              type="text"
              name="email"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject(new Error('Vui lòng nhập email'));
                    } else if (value.length > 50) {
                      setIsError(true);
                      return Promise.reject(new Error('Email không được quá 50 ký tự'));
                    } else if (value.length < 3) {
                      setIsError(true);
                      return Promise.reject(new Error('Email không được ít hơn 3 ký tự'));
                    } else if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g.test(value) === false) {
                      setIsError(true);
                      return Promise.reject(new Error('Email không đúng định dạng'));
                    } else {
                      setIsError(false);
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Input name="email" placeholder="input placeholder" onChange={onValueChange} />
            </Form.Item>
          </Form>
        </Loading>
      </Modal>
    </div>
  );
};

export default EditUser;
