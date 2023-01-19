import Default from '../../layouts/Default';
import DemoPie from '../../components/statistic/DemoPie';
import { useProductContext } from '../../contexts/ProductContext';
import { useUserContext } from '../../contexts/UserContext';
import { useAppContext } from '../../contexts/AppContext';
import { useEffect, useState } from 'react';

const Center = (props) => {
  const { role } = props;
  const [center, setCenter] = useState('0');
  const {
    productState: { listProduct, isLoading },
    loadAllProduct,
  } = useProductContext();

  const handleChange = (event) => {
    setCenter(event.target.value);
  };

  const dataFiltered = listProduct
    .filter((product) => product.location == center)
    .map((filteredProduct) => {
      return filteredProduct.productLine.name;
    });

  var c = dataFiltered.reduce((count, value) => {
    return count[value] ? count[value]++ : (count[value] = 1), count;
  }, {});
  var sumProduct = 0;
  var dataSource = Object.keys(c).map((key) => {
    sumProduct += c[key];
    return { type: key, sales: c[key] };
  });

  const {
    userState: { listUser },
    loadListUser,
  } = useUserContext();

  const {
    convertRoleToName,
    authState: { user },
    checkMiddleware,
  } = useAppContext();

  const dataSource1 = listUser?.map((user, index) => {
    return {
      ...user,
      key: index + 1,
      role: convertRoleToName(user.role),
    };
  });

  const dataFactory = dataSource1.filter((user) => user.role == 'Trung tâm bảo hành');
  useEffect(() => {
    checkMiddleware(role, () => {
      loadListUser();
      loadAllProduct();
    });
  }, []);
  return (
    <Default tagName="stt" childrenName="center">
      <div className="w-1/4 mx-auto mt-10 items-start">
        <label htmlFor="countries" className="block mb-2 text-xl font-medium text-blue-600 dark:text-white">
          Chọn trung tâm bảo hành
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-blue-800 font-medium text-sm rounded-lg ring-1 focus:ring-blue-500
                                            focus:border-blue-500 focus:outline-none block w-full py-3 px-1"
          onChange={handleChange}
        >
          <option>Trung tâm bảo hành</option>
          {dataFactory.map((factory) => {
            return (
              <option key={factory.key} value={factory._id}>
                {factory.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="w-5/6 mx-auto mt-10">
        {center === '0' && (
          <div className="container justify-items-center">
            <div className="text-3xl text-blue-200 mt-32">Mời chọn trung tâm bảo hành !</div>
          </div>
        )}
        {dataSource.length !== 0 && (
          <div>
            <DemoPie data={dataSource} loading={isLoading} />
            <div className="mt-5 text-xl text-blue-900 font-bold">Tổng số sản phẩm: {sumProduct}</div>
          </div>
        )}
        {center !== '0' && dataSource.length == 0 && (
          <div className="container justify-items-center">
            <div className="text-3xl text-blue-200 mt-32">Không có sản phẩm nào !</div>
          </div>
        )}
      </div>
    </Default>
  );
}

export default Center;
