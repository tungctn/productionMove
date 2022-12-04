import { Modal } from "antd";
import React from "react";
import { deleteProductLine } from "../../api/productline";
import { useAppContext } from "../../contexts/AppContext";

const ProductLineDelete = (props) => {
  const { openNotification } = useAppContext();
  const { isVisible, id, handleCancel } = props;
  const handleOk = async () => {
    const response = await deleteProductLine(id);
    if (response.success) {
      openNotification("success", response.msg);
    }
  };
  return (
    <div>
      <Modal
        open={isVisible}
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
