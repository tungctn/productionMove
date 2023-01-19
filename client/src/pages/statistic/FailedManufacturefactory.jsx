import Default from '../../layouts/Default';
import DemoPie from '../../components/statistic/DemoPie';
import { useProductContext } from '../../contexts/ProductContext';
import { useAppContext } from '../../contexts/AppContext';
import { useUserContext } from '../../contexts/UserContext';
import { useEffect, useState } from 'react';
import DemoLiquid from '../../components/statistic/DemoLiquid';

const FailedManufacturefactory = (props) => {
  const [sale, setSale] = useState('0');
  const { role } = props;
  const {
    productState: { listProduct },
    loadAllProduct,
  } = useProductContext();
  const {
    authState: { user },
    checkMiddleware,
  } = useAppContext();
  const {
    userState: { listUser },
    loadListUser,
  } = useUserContext();
  const { convertRoleToName } = useAppContext();
  let userData = listUser
    .filter((user) => user.role === 3)
    .map((user, index) => {
      return {
        ...user,
        key: index + 1,
        role: convertRoleToName(user.role),
      };
    });
  const handleChange = (e) => {
    setSale(e.target.value);
  };

  var dataFiltered = listProduct.filter((data) => data.factory === user._id);
  dataFiltered = dataFiltered?.filter((data) => data.status >= 3 && data.status <= 9);
  let sumProduct = dataFiltered.length ? dataFiltered.length : 0;
  dataFiltered = dataFiltered?.filter((data) => data.store === sale);
  let failedProduct = dataFiltered ? dataFiltered.length : 0;

  useEffect(() => {
    checkMiddleware(role, () => {
      loadAllProduct();
      loadListUser();
    });
  }, []);

  return (
    <Default tagName="fs" childrenName="fmf">
      <div className="w-1/4 mx-auto mt-10 items-start">
        <label htmlFor="countries" className="block mb-2 text-xl font-medium text-blue-600 dark:text-white">
          Chọn dòng sản phẩm
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-blue-800 font-medium text-sm rounded-lg ring-1 focus:ring-blue-500
                                            focus:border-blue-500 focus:outline-none block w-full py-3 px-1"
          onChange={handleChange}
        >
          <option>Dòng sản phẩm</option>
          {userData?.map((user, index) => {
            return (
              <option key={index} value={user._id}>
                {user.name}
              </option>
            );
          })}
        </select>
      </div>
      {sumProduct > 0 && (
        <div className="w-5/6 mx-auto mt-20">
          <DemoLiquid percent={failedProduct / sumProduct}></DemoLiquid>
          <div className="mt-5 text-xl text-blue-900 font-bold">
            Số sản phẩm lỗi: {failedProduct} / Tổng số sản phẩm lỗi: {sumProduct}
          </div>
        </div>
      )}

      {sumProduct === 0 && (
        <div className="container justify-items-center">
          <div className="text-3xl text-blue-200 mt-32">Không có sản phẩm lỗi nào !</div>
        </div>
      )}
    </Default>
  );
}

export default FailedManufacturefactory;
