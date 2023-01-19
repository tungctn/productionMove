import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const Loading = (props) => {
  const { spinning, children } = props;
  const antIcon = <LoadingOutlined />;
  return (
    <Spin spinning={spinning} indicator={antIcon}>
      {children}
    </Spin>
  );
};

export default Loading;
