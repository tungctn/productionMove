import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductLineEdit from '../../components/ProductLineForm/EditProductLine';
import { useAppContext } from '../../contexts/AppContext';
import Default from '../../Layouts/Default';

const ProductLineUpdate = () => {
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
        <ProductLineEdit id={id} />
      </Default>
    </div>
  );
};

export default ProductLineUpdate;
