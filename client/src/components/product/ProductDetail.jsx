import { Image, Modal, Button, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, getProduct, updateProduct } from '../../api/product';
import { useAppContext } from '../../contexts/AppContext';
import { useUserContext } from '../../contexts/UserContext';
import { createRequest } from '../../api/request';
import Loading from '../loading/Loading';
import SpecProductLine from '../productLine/SpecProductLine';
import Slider from '../slider/Image';
import Customer from './Customer';

const ProductDetail = (props) => {
  const { id } = props;
  const { TextArea } = Input;
  const navigate = useNavigate();
  const {
    convertStatusToNameProduct,
    openNotification,
    convertObjectToArray,
    convertUnitToName,
    authState: { user },
  } = useAppContext();
  const [product, setProduct] = useState({});
  const [productLine, setProductLine] = useState({});
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [showClient, setShowClient] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [location, setLocation] = useState();
  const [type, setType] = useState();
  const [factory, setFactory] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [requestData, setRequestData] = useState({
    requester: '',
    recipient: '',
    product: '',
    productLine: '',
  });
  const [note, setNote] = useState('');
  const [isError, setIsError] = useState(false);
  // type = null: da bao hanh xong
  // type = 1: loi can tra ve nha may
  // type = 2: tra san pham
  const {
    userState: { listUser },
    loadListUser,
  } = useUserContext();
  const loadProduct = async (id) => {
    setIsLoading(true);
    const response = await getProduct(id);
    if (response.success) {
      setProductLine(response.data.productLine);
      setProduct({
        ...response.data,
        statusName: convertStatusToNameProduct(response.data.status),
      });
      setFactory(response.data.factory.name);
      setRequestData({
        ...requestData,
        product: response.data._id,
        productLine: response.data.productLine._id,
        requester: user._id,
        recipient: response.data.factory._id,
        type: 4,
      });
      setIsLoading(false);
    }
  };
  const dataOption4 = listUser
    ?.filter((users) => users.role === 4)
    .map((users) => {
      return {
        ...users,
        label: users.name,
        value: users._id,
      };
    });

  const onValueChange = (e) => {
    const propName = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [propName]: value });
  };

  const deadDate = (date, period, unit) => {
    const newDate = new Date(date);
    switch (unit) {
      case 0:
        newDate.setDate(newDate.getDate() + period);
        break;
      case 1:
        newDate.setMonth(newDate.getMonth() + period);
        break;
      case 2:
        newDate.setFullYear(newDate.getFullYear() + period);
        break;
      default:
        break;
    }
    return newDate;
  };
  const handleOk = async () => {
    let response;
    if (product?.status === 1 && !type && isError === false) {
      response = await updateProduct(id, [
        { propName: 'customer', value: { ...formData, soldDate: new Date() } },
        { propName: 'isSold', value: true },
        { propName: 'status', value: 2 },
        {
          propName: 'deadTime',
          value: deadDate(
            new Date(),
            productLine?.timePeriod.period,
            productLine?.timePeriod.unit,
          ),
        },
      ]);
      if (response.success) {
        openNotification('success', response.msg);
        setVisible(false);
      } else {
        openNotification('error', 'Failed');
      }
    } else if (product?.status === 1 && type === 2) {
      response = await createRequest({
        ...requestData,
        description: `Trả sản phẩm ${product?.name}`,
      });
      if (response.success) {
        openNotification('success', response.msg);
        setVisible(false);
      } else {
        openNotification('error', 'Failed');
      }
    } else if (product?.status === 2 || product?.status === 6) {
      response = await updateProduct(id, convertObjectToArray({ status: 3 }));
      if (response.success) {
        openNotification('success', response.msg);
        setVisible(false);
      } else {
        openNotification('error', 'Failed');
      }
    } else if (product?.status === 3) {
      const dateNow = new Date();
      if (new Date(dateNow) - new Date(product?.deadTime) <= 0) {
        response = await createRequest({
          note: note,
          product: product?._id,
          recipient: location,
          requester: user._id,
          type: 1,
        });
        if (response.success) {
          openNotification('success', response.msg);
          navigate('/request');
          setVisible(false);
        } else {
          openNotification('error', 'Failed');
        }
      } else {
        response = await updateProduct(
          id,
          convertObjectToArray({ status: 10 }),
        );
        if (response.success) {
          openNotification('success', 'Đã hết hạn bảo hành');
          setVisible(false);
        }
      }
    } else if (product?.status === 4 && !type) {
      response = await updateProduct(id, convertObjectToArray({ status: 5 }));
      if (response.success) {
        openNotification('success', response.msg);
        setVisible(false);
      } else {
        openNotification('error', 'Failed');
      }
    } else if (product?.status === 4 && type === 1) {
      response = await updateProduct(id, convertObjectToArray({ status: 7 }));
      if (response.success) {
        openNotification('success', response.msg);
        setVisible(false);
      } else {
        openNotification('error', 'Failed');
      }
    } else if (product?.status === 5 && user.role === 4) {
      response = await createRequest({
        note: note,
        product: product?._id,
        recipient: product?.store._id,
        requester: user._id,
        type: 2,
      });
      if (response.success) {
        openNotification('success', response.msg);
        navigate('/');
        setVisible(false);
      } else {
        openNotification('error', 'Failed');
      }
    } else if (product?.status === 5 && user.role === 3) {
      response = await updateProduct(id, convertObjectToArray({ status: 6 }));
      if (response.success) {
        openNotification('success', response.msg);
        navigate('/');
        setVisible(false);
      } else {
        openNotification('error', 'Failed');
      }
    } else if (product?.status === 7) {
      response = await createRequest({
        product: id,
        recipient: product.factory._id,
        requester: user._id,
        type: 3,
        note: note,
      });
      const response1 = await createRequest({
        product: id,
        recipient: product.store._id,
        requester: user._id,
        type: 5,
        note: note,
      });
      if (response.success && response1.success) {
        openNotification('success', response.msg);
        navigate('/request');
        setVisible(false);
      } else {
        openNotification('error', 'Failed');
      }
    } else if (product?.status === 9) {
      response = await createRequest({
        product: id,
        recipient: location,
        requester: user._id,
        type: 1,
        note: note,
      });
      if (response.success) {
        openNotification('success', response.msg);
        navigate('/request');
        setVisible(false);
      }
    } else if (product?.status === 8) {
      response = await deleteProduct(id);
      if (response.success) {
        openNotification('success', response.msg);
        setVisible(false);
        navigate('/home');
      } else {
        openNotification('error', 'Failed');
      }
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setType(null);
  };

  const showModal = (type) => {
    if (type === 1) {
      setType(1);
      setVisible(true);
    } else if (type === 2) {
      setType(2);
      setVisible(true);
    } else {
      setVisible(true);
    }
  };

  const onWarrantyChange = (location) => {
    setLocation(location);
  };

  const onNoteChange = (e) => {
    setNote(e.target.value);
    setRequestData({ ...requestData, note: e.target.value });
  };

  useEffect(() => {
    loadProduct(id);
    loadListUser();
  }, [id, openNotification]);

  // useEffect(() => {
  //   loadProduct(id);
  // }, [id]);

  const data = productLine?.img?.map((img, index) => {
    return (
      <Image
        width={400}
        src={img}
        alt="Ảnh dòng xe"
        style={{ objectFit: 'cover' }}
        key={index}
        className="mb-5 duration-200"
        preview={false}
        height={400}
      />
    );
  });

  return (
    <Loading spinning={isLoading}>
      <div>
        {/* <Image src={productLine.img} width={400} preview={false} /> */}
        <Slider data={data} />
        <h2 className="font-bold text-base">
          Trạng thái: {product?.statusName}
        </h2>
        <div className=" text-2xl text-cyan-500">
          {user.role === 3 && (
            <div>
              {product?.status === 1 && (
                <div>
                  <Button onClick={showModal} type="primary">
                    Bán sản phẩm
                  </Button>
                  <Button type="primary" onClick={() => showModal(2)}>
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
            </div>
          )}
          {user.role === 4 && (
            <div>
              {product?.status === 4 && (
                <div>
                  <Button onClick={showModal} type="primary">
                    Đã bảo hành xong
                  </Button>
                  <Button
                    onClick={() => {
                      showModal(1);
                    }}
                    type="primary"
                  >
                    Không thể bảo hành
                  </Button>
                </div>
              )}
              {product?.status === 5 && (
                <div>
                  <Button onClick={showModal} type="primary">
                    Gửi sản phẩm về đại lý
                  </Button>
                </div>
              )}
              {product?.status === 7 && (
                <div>
                  <Button onClick={showModal} type="primary">
                    Trả về nhà máy
                  </Button>
                </div>
              )}
            </div>
          )}
          {product?.status === 9 && (
            <Button onClick={showModal} type="primary">
              Triệu hồi sản phẩm
            </Button>
          )}
          {product?.status === 8 && (
            <Button onClick={showModal} type="primary">
              Xoá sản phẩm
            </Button>
          )}
        </div>
        <Customer product={product} />

        <h1
          className="font-bold text-base my-3 cursor-pointer"
          onClick={() => {
            setShowProduct(!showProduct);
          }}
        >
          Thông tin sản phẩm {showProduct ? <UpOutlined /> : <DownOutlined />}
        </h1>
        {showProduct && <SpecProductLine productLine={productLine} />}

        {product?.status === 1 && !type && (
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
                          return Promise.reject(
                            'Email không được quá 50 ký tự',
                          );
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
        {product?.status === 1 && type === 2 && (
          <Modal
            destroyOnClose={true}
            open={visible}
            title="Trả sản phẩm"
            onCancel={handleCancel}
            onOk={handleOk}
            okText="Ok"
            cancelText="Cancel"
          >
            <div>
              Bạn có chắc chắn muốn trả sản phẩm này về nhà máy {factory} không?
            </div>
            <div>Ghi chú:</div>
            <TextArea onChange={onNoteChange}></TextArea>
          </Modal>
        )}
        {(product?.status === 2 || product?.status === 6) && (
          <Modal
            destroyOnClose={true}
            open={visible}
            title="Sản phẩm bị lỗi"
            onCancel={handleCancel}
            onOk={handleOk}
            okText="Ok"
            cancelText="Cancel"
          >
            <p>Bạn có chắc chắn sản phẩm này bị lỗi không?</p>
          </Modal>
        )}
        {product?.status === 3 && (
          <Modal
            destroyOnClose={true}
            open={visible}
            title="Sản phẩm bị lỗi"
            onCancel={handleCancel}
            onOk={handleOk}
            okText="Ok"
            cancelText="Cancel"
          >
            <p>Bạn có chắc chắn muốn gửi sản phẩm đi bảo hành không?</p>
            <Select
              showSearch
              placeholder="Select a warrantyCenter"
              optionFilterProp="children"
              onChange={onWarrantyChange}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={dataOption4}
            />
            <div>Ghi chú:</div>
            <TextArea onChange={onNoteChange}></TextArea>
          </Modal>
        )}
        {product?.status === 4 && (
          <Modal
            destroyOnClose={true}
            open={visible}
            title="Sản phẩm bị lỗi"
            onCancel={handleCancel}
            onOk={handleOk}
            okText="Ok"
            cancelText="Cancel"
          >
            {type === 1 ? (
              <p>Bạn có chắc sản phẩm không thể bảo hành không?</p>
            ) : (
              <p>Bạn đã bảo hành xong?</p>
            )}
          </Modal>
        )}
        {product?.status === 5 && (
          <Modal
            destroyOnClose={true}
            open={visible}
            title="Đã bảo hành xong"
            onCancel={handleCancel}
            onOk={handleOk}
            okText="Ok"
            cancelText="Cancel"
          >
            {user?.role === 4 && (
              <div>
                <p>Bạn có chắc chắn muốn gửi sản phẩm về đại lý không?</p>
                <p>Ghi chú:</p>
                <TextArea onChange={onNoteChange} />
              </div>
            )}
            {user?.role === 3 && (
              <div>
                <p>Bạn có chắc chắn muốn trả sản phẩm cho khách hàng?</p>
              </div>
            )}
          </Modal>
        )}
        {product?.status === 7 && (
          <Modal
            destroyOnClose={true}
            open={visible}
            title="Sản phẩm bị lỗi"
            onCancel={handleCancel}
            onOk={handleOk}
            okText="Ok"
            cancelText="Cancel"
          >
            <p>
              Bạn có chắc chắn muốn trả sản phẩm về nhà máy {factory} không?
            </p>
            <div>Ghi chú:</div>
            <TextArea onChange={onNoteChange} />
          </Modal>
        )}
        {product?.status === 9 && (
          <Modal
            destroyOnClose={true}
            open={visible}
            title="Sản phẩm bị lỗi"
            onCancel={handleCancel}
            onOk={handleOk}
            okText="Ok"
            cancelText="Cancel"
          >
            <p>
              Bạn có chắc chắn muốn đưa sản phẩm về trung tâm bảo hành để sửa
              chữa không?
            </p>
            <Select
              showSearch
              placeholder="Select a warrantyCenter"
              optionFilterProp="children"
              onChange={onWarrantyChange}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={dataOption4}
            />
            <div>Ghi chú:</div>
            <TextArea onChange={onNoteChange} />
          </Modal>
        )}
        {product?.status === 8 && (
          <Modal
            destroyOnClose={true}
            open={visible}
            title="Sản phẩm bị lỗi"
            onCancel={handleCancel}
            onOk={handleOk}
            okText="Ok"
            cancelText="Cancel"
          >
            <p>Bạn có chắc chắn muốn bỏ sản phẩm này khỏi kho?</p>
          </Modal>
        )}
      </div>
    </Loading>
  );
};

export default ProductDetail;
