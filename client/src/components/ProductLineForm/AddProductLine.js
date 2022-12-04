import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { createProductLine } from "../../api/productline";
import { useAppContext } from "../../contexts/AppContext";

const AddProductLine = () => {
  const navigate = useNavigate();
  const { openNotification } = useAppContext();

  const onFinish = async (values) => {
    const response = await createProductLine(values);
    if (response.success) {
      openNotification("success", response.msg);

      navigate("/productline");
    }
  };
  return (
    <div>
      <Form
        layout="vertical"
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
          <Input name="name" placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          label="Hình ảnh"
          type="file"
          name="img"
          rules={[
            {
              required: true,
              message: "Please input your img!",
            },
          ]}>
          <Input type="file" name="img" placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          label="Mã dòng sản phẩm"
          type="text"
          name="code"
          rules={[
            {
              required: true,
              message: "Please input your code!",
            },
          ]}>
          <Input name="code" placeholder="input placeholder" />
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
          <Input name="weight" placeholder="input placeholder" />
        </Form.Item>
        {/* Dài */}
        <Form.Item
          label="Dài"
          name="length"
          type="text"
          rules={[{ required: true, message: "Please input your length!" }]}>
          <Input name="length" placeholder="input placeholder" />
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
          <Input name="width" placeholder="input placeholder" />
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
          <Input name="height" placeholder="input placeholder" />
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
          <Input name="wheelAxleDistance" placeholder="input placeholder" />
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
          <Input name="saddleHeight" placeholder="input placeholder" />
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
          <Input name="groundClearance" placeholder="input placeholder" />
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
          <Input name="petrolTankCapacity" placeholder="input placeholder" />
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
          <Input name="fuelConsumption" placeholder="input placeholder" />
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
          <Input name="displacementVolume" placeholder="input placeholder" />
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
          <Input name="engineType" placeholder="input placeholder" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddProductLine;
