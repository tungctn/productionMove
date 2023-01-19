import { LeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProductLine, updateProductLine } from '../../api/productline';
import { useAppContext } from '../../contexts/AppContext';
import Loading from '../loading/Loading';

const ProductLineEdit = (props) => {
  const { id } = props;
  const [form] = Form.useForm();
  const { Option } = Select;
  const navigate = useNavigate();
  const { convertObjectToArray, openNotification } = useAppContext();
  const [productLine, setProductLine] = useState({});
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const loadProductLine = async (id) => {
    setIsLoading(true);
    const response = await getProductLine(id);
    if (response.success) {
      setProductLine(response.data);
      setIsLoading(false);
    }
  };
  const onValueChange = (e) => {
    const propName = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [propName]: value });
  };
  const onFinish = async (values) => {
    setIsLoading(true);
    const response = await updateProductLine(
      id,
      convertObjectToArray({
        ...values,
        timePeriod: {
          period: Number(values.period),
          unit: values.unit,
        },
      }),
    );
    if (response.success) {
      openNotification('success', response.msg);
      navigate(`/productline/${id}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProductLine(id);
    if (Object.keys(productLine).length > 0) {
      form.setFieldsValue({
        ...productLine,
        period: productLine.timePeriod.period,
        unit: productLine.timePeriod.unit,
      });
    }
  }, [id, Object.keys(productLine).length]);

  const selectAfter = (
    <Form.Item name="unit" noStyle>
      <Select
        className="select-after"
        name="unit"
        onChange={onValueChange}
        style={{
          width: 90,
        }}
      >
        <Option value={0}>Ngày</Option>
        <Option value={1}>Tháng</Option>
        <Option value={2}>Năm</Option>
      </Select>
    </Form.Item>
  );
  return (
    <Loading spinning={isLoading}>
      <div>
        <div className="w-1/12 mt-5">
          <Link to="/productline">
            <LeftOutlined />
          </Link>
        </div>
        <div className="w-5/6 mt-5 mx-auto">
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            initialValues={{ remember: true }}
          >
            {/* Tên dòng xe */}
            <Form.Item
              label="Tên dòng xe"
              type="text"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input
                name="name"
                placeholder="input placeholder"
                onChange={onValueChange}
              />
            </Form.Item>
            {/* Khối lượng bản thân */}
            <Form.Item
              label="Khối lượng bản thân"
              name="weight"
              type="text"
              rules={[
                {
                  required: true,
                  message: 'Please input your weight!',
                },
              ]}
            >
              <Input
                name="weight"
                placeholder="input placeholder"
                onChange={onValueChange}
              />
            </Form.Item>
            {/* Dài */}
            <Form.Item
              label="Dài"
              name="length"
              type="text"
              rules={[{ required: true, message: 'Please input your length!' }]}
            >
              <Input
                name="length"
                placeholder="input placeholder"
                onChange={onValueChange}
              />
            </Form.Item>
            {/* Rộng */}
            <Form.Item
              label="Rộng"
              name="width"
              type="text"
              rules={[
                {
                  required: true,
                  message: 'Please input your width!',
                },
              ]}
            >
              <Input
                name="width"
                placeholder="input placeholder"
                onChange={onValueChange}
              />
            </Form.Item>
            {/* Cao */}
            <Form.Item
              label="Cao"
              name="height"
              type="text"
              rules={[
                {
                  required: true,
                  message: 'Please input your height!',
                },
              ]}
            >
              <Input
                name="height"
                placeholder="input placeholder"
                onChange={onValueChange}
              />
            </Form.Item>
            {/* Khoảng cách trục bánh xe  */}
            <Form.Item
              label="Khoảng cách trục bánh xe "
              name="wheelAxleDistance"
              type="text"
              rules={[
                {
                  required: true,
                  message: 'Please input your wheelAxleDistance!',
                },
              ]}
            >
              <Input
                name="wheelAxleDistance"
                placeholder="input placeholder"
                onChange={onValueChange}
              />
            </Form.Item>
            {/* Chiều cao yên xe */}
            <Form.Item
              label="Chiều cao yên xe"
              name="saddleHeight"
              type="text"
              rules={[
                {
                  required: true,
                  message: 'Please input your saddleHeight!',
                },
              ]}
            >
              <Input
                name="saddleHeight"
                placeholder="input placeholder"
                onChange={onValueChange}
              />
            </Form.Item>
            {/* Khoảng cách gầm xe */}
            <Form.Item
              label="Khoảng cách gầm xe"
              name="groundClearance"
              type="text"
              rules={[
                {
                  required: true,
                  message: 'Please input your groundClearance!',
                },
              ]}
            >
              <Input
                name="groundClearance"
                placeholder="input placeholder"
                onChange={onValueChange}
              />
            </Form.Item>
            {/* Dung tích bình xăng */}
            <Form.Item
              label="Dung tích bình xăng"
              name="petrolTankCapacity"
              type="text"
              rules={[
                {
                  required: true,
                  message: 'Please input your petrolTankCapacity!',
                },
              ]}
            >
              <Input
                name="petrolTankCapacity"
                placeholder="input placeholder"
                onChange={onValueChange}
              />
            </Form.Item>
            {/* Mức tiêu thụ nhiên liệu */}
            <Form.Item
              label="Mức tiêu thụ nhiên liệu"
              name="fuelConsumption"
              type="text"
              rules={[
                {
                  required: true,
                  message: 'Please input your fuelConsumption!',
                },
              ]}
            >
              <Input
                name="fuelConsumption"
                placeholder="input placeholder"
                onChange={onValueChange}
              />
            </Form.Item>
            {/* Dung tích xy-lanh */}
            <Form.Item
              label="Dung tích xy-lanh"
              name="displacementVolume"
              type="text"
              rules={[
                {
                  required: true,
                  message: 'Please input your displacementVolume!',
                },
              ]}
            >
              <Input
                name="displacementVolume"
                placeholder="input placeholder"
                onChange={onValueChange}
              />
            </Form.Item>
            {/* Loại động cơ */}
            <Form.Item
              label="Loại động cơ"
              name="engineType"
              type="text"
              rules={[
                {
                  required: true,
                  message: 'Please input your engineType!',
                },
              ]}
            >
              <Input
                name="engineType"
                placeholder="input placeholder"
                onChange={onValueChange}
              />
            </Form.Item>
            <Form.Item
              label="Thời gian bảo hành"
              name="period"
              type="text"
              rules={[
                {
                  required: true,
                  message: 'Please input your engineType!',
                },
                {
                  validator: (rule, value) => {
                    if (value < 0) {
                      return Promise.reject('Thời gian bảo hành không hợp lệ');
                    } else if (value > 100) {
                      return Promise.reject('Thời gian bảo hành không hợp lệ');
                    } else if (isNaN(value)) {
                      return Promise.reject('Thời gian bảo hành không hợp lệ');
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                name="period"
                placeholder="input placeholder"
                addonAfter={selectAfter}
                onValueChange={onValueChange}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </Loading>
  );
};

export default ProductLineEdit;
