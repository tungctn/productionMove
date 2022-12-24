import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import bcrypt from "bcryptjs-react";

const ChangePass = (props) => {
  const { user } = props;
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const onValueChange = (e) => {
    console.log(bcrypt.hashSync(e.target.value, 10) === user.password);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Thay đổi mật khẩu
      </Button>
      <Modal
        title="Thay đổi mật khẩu"
        destroyOnClose={true}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form>
          <Form.Item
            label="Mật khẩu cũ"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input  your password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters!",
              },
              {
                max: 20,
                message: "Password must be at most 20 characters!",
              },
              {
                validator: (_, value) => {
                  if (
                    value &&
                    bcrypt.hash(value, bcrypt.genSalt(10)) !== user.password
                  ) {
                    return Promise.reject("Password is incorrect!");
                  }
                  return Promise.resolve();
                },
              },
            ]}>
            <Input.Password onChange={onValueChange} />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters!",
              },
              {
                max: 20,
                message: "Password must be at most 20 characters!",
              },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                message:
                  "Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number!",
              },
            ]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu mới"
            name="rePassword"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters!",
              },
              {
                max: 20,
                message: "Password must be at most 20 characters!",
              },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/,
                message:
                  "Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number!",
              },
            ]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ChangePass;
