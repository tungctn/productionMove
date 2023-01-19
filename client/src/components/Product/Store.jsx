import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Button } from 'antd';
import { useState } from 'react';

const Store = (props) => {
  const { product } = props;
  const [visible, setVisible] = useState(false);
  const [visibleSold, setVisibleSold] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({});
  const [requestData, setRequestData] = useState({
    requester: '',
    recipient: '',
    product: '',
    productLine: '',
  });

  const showModal = () => {
    setVisible(true);
  };

  const showModalSold = () => {
    setVisibleSold(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setVisibleSold(false);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleOkSold = () => {
    setVisibleSold(false);
  };

  const onValueChange = (e) => {
    const propName = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [propName]: value });
  };

  const onNoteChange = (e) => {
    setRequestData({ ...requestData, note: e.target.value });
  };
  return (
    <div>
      {product?.status === 1 && (
        <div>
          <Button onClick={showModal} type="primary">
            Bán sản phẩm
          </Button>
          <Button type="primary" onClick={showModalSold}>
            Trả sản phẩm
          </Button>
        </div>
      )}
      {(product?.status === 2 || product?.status === 6) && (
        <Button onClick={showModal} type="primary">
          Sản phẩm bị lỗi
        </Button>
      )}
      {product?.status === 3 && (
        <Button onClick={showModal} type="primary">
          Gửi sản phẩm đi bảo hành
        </Button>
      )}
      {product?.status === 5 && (
        <Button onClick={showModal} type="primary">
          Trả sản phẩm cho khách hàng
        </Button>
      )}
      {product?.status === 1 && (
        <Modal
          destroyOnClose={true}
          open={visible}
          title="Thông tin khách hàng"
          onCancel={handleCancel}
          onOk={handleOk}
          okText="Ok"
          cancelText="Cancel"
        >
          <Form initialValues={{ remember: true }}>
            <Form.Item
              label="Tên khách hàng"
              type="text"
              name="name"
              rules={[
                {
                  validator: (_, value) => {
                    if (value) {
                      if (value.length > 50) {
                        setIsError(true);
                        return Promise.reject(
                          'Tên khách hàng không được quá 50 ký tự',
                        );
                      } else if (value.length < 3) {
                        setIsError(true);
                        return Promise.reject(
                          'Tên khách hàng không được ít hơn 3 ký tự',
                        );
                        // pattern: /^[a-zA-Z0-9]+$/,
                      } else if (!/^[a-zA-Z ]+$/.test(value)) {
                        setIsError(true);
                        return Promise.reject(
                          'Tên khách hàng không được chứa ký tự đặc biệt',
                        );
                      } else {
                        setIsError(false);
                        return Promise.resolve();
                      }
                    } else {
                      setIsError(true);
                      return Promise.reject('Vui lòng nhập tên khách hàng');
                    }
                  },
                },
              ]}
            >
              <Input
                name="name"
                placeholder="input placeholder"
                onChange={onValueChange}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              type="text"
              name="email"
              rules={[
                {
                  validator: (_, value) => {
                    if (value) {
                      if (value.length > 50) {
                        setIsError(true);
                        return Promise.reject('Email không được quá 50 ký tự');
                      } else if (value.length < 3) {
                        setIsError(true);
                        return Promise.reject(
                          'Email không được ít hơn 3 ký tự',
                        );
                      } else if (
                        !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)
                      ) {
                        setIsError(true);
                        return Promise.reject('Email không hợp lệ');
                      } else {
                        setIsError(false);
                        return Promise.resolve();
                      }
                    } else {
                      setIsError(true);
                      return Promise.reject('Vui lòng nhập email');
                    }
                  },
                },
              ]}
            >
              <Input
                name="email"
                placeholder="input placeholder"
                onChange={onValueChange}
              />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              type="text"
              name="address"
              rules={[
                {
                  required: true,
                  message: 'Please input your address!',
                },
              ]}
            >
              <Input
                name="address"
                placeholder="input placeholder"
                onChange={onValueChange}
              />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              type="text"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone!',
                },
              ]}
            >
              <Input
                name="phone"
                placeholder="input placeholder"
                onChange={onValueChange}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
      {product?.status === 1 && (
        <Modal
          destroyOnClose={true}
          open={visibleSold}
          title="Trả sản phẩm"
          onCancel={handleCancel}
          onOk={handleOkSold}
          okText="Ok"
          cancelText="Cancel"
        >
          <div>
            Bạn có chắc chắn muốn trả sản phẩm này về nhà máy{' '}
            {product?.factory?.name} không?
          </div>
          <div>Ghi chú:</div>
          <TextArea onChange={onNoteChange}></TextArea>
        </Modal>
      )}
    </div>
  );
};

Store.propTypes = {
  showModal: PropTypes.func.isRequired,
};

export default memo(Store);
