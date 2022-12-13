import { Image, Descriptions, Modal, Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getProductLine } from "../../api/productline";
import { getProduct, updateProduct } from "../../api/product";
import { useAppContext } from "../../contexts/AppContext";

const ProductDetail = (props) => {
  const { id, page, status } = props;
  const navigate = useNavigate();
  const { convertStatusToNameProduct, openNotification } = useAppContext();
  const [product, setProduct] = useState({});
  const [productLine, setProductLine] = useState({});
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [showClient, setShowClient] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const loadProduct = async (id) => {
    const response = await getProduct(id);
    console.log(response.data);
    if (response.success) {
      setProductLine(response.data.productLine);
      setProduct({
        ...response.data,
        statusName: convertStatusToNameProduct(response.data.status),
      });
    }
  };

  useEffect(() => {
    loadProduct(id);
  }, [id]);

  const onValueChange = (e) => {
    const propName = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [propName]: value });
    console.log(formData);
  };

  const handleOk = async () => {
    const response = await updateProduct(id, [
      { propName: "customer", value: formData },
      { propName: "isSold", value: true },
      { propName: "status", value: 2 },
    ]);
    if (response.success) {
      openNotification("success", response.msg);
      setVisible(false);
    } else {
      openNotification("error", "Failed");
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  return (
    <div>
      <Image src={productLine.img} width={400} preview={false} />
      <h2 className="font-bold text-base">Trạng thái: {product?.statusName}</h2>
      <div className="text-right text-2xl text-cyan-500">
        {/* {!product?.isSold ? ( */}
          <Button onClick={showModal} type="primary">
            {product?.statusName}
          </Button>
        {/* ) : (
          <Button type="primary">{product?.statusName}</Button>
        )} */}
      </div>
      {product?.isSold && (
        <h1
          className="font-bold text-base  mb-3 cursor-pointer"
          onClick={() => {
            setShowClient(!showClient);
          }}>
          Thông tin khách hàng {showClient ? <UpOutlined /> : <DownOutlined />}
        </h1>
      )}

      {showClient && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Tên khách hàng">
            {product?.customer?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {product?.customer?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {product?.customer?.address}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {product?.customer?.phone}
          </Descriptions.Item>
        </Descriptions>
      )}

      <h1
        className="font-bold text-base my-3 cursor-pointer"
        onClick={() => {
          setShowProduct(!showProduct);
        }}>
        Thông tin sản phẩm {showProduct ? <UpOutlined /> : <DownOutlined />}
      </h1>
      {showProduct && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Tên dòng xe">
            {productLine.name}
          </Descriptions.Item>
          <Descriptions.Item label="Khối lượng bản thân">
            {productLine.weight}
          </Descriptions.Item>
          <Descriptions.Item label="Dài">
            {productLine.length}
          </Descriptions.Item>
          <Descriptions.Item label="Rộng">
            {productLine.width}
          </Descriptions.Item>
          <Descriptions.Item label="Cao">
            {productLine.height}
          </Descriptions.Item>
          <Descriptions.Item label="Khoảng cách trục bánh xe">
            {productLine.wheelAxleDistance}
          </Descriptions.Item>
          <Descriptions.Item label="Chiều cao yên xe">
            {productLine.saddleHeight}
          </Descriptions.Item>
          <Descriptions.Item label="Khoảng cách gầm xe">
            {productLine.groundClearance}
          </Descriptions.Item>
          <Descriptions.Item label="Dung tích bình xăng">
            {productLine.petrolTankCapacity}
          </Descriptions.Item>
          <Descriptions.Item label="Mức tiêu thụ nhiên liệu">
            {productLine.fuelConsumption}
          </Descriptions.Item>
          <Descriptions.Item label="Dung tích xy-lanh">
            {productLine.displacementVolume}
          </Descriptions.Item>
          <Descriptions.Item label="Loại động cơ">
            {productLine.engineType}
          </Descriptions.Item>
        </Descriptions>
      )}

      {product?.status === 1 && (
        <Modal
          destroyOnClose={true}
          open={visible}
          title="Thông tin khách hàng"
          onCancel={handleCancel}
          onOk={handleOk}
          okText="Ok"
          cancelText="Cancel">
          <Form initialValues={{ remember: true }}>
            <Form.Item
              label="Tên khách hàng"
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
            <Form.Item
              label="Email"
              type="text"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}>
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
                  message: "Please input your address!",
                },
              ]}>
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
                  message: "Please input your phone!",
                },
              ]}>
              <Input
                name="phone"
                placeholder="input placeholder"
                onChange={onValueChange}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
      {product?.status === 2 && (
        <Modal
          destroyOnClose={true}
          open={visible}
          title="Thông tin khách hàng"
          onCancel={handleCancel}
          onOk={handleOk}
          okText="Ok"
          cancelText="Cancel"></Modal>
      )}
    </div>
  );
};

export default ProductDetail;
