import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Default from '../../Layouts/Default';
import ProductLineDetail from '../../components/ProductLineForm/DetailProductLine';
import { useAppContext } from '../../contexts/AppContext';

const ProductLineInfo = () => {
  const { id } = useParams();
  const {
    authState: { user },
    checkMiddleware,
  } = useAppContext();

  useEffect(() => {
    checkMiddleware(user, () => {});
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
