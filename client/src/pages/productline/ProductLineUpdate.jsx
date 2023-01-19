import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductLineEdit from '../../components/productLine/EditProductLine';
import { useAppContext } from '../../contexts/AppContext';
import Default from '../../Layouts/Default';

const ProductLineUpdate = (props) => {
  const { role } = props;
  const { id } = useParams();
  const { checkMiddleware } = useAppContext();

  useEffect(() => {
    checkMiddleware(role, () => {});
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
