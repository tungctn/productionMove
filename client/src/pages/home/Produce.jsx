import { Button, Form, Input, Select, Spin } from 'antd';
import Default from '../../layouts/Default';
import { LoadingOutlined } from '@ant-design/icons';
import { useProductLineContext } from '../../contexts/ProductLineContext';
import { useEffect, useState } from 'react';
import { createProduct } from '../../api/product';
import { useAppContext } from '../../contexts/AppContext';
const Produce = (props) => {
  "use strict"
  const { role } = props;
  const { Option } = Select;
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const {
    productlineState: { listProductLine },
    loadListProductLine,
  } = useProductLineContext();

  const { openNotification, checkMiddleware } = useAppContext();
  const [isError, setIsError] = useState(false);
  const onValueChange = (e) => {
    const propName = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [propName]: Number(value) });
  };

  const onSelectChange = (value) => {
    setFormData({ ...formData, id: value });
  };

  const handleSubmit = async () => {
    if (formData.id && formData.amount && isError === false) {
      setIsLoading(true);
      const response = await createProduct(formData);
      if (response.success) {
        openNotification('success', response.msg);
      } else {
        openNotification('error', response.msg);
      }
      setIsLoading(false);
    } else {
      openNotification('error', 'Vui lòng nhập đầy đủ thông tin');
    }
  };

  useEffect(() => {
    checkMiddleware(role, () => {
      loadListProductLine();
    });
  }, []);

  const antIcon = <LoadingOutlined />;

  return (
    <Spin spinning={isLoading} indicator={antIcon}>
      <div className="w-full">
        <Default tagName="sx">
          <div className="w-full h-full">
            <div className="mx-auto mt-5 text-3xl text-blue-700 font-bold">
              {' '}
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
                          message: 'Vui lòng chọn dòng sản phẩm',
                        },
                        {
                          validator: (_, value) => {
                            if (value) {
                              setIsError(false);
                              return Promise.resolve();
                            } else {
                              setIsError(true);
                              return Promise.reject(
                                new Error('Vui lòng chọn dòng sản phẩm'),
                              );
                            }
                          },
                        },
                      ]}
                    >
                      <Select
                        defaultValue="Chọn dòng sản phẩm"
                        style={{
                          width: 200,
                        }}
                        onChange={onSelectChange}
                        showSearch
                        filterOption={(input, option) =>
                          (option?.label ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        optionFilterProp="children"
                      >
                        {listProductLine.map((productline) => {
                          return (
                            <Option
                              value={productline._id}
                              key={productline._id}
                            >
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
                          message: 'Vui lòng nhập số lượng sản phẩm',
                        },
                        {
                          validator: (_, value) => {
                            if (value > 0) {
                              setIsError(false);
                              return Promise.resolve();
                            } else {
                              setIsError(true);
                              return Promise.reject(
                                new Error('Số lượng sản phẩm phải lớn hơn 0'),
                              );
                            }
                          },
                        },
                      ]}
                    >
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
                  onClick={handleSubmit}
                >
                  Sản xuất
                </Button>
              </div>
            </div>
          </div>
        </Default>
      </div>
    </Spin>
  );
};

export default Produce;
