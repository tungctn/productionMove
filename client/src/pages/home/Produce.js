import { Button, Form, Input, Select } from "antd";
import Default from "../../layouts/Default";
import { DownOutlined } from "@ant-design/icons";
import { useProductLineContext } from "../../contexts/ProductLineContext";
import { useEffect, useState } from "react";
import { createProduct } from "../../api/product";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
const Produce = () => {
  const { Option } = Select;
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const {
    productlineState: { listProductLine },
    loadListProductLine,
  } = useProductLineContext();

  const { openNotification, refreshPage } = useAppContext();

  const onValueChange = (e) => {
    const propName = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [propName]: Number(value) });
    console.log(formData);
  };

  const onSelectChange = (value) => {
    setFormData({ ...formData, id: value });
  };

  const handleSubmit = async () => {
    if (formData.id && formData.amount) {
      const response = await createProduct(formData);
      console.log(response.data);
      if (response.success) {
        openNotification("success", response.msg);
        navigate("/home");
        refreshPage();
      } else {
        openNotification("error", response.msg);
      }
    } else {
      openNotification("error", "Vui lòng nhập đầy đủ thông tin");
    }
  };

  useEffect(() => {
    loadListProductLine();
  }, []);

  return (
    <div className="w-full">
      <Default tagName="sx">
        <div className="w-full h-full">
          <div className="mx-auto mt-5 text-3xl text-inherit text-orange-600">
            {" "}
            Đơn sản xuất
          </div>
          <div className="w-1/2 mt-20 mx-auto flex flex-col space-y-10">
            <div className="flex flex-row space-x-10">
              <div className="w-1/3 text-xl text-right">Dòng sản phẩm: </div>
              <div className="w-2/3">
                <Form>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn dòng sản phẩm",
                      },
                      {
                        validator: (_, value) => {
                          if (value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Vui lòng chọn dòng sản phẩm")
                          );
                        },
                      },
                    ]}>
                    <Select
                      defaultValue="Chọn dòng sản phẩm"
                      style={{
                        width: 200,
                      }}
                      onChange={onSelectChange}
                      status="warning">
                      {listProductLine.map((productline) => {
                        return (
                          <Option value={productline._id} key={productline._id}>
                            {productline.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Form>
              </div>
            </div>
            <div className="flex flex-row space-x-10">
              <div className="w-1/3 text-xl text-right">Số lượng: </div>
              <div className="w-2/3">
                <Form>
                  <Form.Item
                    name="amount"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số lượng sản phẩm",
                      },
                      {
                        validator: (_, value) => {
                          if (value > 0) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Số lượng sản phẩm phải lớn hơn 0")
                          );
                        },
                      },
                    ]}>
                    <Input
                      name="amount"
                      type="number"
                      onChange={onValueChange}
                      style={{
                        width: 200,
                      }}
                    />
                  </Form.Item>
                </Form>
              </div>
            </div>
            <div className="mt-20">
              <Button
                className="block mr-0 ml-auto"
                type="primary"
                htmlType="submit"
                onClick={handleSubmit}>
                Sản xuất
              </Button>
            </div>
          </div>
        </div>
      </Default>
    </div>
  );
};

export default Produce;
