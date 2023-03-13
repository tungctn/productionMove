import { CameraTwoTone, EditTwoTone } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Image, Input, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { uploadImage } from '../../api/image';
import { checkEmail, updateUser } from '../../api/user';
import Loading from '../../components/loading/Loading';
import ChangePass from '../../components/profile/ChangePass';
import { useAppContext } from '../../contexts/AppContext';
import Default from '../../layouts/Default';
import './index.scss';

const Profile = (props) => {
  'use strict';
  const { role } = props;
  const {
    authState: { user },
    checkMiddleware,
    convertRoleToName,
    openNotification,
    convertObjectToArray,
    loadUser,
  } = useAppContext();
  const [form] = Form.useForm();
  const [isHover, setIsHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({
    name: user?.name,
    email: user?.email,
  });
  const fileURL = useRef();
  const onChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      console.log(reader.result);
      setLoading(true);
      const response = await uploadImage({ data: [reader.result] });
      if (response?.success) {
        const response1 = await updateUser(
          convertObjectToArray({ img: response.data[0] }),
          user?._id,
        );
        if (response1.success) {
          loadUser();
          openNotification('success', 'Cập nhật ảnh đại diện thành công');
        } else {
          openNotification('error', 'Cập nhật ảnh đại diện thất bại');
        }
      }
      setLoading(false);
    };
  };

  const handleClick = (e) => {
    e.preventDefault();
    fileURL.current.click();
  };

  const onMouseOver = () => {
    setIsHover(true);
  };

  const onMouseOut = () => {
    setIsHover(false);
  };

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onEdit = async () => {
    let isError = false;
    setLoading(true);
    setIsEdit(true);
    const patternEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const patternName = /^[a-zA-Z 0-9]+$/;
    console.log(data);
    if (patternEmail.test(data?.email) === false) {
      isError = true;
      openNotification('warning', 'Email không đúng định dạng');
      setLoading(false);
    }
    if (data.email !== user.email) {
      const response = await checkEmail({ email: data.email });
      if (!response.success) {
        isError = true;
        openNotification('warning', response.msg);
        setLoading(false);
      }
    }
    if (patternName.test(data.name) === false) {
      isError = true;
      openNotification('warning', 'Tên không đúng định dạng');
      setLoading(false);
    }
    if (!isError) {
      const response = await updateUser(convertObjectToArray(data), user?._id);
      if (response.success) {
        openNotification('success', 'Cập nhật thông tin thành công');
        loadUser();
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    checkMiddleware(role, () => {});
    console.log(user);
  }, []);

  return (
    <div>
      <Default>
        <h1 className="text-5xl clear-both">Hồ sơ: </h1>
        <Row className="mt-10">
          <Col span={12}>
            <input
              id="image"
              name="image"
              type="file"
              style={{ display: 'none' }}
              ref={fileURL}
              accept=".png, .jpg"
              onChange={onChange}
            />
            <Loading spinning={loading}>
              <div className="relative">
                {isHover && (
                  <CameraTwoTone
                    className={`duration-300 text-3xl absolute top-[85px] left-[calc(50%_-_15px)] z-10`}
                  />
                )}
                <Avatar
                  onMouseOver={onMouseOver}
                  onMouseOut={onMouseOut}
                  size={200}
                  src={user?.img}
                  className={`block mx-auto cursor-pointer hover:opacity-80 hover:transition-all duration-300`}
                  onClick={handleClick}
                />
              </div>
            </Loading>

            <ChangePass user={user} />
          </Col>
          <Loading spinning={loading}>
            <div className="border-2 border-[#003eb3] px-8 w-[300px] h-[300px] rounded-xl relative">
              <EditTwoTone
                className="absolute text-2xl cursor-pointer top-0 right-2"
                onClick={() => {
                  setIsEdit(!isEdit);
                }}
              />

              <Row className="flex items-center justify-center h-full">
                <Form form={form}>
                  <Form.Item
                    label="Tên"
                    name="name"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    initialValue={user?.name}
                  >
                    {!isEdit && <>{user?.name}</>}
                    {isEdit && (
                      <Input
                        name="name"
                        defaultValue={user?.name}
                        onChange={onValueChange}
                      />
                    )}
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    {!isEdit && <h1>{user?.email}</h1>}
                    {isEdit && (
                      <Input
                        name="email"
                        defaultValue={user?.email}
                        onChange={onValueChange}
                      />
                    )}
                  </Form.Item>
                  <Form.Item
                    label="Chức vụ"
                    name="role"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    {convertRoleToName(user?.role)}
                  </Form.Item>
                  {isEdit && (
                    <Button type="primary" onClick={onEdit}>
                      Cập nhật
                    </Button>
                  )}
                </Form>
              </Row>
            </div>
          </Loading>
        </Row>
      </Default>
    </div>
  );
};

export default Profile;
