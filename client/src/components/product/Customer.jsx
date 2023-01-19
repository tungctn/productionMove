import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Descriptions } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const Customer = (props) => {
  const { product } = props;
  const [showClient, setShowClient] = useState(false);
  return (
    <>
      {product?.isSold && (
        <h1
          className="font-bold text-base  mb-3 cursor-pointer"
          onClick={() => {
            setShowClient(!showClient);
          }}
        >
          Thông tin khách hàng {showClient ? <UpOutlined /> : <DownOutlined />}
        </h1>
      )}

      {showClient && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Tên khách hàng">
            {product?.customer?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {product?.customer?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {product?.customer?.address}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {product?.customer?.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày bán">
            {product?.customer?.soldDate.split('T')[0]}
          </Descriptions.Item>
        </Descriptions>
      )}
    </>
  );
};

Customer.propTypes = {
  showClient: PropTypes.bool.isRequired,
};

export default memo(Customer);
