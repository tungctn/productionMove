import { Image, Descriptions, Modal, Button, Form, Input, Select } from "antd";
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
import { useUserContext } from "../../contexts/UserContext";
import { createRequest } from "../../api/request";
import { setAuthHeader } from "../../api/auth";
import { useRequestContext } from "../../contexts/RequestContext";

const ProductDetail = (props) => {
  const { id, page, status } = props;
  const { TextArea } = Input;
  const navigate = useNavigate();
  const {
    convertStatusToNameProduct,
    openNotification,
    convertObjectToArray,
    authState: { user },
  } = useAppContext();
  const { handleCreateRequest } = useRequestContext();
  const [product, setProduct] = useState({});
  const [productLine, setProductLine] = useState({});
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [showClient, setShowClient] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [location, setLocation] = useState();
  const [type, setType] = useState();
  const [factory, setFactory] = useState();
  const [requestData, setRequestData] = useState({
    requester: "",
    recipient: "",
    product: "",
    productLine: "",
  });
  const [note, setNote] = useState("");
  // type = null: da bao hanh xong
  // type = 1: loi can tra ve nha may
  // type = 2: tra san pham
  const [form] = Form.useForm();
  const {
    userState: { listUser },
  } = useUserContext();
  const loadProduct = async (id) => {
    setAuthHeader(localStorage["token"]);
    const response = await getProduct(id);
    console.log(response.data);
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
    }
  };
  const dataOption4 = listUser
    ?.filter((users) => users.role === 4)
    .map((users, index) => {
      return {
        ...users,
        label: users.name,
        value: users._id,
      };
    });

  const dataOption2 = listUser
    ?.filter((users) => users.role === 2)
    .map((users, index) => {
      return {
        ...users,
        label: users.name,
        value: users._id,
      };
    });

  useEffect(() => {
    loadProduct(id);
    console.log(dataOption4);
    console.log(dataOption2);
  }, [id]);

  const onValueChange = (e) => {
    const propName = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [propName]: value });
    console.log(formData);
  };

  const handleOk = async () => {
    if (product?.status === 1 && !type) {
      const response = await updateProduct(id, [
        { propName: "customer", value: formData },
        { propName: "isSold", value: true },
        { propName: "status", value: 2 },
      ]);
      if (response.success) {
        openNotification("success", response.msg);
        loadProduct(id);
        setVisible(false);
      } else {
        openNotification("error", "Failed");
      }
    } else if (product?.status === 1 && type === 2) {
      const response = await createRequest(requestData);
      if (response.success) {
        openNotification("success", response.msg);
        loadProduct(id);
        setVisible(false);
      } else {
        openNotification("error", "Failed");
      }
    } else if (product?.status === 2) {
      const response = await updateProduct(
        id,
        convertObjectToArray({ status: 3 })
      );
      if (response.success) {
        openNotification("success", response.msg);
        loadProduct(id);
        setVisible(false);
      } else {
        openNotification("error", "Failed");
      }
    } else if (product?.status === 3) {
      const response = await handleCreateRequest({
        note: note,
        product: product?._id,
        recipient: location,
        requester: user._id,
        type: 1,
      });
      if (response.success) {
        openNotification("success", response.msg);
        navigate("/");
        setVisible(false);
      } else {
        openNotification("error", "Failed");
      }
    } else if (product?.status === 4 && !type) {
      const response = await updateProduct(
        id,
        convertObjectToArray({ status: 5 })
      );
      if (response.success) {
        openNotification("success", response.msg);
        loadProduct(id);
        navigate("/");
        setVisible(false);
      } else {
        openNotification("error", "Failed");
      }
    } else if (product?.status === 4 && type === 1) {
      const response = await updateProduct(
        id,
        convertObjectToArray({ status: 7 })
      );
      if (response.success) {
        openNotification("success", response.msg);
        loadProduct(id);
        setVisible(false);
      } else {
        openNotification("error", "Failed");
      }
    } else if (product?.status === 5 && user.role === 4) {
      const response = await handleCreateRequest({
        note: note,
        product: product?._id,
        recipient: product?.store._id,
        requester: user._id,
        type: 2,
      });
      if (response.success) {
        openNotification("success", response.msg);
        navigate("/");
        setVisible(false);
      } else {
        openNotification("error", "Failed");
      }
    } else if (product?.status === 5 && user.role === 3) {
      const response = await updateProduct(
        id,
        convertObjectToArray({ status: 6 })
      );
      if (response.success) {
        openNotification("success", response.msg);
        loadProduct(id);
        navigate("/");
        setVisible(false);
      } else {
        openNotification("error", "Failed");
      }
    } else if (product?.status === 7) {
      const response = await handleCreateRequest({
        product: id,
        recipient: product.factory._id,
        requester: user._id,
        type: 3,
      });
      if (response.success) {
        openNotification("success", response.msg);
        navigate("/request");
        setVisible(false);
      } else {
        openNotification("error", "Failed");
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
    console.log(location);
    setLocation(location);
  };

  const onFactoryChange = (location) => {
    setLocation(location);
    console.log(location);
  };

  const onNoteChange = (e) => {
    setNote(e.target.value);
    setRequestData({ ...requestData, note: e.target.value });
  };

  return (
    <div>
      <Image src={productLine.img} width={400} preview={false} />
      <h2 className="font-bold text-base">Trạng thái: {product?.statusName}</h2>
      <div className="text-right text-2xl text-cyan-500">
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
            {product?.status === 2 && (
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
                  type="primary">
                  Không thể bảo hành
                </Button>
              </div>
            )}
            {product?.status === 5 && (
              <div>
                <Button onClick={showModal} type="primary">
                  Gửi sản phẩm về nhà máy
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

      {product?.status === 1 && !type && (
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
      {product?.status === 1 && type === 2 && (
        <Modal
          destroyOnClose={true}
          open={visible}
          title="Trả sản phẩm"
          onCancel={handleCancel}
          onOk={handleOk}
          okText="Ok"
          cancelText="Cancel">
          <div>
            Bạn có chắc chắn muốn trả sản phẩm này về nhà máy {factory} không?
          </div>
          <div>Ghi chú:</div>
          <TextArea onChange={onNoteChange}></TextArea>
        </Modal>
      )}
      {product?.status === 2 && (
        <Modal
          destroyOnClose={true}
          open={visible}
          title="Sản phẩm bị lỗi"
          onCancel={handleCancel}
          onOk={handleOk}
          okText="Ok"
          cancelText="Cancel">
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
          cancelText="Cancel">
          <p>Bạn có chắc chắn muốn gửi sản phẩm đi bảo hành không?</p>
          <Select
            showSearch
            placeholder="Select a warrantyCenter"
            optionFilterProp="children"
            onChange={onWarrantyChange}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
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
          cancelText="Cancel">
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
          cancelText="Cancel">
          {user?.role === 4 && (
            <div>
              <p>Bạn có chắc chắn muốn gửi sản phẩm về nhà máy không?</p>
              <p>Ghi chú:</p>
              <TextArea onChange={onNoteChange}></TextArea>
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
          cancelText="Cancel">
          <p>Bạn có chắc chắn muốn trả sản phẩm về nhà máy không?</p>
          <Select
            showSearch
            placeholder="Select a factory"
            optionFilterProp="children"
            onChange={onFactoryChange}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={dataOption2}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductDetail;
