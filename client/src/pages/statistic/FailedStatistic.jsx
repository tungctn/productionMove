import Default from "../../layouts/Default";
import DemoPie from "../../components/statistic/DemoPie";
import { useProductContext } from "../../contexts/ProductContext";
import { useAppContext } from "../../contexts/AppContext";
import { useEffect, useState } from "react";
import DemoLiquid from "../../components/statistic/DemoLiquid";

const FailedStatistic = (props) => {
  const { role } = props;
  const {
    productState: { listProduct, isLoading },
    loadAllProduct,
  } = useProductContext();
  const {
    authState: { user },
    checkMiddleware,
  } = useAppContext();

  var dataFiltered = listProduct?.filter((data) => data.factory === user._id);
  let failedProduct = 0;
  const failedStatus = [3, 4, 7, 8, 9];
  dataFiltered?.map((data) => {
    if (failedStatus.includes(data.status)) failedProduct++;
  });
  let sumProduct = dataFiltered.length ? dataFiltered.length : 0;

  useEffect(() => {
    checkMiddleware(role, () => {
      loadAllProduct();
    });
  }, []);

  return (
    <Default tagName="fs">
      <div className="w-11/12 mx-auto mt-5 text-left text-base sm:text-2xl md:text-3xl lg:text-4xl text-blue-600">
        Thống kê tỉ lệ sản phẩm lỗi của cơ sở sản xuất
      </div>
      {sumProduct > 0 && (
        <div className="w-5/6 mx-auto mt-20">
          <DemoLiquid percent={failedProduct / sumProduct}></DemoLiquid>
          <div className="mt-5 text-xl text-blue-900 font-bold">
            Số sản phẩm lỗi: {failedProduct} / Tổng số sản phẩm: {sumProduct}
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

export default FailedStatistic;
