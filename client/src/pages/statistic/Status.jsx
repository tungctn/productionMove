import Default from '../../layouts/Default';
import DemoPie from '../../components/statistic/DemoPie';
import { useProductContext } from '../../contexts/ProductContext';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const Status = (props) => {
  const { role } = props;
  const [productState, setProductState] = useState('0');
  const {
    productState: { listProduct, isLoading },
    loadAllProduct,
  } = useProductContext();

  const handleChange = (e) => {
    setProductState(e.target.value);
  };

  const dataFiltered = listProduct
    ?.filter((product) => product.status === Number(productState))
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
    authState: { user },
    checkMiddleware,
  } = useAppContext();

  useEffect(() => {
    checkMiddleware(role, () => {
      loadAllProduct();
    });
  }, []);

  return (
    <Default tagName="stt" childrenName="stt">
      <div className="w-1/4 mx-auto mt-10 items-start">
        <label
          htmlFor="countries"
          className="block mb-2 text-xl font-medium text-blue-600 dark:text-white"
        >
          Chọn trạng thái
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-blue-800 font-medium text-sm rounded-lg ring-1 focus:ring-blue-500
                                            focus:border-blue-500 focus:outline-none block w-full py-3 px-1"
          onChange={handleChange}
        >
          <option value="0">Mới sản xuất</option>
          <option value="1">Được đưa về đại lý</option>
          <option value="2">Đã bán</option>
          <option value="3">Lỗi cần bảo hành</option>
          <option value="4">Đang bảo hành</option>
          <option value="5">Đã bảo hành xong</option>
          <option value="6">Đã trả lại cho khách hàng</option>
          <option value="7">Lỗi cần đưa về nhà máy</option>
          <option value="8">Lỗi cần đưa về cơ sở sản xuất</option>
          <option value="9">Lỗi cần thu hồi</option>
          <option value="10">Đã hết thời gian bảo hành</option>
          <option value="11">
            Trả lại cơ sở sản xuất do lâu không được bán
          </option>
        </select>
      </div>
      <div className="w-5/6 mx-auto mt-10">
        {dataSource.length !== 0 && (
          <div>
            <DemoPie data={dataSource} loading={isLoading} />
            <div className="mt-5 text-xl text-blue-900 font-bold">
              Tổng số sản phẩm: {sumProduct}
            </div>
          </div>
        )}
        {dataSource.length === 0 && (
          <div className="container justify-items-center">
            <div className="text-3xl text-blue-200 mt-32">
              Không có sản phẩm nào !
            </div>
          </div>
        )}
      </div>
    </Default>
  );
};

export default Status;
