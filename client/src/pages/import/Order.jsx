import { Button, Form, Input, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductLine } from '../../api/productline';
import { createRequest } from '../../api/request';
import { useAppContext } from '../../contexts/AppContext';

const Order = (props) => {
  'use strict';
  const { record } = props;
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState();
  const [isError, setIsError] = useState(false);
  const [formText, setFormText] = useState({ note: '' });
  const [productLine, setProductLine] = useState();
  const {
    authState: { user },
    loadUser,
    openNotification,
  } = useAppContext();

  useEffect(() => {
    getProductLine(id).then((response) => {
      if (response.success) {
        setProductLine(response.data);
      }
    });
  }, []);

  const showModal = () => {
    if (record.amount !== 0) {
      setVisible(true);
    } else {
      openNotification('error', 'Hết hàng!');
    }
  };
  const onValueChange = (e) => {
    setInput(e.target.value);
  };
  const handelCancel = () => {
    setVisible(false);
  };
  const onChange = (e) => {
    setFormText({ ...formText, [e.target.name]: e.target.value });
  };
  const handleOk = async () => {
    if (isError === false) {
      const response = await createRequest({
        requester: user._id,
        recipient: record.factory._id,
        amount: Number(input),
        productLine: id,
        type: 0,
        description: `${user?.name} muốn nhập ${Number(input)} sản phẩm loại ${
          productLine?.name
        } từ ${record?.factory?.name}`,
        ...formText,
      });
      if (response.success) {
        openNotification('success', 'Gửi yêu cầu thành công!');
        loadUser();
      }
      setVisible(false);
    }
  };
  console.log(record);
  return (
    <div>
      <Button type="primary" className="min-w-0 h-auto" onClick={showModal}>
        Đặt hàng
      </Button>
      <Modal
        title={`Nhập số lượng đặt hàng `}
        open={visible}
        onOk={handleOk}
        destroyOnClose={true}
        onCancel={handelCancel}
      >
        <Form layout="vertical" initialValues={{ remember: true }}>
          <Form.Item
            label={`Nhập số lượng (nhỏ hơn hoặc bằng ${record.listProduct.length})`}
            type="text"
            name="amount"
            rules={[
              {
                validator: (_, value) => {
                  if (!value) {
                    setIsError(true);
                    return Promise.reject(new Error(`Hãy nhập số lượng!`));
                  } else if (value <= 0) {
                    setIsError(true);
                    return Promise.reject(
                      new Error(`Số lượng đặt hàng phải lớn hơn 0!`),
                    );
                  } else if (value > record.listProduct.length) {
                    setIsError(true);
                    return Promise.reject(
                      new Error(
                        `Số lượng đặt hàng không được lớn hơn số lượng sản phẩm có sẵn!`,
                      ),
                    );
                  } else if (isNaN(value)) {
                    setIsError(true);
                    return Promise.reject(
                      new Error(`Số lượng đặt hàng phải là số!`),
                    );
                  } else {
                    setIsError(false);
                    return Promise.resolve();
                  }
                },
              },
            ]}
          >
            <Input
              name="amount"
              placeholder="Nhập số lượng"
              onChange={onValueChange}
            />
          </Form.Item>
          <Form.Item label="Ghi chú" type="text" name="note">
            <TextArea
              name="note"
              placeholder="Lưu ý cho cơ sở sản xuất"
              onChange={onChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Order;
