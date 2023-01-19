import { DeleteOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProductLine } from '../../api/productline';
import { useAppContext } from '../../contexts/AppContext';
import Loading from '../loading/Loading';

const ProductLineDelete = (props) => {
  const { openNotification } = useAppContext();
  const { id } = props;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleOk = async () => {
    setLoading(true);
    const response = await deleteProductLine(id);
    if (response.success) {
      openNotification('success', response.msg);
      setLoading(false);
      navigate('/productline');
    }
  };
  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div className="inline-block mx-2">
      <DeleteOutlined
        onClick={showModal}
        style={{
          fontSize: 30,
        }}
      />

      <Modal
        open={visible}
        title="Dòng sản phẩm"
        onOk={handleOk}
        onCancel={handleCancel}
        okText="OK"
        cancelText="Cancel"
      >
        <Loading spinning={loading}>
          <p>Bạn có muốn xoá dòng sản phẩm này</p>
        </Loading>
      </Modal>
    </div>
  );
};

export default ProductLineDelete;
