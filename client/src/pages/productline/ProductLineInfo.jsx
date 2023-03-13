import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Default from '../../layouts/Default';
import ProductLineDetail from '../../components/productLine/DetailProductLine';
import { useAppContext } from '../../contexts/AppContext';

const ProductLineInfo = (props) => {
  'use strict';
  const { role } = props;
  const { id } = useParams();
  const { checkMiddleware } = useAppContext();

  useEffect(() => {
    checkMiddleware(role, () => {});
  }, []);

  return (
    <div>
      <Default tagName="dsp">
        <ProductLineDetail page="productline" id={id} />
      </Default>
    </div>
  );
};

export default ProductLineInfo;
