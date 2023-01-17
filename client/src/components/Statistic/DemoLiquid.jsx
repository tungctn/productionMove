import React from 'react';
import { Liquid } from '@ant-design/plots';

const DemoLiquid = (props) => {
  const config = {
    percent: props.percent,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
  };
  return <Liquid {...config} />;
};

export default DemoLiquid;
