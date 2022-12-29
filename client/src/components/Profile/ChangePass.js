import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import bcrypt from "bcryptjs-react";
import { changePassword, checkPassword } from "../../api/user";
import { useAppContext } from "../../contexts/AppContext";

const ChangePass = (props) => {
  const { user } = props;
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const { openNotification } = useAppContext();
  let isError = false;
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = async () => {
    console.log(formData);
    if (isError === false) {
      const response = await changePassword(formData);
      if (response.success) {
        openNotification("success", response.msg);
        setVisible(false);
      }
    }
  };

  const onValueChange = (e) => {
    const propName = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [propName]: value });
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
                isError: true,
              },
              {
                min: 6,
                message: "Password must be at least 6 characters!",
                isError: true,
              },
              {
                max: 20,
                message: "Password must be at most 20 characters!",
              },
              {
                validator: async (_, value) => {
                  const response = await checkPassword({
                    password: value,
                    current: user.password,
                  });
                  if (response.success === false) {
                    isError = true;
                    return Promise.reject("Password is incorrect!");
                  }
                  return Promise.resolve();
                },
              },
            ]}>
            <Input.Password name="password" onChange={onValueChange} />
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
            ]}>
            <Input.Password name="newPassword" onChange={onValueChange} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ChangePass;
