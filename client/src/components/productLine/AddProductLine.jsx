import { Button, Form, Input, Upload } from 'antd';
import { Link } from 'react-router-dom';
import { Select } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../../api/image';
import { createProductLine } from '../../api/productline';
import { useAppContext } from '../../contexts/AppContext';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import Loading from '../loading/Loading';
import './index.scss';

const AddProductLine = () => {
  const navigate = useNavigate();
  const { openNotification } = useAppContext();
  const { Option } = Select;
  const [isLoading, setIsLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const onFinish = async (values) => {
    setIsLoading(true);
    const data = fileList.map((file) => {
      return file.thumbUrl;
    });
    const response = await uploadImage({ data: data });
    if (response.success) {
      const response1 = await createProductLine({
        ...values,
        img: response.data,
        timePeriod: {
          period: Number(values.period),
          unit: Number(values.unit),
        },
      });
      if (response1.success) {
        openNotification('success', response1.msg);
        navigate('/productline');
      }
      setIsLoading(false);
      // }
    }
  };

  const selectAfter = (
    <Form.Item name="unit" noStyle>
      <Select
        className="select-after"
        name="unit"
        style={{
          width: 90,
        }}
      >
        <Option value={0}>Ngày</Option>
        <Option value={1}>Tháng</Option>
        <Option value={2}>Năm</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div>
      <div className="w-1/12 mt-5">
        <Link to="/productline">
          <LeftOutlined />
        </Link>
      </div>
      <Loading spinning={isLoading}>
        <div className="w-5/6 mt-5 mx-auto">
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="Tên dòng xe"
              type="text"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input name="name" placeholder="input placeholder" />
            </Form.Item>
            {/* <Form.Item
              label="Hình ảnh"
              type="file"
              name="img"
              rules={[
                {
                  required: true,
                  message: 'Please input your img!',
                },
              ]}
            >
              <Input
                type="file"
                onChange={handleFileInputChange}
                value={fileInputState}
                name="img"
                placeholder="input placeholder"
              />
            </Form.Item> */}
            <Form.Item
              label="Mã dòng sản phẩm"
              type="text"
              name="code"
              rules={[
                {
                  required: true,
                  message: 'Please input your code!',
                },
              ]}
            >
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
                  message: 'Please input your weight!',
                },
              ]}
            >
              <Input name="weight" placeholder="input placeholder" />
            </Form.Item>
            {/* Dài */}
            <Form.Item
              label="Dài"
              name="length"
              type="text"
              rules={[{ required: true, message: 'Please input your length!' }]}
            >
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
                  message: 'Please input your width!',
                },
              ]}
            >
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
                  message: 'Please input your height!',
                },
              ]}
            >
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
                  message: 'Please input your wheelAxleDistance!',
                },
              ]}
            >
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
                  message: 'Please input your saddleHeight!',
                },
              ]}
            >
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
                  message: 'Please input your groundClearance!',
                },
              ]}
            >
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
                  message: 'Please input your petrolTankCapacity!',
                },
              ]}
            >
              <Input
                name="petrolTankCapacity"
                placeholder="input placeholder"
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
                  message: 'Please input your fuelConsumption!',
                },
              ]}
            >
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
                  message: 'Please input your displacementVolume!',
                },
              ]}
            >
              <Input
                name="displacementVolume"
                placeholder="input placeholder"
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
                  message: 'Please input your engineType!',
                },
              ]}
            >
              <Input name="engineType" placeholder="input placeholder" />
            </Form.Item>
            <Form.Item
              label="Thời gian bảo hành"
              name="period"
              type="text"
              rules={[
                {
                  required: true,
                  message: 'Please input your engineType!',
                },
              ]}
            >
              <Input
                name="period"
                placeholder="input placeholder"
                addonAfter={selectAfter}
              />
            </Form.Item>
            <Upload
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              // fileList={fileList}
              // onPreview={handlePreview}
              onChange={(e) => {
                console.log(e.fileList);
                setFileList(e.fileList);
              }}
            >
              {uploadButton}
            </Upload>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Loading>
    </div>
  );
};

export default AddProductLine;
