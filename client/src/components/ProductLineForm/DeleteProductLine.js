import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";
import { deleteProductLine } from "../../api/productline";
import { useAppContext } from "../../contexts/AppContext";

const ProductLineDelete = (props) => {
  const { openNotification } = useAppContext();
  const { id } = props;
  const [visible, setVisible] = useState(false);
  const handleOk = async () => {
    const response = await deleteProductLine(id);
    if (response.success) {
      openNotification("success", response.msg);
    }
  };
  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div>
      <DeleteOutlined onClick={showModal}
        style={{
         fontSize: 30,
        }} />
      <Modal
        open={visible}
        title="Dòng sản phẩm"
        onOk={handleOk}
        onCancel={handleCancel}
        okText="OK"
        cancelText="Cancel">
        <p>Bạn có muốn xoá dòng sản phẩm này</p>
      </Modal>
    </div>
  );
};

export default ProductLineDelete;
