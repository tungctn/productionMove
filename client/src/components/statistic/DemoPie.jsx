import React from 'react';
import { Column } from '@ant-design/plots';
import Loading from '../loading/Loading';

const DemoPie = (props) => {
  const { data, loading } = props;
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    maxColumnWidth: 100,
    minColumnWidth: 10,
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Tên sản phẩm',
      },
      sales: {
        alias: 'Số lượng',
      },
    },
  };
  return (
    <Loading spinning={loading}>
      <Column {...config} />
    </Loading>
  );
};

export default DemoPie;
