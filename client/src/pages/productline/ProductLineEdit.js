import React from "react";
import { Button, Form, Input } from "antd";
import Default from "../../Layouts/Default";

const ProductLineEdit = () => {
  return (
    <div>
      <Default tagName="dsp">
        <Form
          name="basic"
          style={{
            padding: "0 30px",
          }}
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          autoComplete="on">
          <Form.Item
            name=""
            label="Tên dòng sản phẩm"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}>
            <Input placeholder="" />
          </Form.Item>

          <Form.Item>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              Dang nhap
            </Button>
          </Form.Item>
        </Form>
      </Default>
    </div>
  );
};

export default ProductLineEdit;
