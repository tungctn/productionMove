import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";
import { deleteProductLine } from "../../api/productline";
import { useAppContext } from "../../contexts/AppContext";
import Loading from "../Loading/Loading";

const ProductLineDelete = (props) => {
  const { openNotification } = useAppContext();
  const { id } = props;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOk = async () => {
    setLoading(true);
    const response = await deleteProductLine(id);
    if (response.success) {
      openNotification("success", response.msg);
      setLoading(false);
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
      <DeleteOutlined
        onClick={showModal}
        style={{
          fontSize: 30,
        }}
      />
      <Loading spinning={loading}>
        <Modal
          open={visible}
          title="Dòng sản phẩm"
          onOk={handleOk}
          onCancel={handleCancel}
          okText="OK"
          cancelText="Cancel">
          <p>Bạn có muốn xoá dòng sản phẩm này</p>
        </Modal>
      </Loading>
    </div>
  );
};

export default ProductLineDelete;
