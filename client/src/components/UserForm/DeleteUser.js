import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Modal } from "antd";
import React, { useState } from "react";
import { deleteUser } from "../../api/user";
import { useAppContext } from "../../contexts/AppContext";
import { useUserContext } from "../../contexts/UserContext";

const DeleteUser = (props) => {
  const { id } = props;
  const [visible, setVisible] = useState(false);
  const { openNotification } = useAppContext();
  const { loadListUser } = useUserContext();
  const handelCancel = () => {
    setVisible(false);
  };

  const handleOk = async () => {
    const response = await deleteUser(id);
    if (response.success) {
      openNotification("success", response.msg);
      loadListUser();
    }
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
        Bạn có muốn sa thải nhân viên này?
      </Modal>
    </div>
  );
};

export default DeleteUser;
