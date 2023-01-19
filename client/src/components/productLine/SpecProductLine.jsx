import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Descriptions } from 'antd';

const SpecProductLine = (props) => {
  const { productLine } = props;
  return (
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
  );
};

SpecProductLine.propTypes = {};

export default memo(SpecProductLine);
