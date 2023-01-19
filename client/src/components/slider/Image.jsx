import React from 'react';
import { LeftCircleTwoTone, RightCircleTwoTone } from '@ant-design/icons';
import { Image } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Slider = (props) => {
  const { data } = props;
  const [index, setIndex] = useState(0);
  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(data?.length - 1);
    }
  };

  const handleNext = () => {
    if (index < data?.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };
  return (
    <div>
      <LeftCircleTwoTone
        className="text-6xl cursor-pointer mx-3"
        onClick={handlePrev}
      />
      {data?.length > 0 && data[index]}

      <RightCircleTwoTone
        className="text-6xl cursor-pointer mx-3"
        onClick={handleNext}
      />
    </div>
  );
};

Slider.propTypes = {};

export default Slider;
