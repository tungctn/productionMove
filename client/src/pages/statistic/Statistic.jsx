import Default from '../../layouts/Default';
import DemoPie from '../../components/statistic/DemoPie';
import { useProductContext } from '../../contexts/ProductContext';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const Statistic = (props) => {
  const { role } = props;
  const {
    productState: { listProduct, isLoading },
    loadAllProduct,
  } = useProductContext();
  const {
    authState: { user },
    checkMiddleware,
  } = useAppContext();
  var sumProduct = 0;
  const data = listProduct?.map((product) => {
    return product?.productLine?.name;
  });
  var c = data.reduce((count, value) => {
    return count[value] ? count[value]++ : (count[value] = 1), count;
  }, {});
  var dataSource = Object.keys(c).map((key) => {
    sumProduct += c[key];
    return { type: key, sales: c[key] };
  });
  useEffect(() => {
    checkMiddleware(role, () => {
      loadAllProduct();
    });
  }, []);

  return (
    <Default tagName="stt">
      <div className="w-11/12 mx-auto mt-5 text-left text-5xl text-blue-600">
        Thống kê toàn quốc
      </div>
      <div className="w-5/6 mx-auto mt-20">
        <DemoPie data={dataSource} loading={isLoading} />
        <div className="mt-5 text-xl text-blue-900 font-bold">
          Tổng số sản phẩm: {sumProduct}
        </div>
      </div>
    </Default>
  );
};

export default Statistic;
