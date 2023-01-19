import React, { useEffect } from 'react';
import AddProductLine from '../../components/productLine/AddProductLine';
import { useAppContext } from '../../contexts/AppContext';
import Default from '../../Layouts/Default';

const ProductLineAdd = (props) => {
  const { role } = props;
  const { checkMiddleware } = useAppContext();

  useEffect(() => {
    checkMiddleware(role, () => {});
  }, []);

  return (
    <div>
      <Default>
        <AddProductLine />
      </Default>
    </div>
  );
};

export default ProductLineAdd;
