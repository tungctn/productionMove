import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Modal } from "antd";
import React, { useState } from "react";
import { deleteUser } from "../../api/user";
import { useAppContext } from "../../contexts/AppContext";
import { useUserContext } from "../../contexts/UserContext";
import Loading from "../Loading/Loading";

const DeleteUser = (props) => {
  const { id } = props;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleDeleteUser } = useUserContext();
  const handelCancel = () => {
    setVisible(false);
  };

  const handleOk = async () => {
    setLoading(true);
    await handleDeleteUser(id);
    setVisible(false);
    setLoading(false);
  };

  const showModal = () => {
    setVisible(true);
  };
  return (
    
    <div>
      <DeleteOutlined onClick={showModal} />
      {/* <Loading spinning={loading}> */}
        <Modal
          title="Sửa thông tin"
          open={visible}
          onOk={handleOk}
          destroyOnClose={true}
          onCancel={handelCancel}>
          Bạn có muốn xoá người dùng này?
        </Modal>
      {/* </Loading> */}
    </div>
  );
};

export default DeleteUser;
