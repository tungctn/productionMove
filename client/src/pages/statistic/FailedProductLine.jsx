import Default from "../../layouts/Default";
import DemoPie from "../../components/statistic/DemoPie";
import { useProductContext } from "../../contexts/ProductContext";
import { useAppContext } from "../../contexts/AppContext";
import { useProductLineContext } from "../../contexts/ProductLineContext";
import { useEffect, useState } from "react";
import DemoLiquid from "../../components/statistic/DemoLiquid";

const FailedProductLine = (props) => {
  const [productline, setProductLine] = useState("0");
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
    productlineState: { listProductLine },
    loadListProductLine,
  } = useProductLineContext();

  const handleChange = (e) => {
    setProductLine(e.target.value);
  };

  var dataFiltered = listProduct?.filter((data) => data.factory === user._id);
  dataFiltered = dataFiltered?.filter(
    (data) => data.status >= 3 && data.status <= 9
  );
  let sumProduct = dataFiltered.length ? dataFiltered.length : 0;
  dataFiltered = dataFiltered?.filter(
    (data) => data.productLine._id === productline
  );
  let failedProduct = dataFiltered ? dataFiltered.length : 0;

  useEffect(() => {
    checkMiddleware(role, () => {
      loadAllProduct();
      loadListProductLine();
    });
  }, []);

  return (
    <Default tagName="fs" childrenName="fpl">
      <div className="w-1/4 mx-auto mt-10 items-start">
        <label
          htmlFor="countries"
          className="block mb-2 text-xl font-medium text-blue-600 dark:text-white">
          Chọn dòng sản phẩm
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-blue-800 font-medium text-sm rounded-lg ring-1 focus:ring-blue-500
                                            focus:border-blue-500 focus:outline-none block w-full py-3 px-1"
          onChange={handleChange}>
          <option>Dòng sản phẩm</option>
          {listProductLine?.map((productline) => {
            return (
              <option key={productline._id} value={productline._id}>
                {productline.name}
              </option>
            );
          })}
        </select>
      </div>
      {sumProduct > 0 && (
        <div className="w-5/6 mx-auto mt-20">
          <DemoLiquid percent={failedProduct / sumProduct}></DemoLiquid>
          <div className="mt-5 text-xl text-blue-900 font-bold">
            Số sản phẩm lỗi: {failedProduct} / Tổng số sản phẩm lỗi:{" "}
            {sumProduct}
          </div>
        </div>
      )}

      {sumProduct === 0 && (
        <div className="container justify-items-center">
          <div className="text-3xl text-blue-200 mt-32">
            Không có sản phẩm lỗi nào !
          </div>
        </div>
      )}
    </Default>
  );
}

export default FailedProductLine;
