import { CameraTwoTone, EditTwoTone } from '@ant-design/icons';
import { Avatar, Button, Col, Input, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { uploadImage } from '../../api/image';
import { updateUser } from '../../api/user';
import Loading from '../../components/Loading/Loading';
import ChangePass from '../../components/Profile/ChangePass';
import { useAppContext } from '../../contexts/AppContext';
import Default from '../../Layouts/Default';

const Profile = (props) => {
  const { role } = props;
  const {
    authState: { user },
    checkMiddleware,
    convertRoleToName,
    openNotification,
    convertObjectToArray,
    loadUser,
  } = useAppContext();
  const [isHover, setIsHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({});
  const fileURL = useRef();
  const onChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      console.log(reader.result);
      setLoading(true);
      const response = await uploadImage({ data: reader.result });
      if (response?.success) {
        const response1 = await updateUser(
          convertObjectToArray({ img: response.data.url }),
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
    setLoading(true);
    setIsEdit(true);
    const response = await updateUser(convertObjectToArray(data), user?._id);
    if (response.success) {
      openNotification('success', 'Cập nhật thông tin thành công');
      loadUser();
      setLoading(false);
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
          <div className="border-2 border-[#003eb3] px-8 w-[300px] rounded-xl relative">
            <EditTwoTone
              className="absolute text-2xl cursor-pointer top-0 right-2"
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            />

            <Row className="flex items-center justify-center h-full">
              <Col span={10}>
                <h1 className="float-right clear-both font-bold py-3">Tên: </h1>
                <h1 className="float-right clear-both font-bold py-3">
                  Email:{' '}
                </h1>
                <h1 className="float-right clear-both font-bold py-3">
                  Nơi làm việc:
                </h1>
              </Col>
              <Col span={2} />
              <Col span={12}>
                {!isEdit && (
                  <h1 className="float-left clear-both py-3">{user?.name}</h1>
                )}
                {isEdit && (
                  <div>
                    <Input
                      className="h-[45px]"
                      name="name"
                      type="text"
                      defaultValue={user?.name}
                      onChange={onValueChange}
                    />
                  </div>
                )}
                {!isEdit && (
                  <h1 className="float-left clear-both py-3">{user?.email}</h1>
                )}
                {isEdit && (
                  <div>
                    <Input
                      className="h-[45px]"
                      name="email"
                      type="email"
                      defaultValue={user?.email}
                      onChange={onValueChange}
                    />
                  </div>
                )}
                <h1 className="float-left clear-both py-3">
                  {convertRoleToName(user.role)}
                </h1>
              </Col>
              {isEdit && (
                <Button type="primary" onClick={onEdit}>
                  Cập nhật
                </Button>
              )}
            </Row>
          </div>
        </Row>
      </Default>
    </div>
  );
};

export default Profile;
