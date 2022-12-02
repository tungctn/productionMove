import { Button, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductLine, updateProductLine } from "../../api/productline";
import { useAppContext } from "../../contexts/AppContext";

const ProductLineEdit = (props) => {
  const { id } = props;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { convertObjectToArray, openNotification } = useAppContext();
  const [productLine, setProductLine] = useState({});
  const [formData, setFormData] = useState({});
  const loadProductLine = async (id) => {
    const response = await getProductLine(id);
    console.log(response.data);
    if (response.success) {
      setProductLine(response.data);
    }
  };
  const onValueChange = (e) => {
    const propName = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [propName]: value });
    console.log(formData);
  };
  const onFinish = async (values) => {
    console.log(formData);
    const response = await updateProductLine(
      id,
      convertObjectToArray(formData)
    );
    if (response.success) {
      openNotification("success", response.msg);
      navigate(`/productline/${id}`);
    }
  };

  useEffect(() => {
    loadProductLine(id);
    if (Object.keys(productLine).length > 0) {
      form.setFieldsValue({
        ...productLine,
      });
    }
  }, [id, Object.keys(productLine).length]);

  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{ remember: true }}>
        {/* Tên dòng xe */}
        <Form.Item
          label="Tên dòng xe"
          type="text"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}>
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
              message: "Please input your weight!",
            },
          ]}>
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
          rules={[{ required: true, message: "Please input your length!" }]}>
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
              message: "Please input your width!",
            },
          ]}>
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
              message: "Please input your height!",
            },
          ]}>
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
              message: "Please input your wheelAxleDistance!",
            },
          ]}>
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
              message: "Please input your saddleHeight!",
            },
          ]}>
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
              message: "Please input your groundClearance!",
            },
          ]}>
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
              message: "Please input your petrolTankCapacity!",
            },
          ]}>
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
              message: "Please input your fuelConsumption!",
            },
          ]}>
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
              message: "Please input your displacementVolume!",
            },
          ]}>
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
              message: "Please input your engineType!",
            },
          ]}>
          <Input
            name="engineType"
            placeholder="input placeholder"
            onChange={onValueChange}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ProductLineEdit;
