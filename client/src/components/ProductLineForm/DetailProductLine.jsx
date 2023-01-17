import { Image, Descriptions, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getProductLine } from '../../api/productline';
import ProductLineDelete from './DeleteProductLine';
import SummonProductLine from './SummonProductLine';
import Loading from '../Loading/Loading';
import Slider from '../Slider/Slider';

const ProductLineDetail = (props) => {
  const { id, page } = props;
  const navigate = useNavigate();
  const [productLine, setProductLine] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const loadProductLine = async (id) => {
    setIsLoading(true);
    const response = await getProductLine(id);
    if (response.success) {
      setProductLine(response.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProductLine(id);
  }, []);

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
      <Slider data={data} />
      <div className="mt-5 w-11/12 mx-auto">
        {page === 'productline' && (
          <div>
            <div className="text-right text-3xl text-cyan-500">
              <EditOutlined
                onClick={() => {
                  navigate(`/productline/${id}/edit`);
                }}
              />
              <ProductLineDelete id={id} />
            </div>
            <SummonProductLine productLine={productLine} />
          </div>
        )}
        {page === 'import' && (
          <div className="text-right text-2xl text-cyan-500">
            <Button
              onClick={() => {
                navigate(`/import/productline/${id}/factory`);
              }}
              type="primary"
            >
              Đặt hàng
            </Button>
          </div>
        )}
        <Descriptions title="Thông tin chi tiết" bordered column={1}>
          <Descriptions.Item label="Tên dòng xe">
            {productLine?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Khối lượng bản thân">
            {productLine?.weight} kg
          </Descriptions.Item>
          <Descriptions.Item label="Dài">
            {productLine?.length} mm
          </Descriptions.Item>
          <Descriptions.Item label="Rộng">
            {productLine?.width} mm
          </Descriptions.Item>
          <Descriptions.Item label="Cao">
            {productLine?.height} mm
          </Descriptions.Item>
          <Descriptions.Item label="Khoảng cách trục bánh xe">
            {productLine?.wheelAxleDistance} mm
          </Descriptions.Item>
          <Descriptions.Item label="Chiều cao yên xe">
            {productLine?.saddleHeight} mm
          </Descriptions.Item>
          <Descriptions.Item label="Khoảng cách gầm xe">
            {productLine?.groundClearance} mm
          </Descriptions.Item>
          <Descriptions.Item label="Dung tích bình xăng">
            {productLine?.petrolTankCapacity} L
          </Descriptions.Item>
          <Descriptions.Item label="Mức tiêu thụ nhiên liệu">
            {productLine?.fuelConsumption} L/100km
          </Descriptions.Item>
          <Descriptions.Item label="Dung tích xy-lanh">
            {productLine?.displacementVolume} cm3
          </Descriptions.Item>
          <Descriptions.Item label="Loại động cơ">
            {productLine?.engineType}
          </Descriptions.Item>
          <Descriptions.Item label="Thời hạn bảo hành">
            {productLine?.timePeriod?.period}{' '}
            {productLine?.timePeriod?.unit === 0 && 'ngày'}
            {productLine?.timePeriod?.unit === 1 && 'tháng'}
            {productLine?.timePeriod?.unit === 2 && 'năm'}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Loading>
  );
};

export default ProductLineDetail;
