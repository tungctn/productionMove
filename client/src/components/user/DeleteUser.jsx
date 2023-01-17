import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";

const DeleteUser = (props) => {
  const { id } = props;
  const [visible, setVisible] = useState(false);
  const { handleDeleteUser } = useUserContext();
  const handelCancel = () => {
    setVisible(false);
  };

  const handleOk = async () => {
    await handleDeleteUser(id);
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };
  return (

    <div>
      <DeleteOutlined onClick={showModal} />
        <Modal
          title="Sửa thông tin"
          open={visible}
          onOk={handleOk}
          destroyOnClose={true}
          onCancel={handelCancel}>
          Bạn có muốn xoá người dùng này?
        </Modal>
    </div>
  );
};

export default DeleteUser;
