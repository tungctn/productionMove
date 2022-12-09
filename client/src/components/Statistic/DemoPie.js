import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';

const DemoPie = (props) => {
  const data = props.data;
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
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
        alias: 'Dòng sản phẩm',
      },
      sales: {
        alias: 'Số lượng',
      },
    },
  };
  return <Column {...config} />;
};

export default DemoPie;