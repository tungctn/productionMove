import Default from "../../Layouts/Default";
import DemoPie from "../../components/Statistic/DemoPie";
import { useProductContext } from "../../contexts/ProductContext";
import { useAppContext } from "../../contexts/AppContext";
import { useEffect, useState } from "react";
import DemoLiquid from "../../components/Statistic/DemoLiquid";

function FailedStatistic() {
  const {
    productState: { listProduct },
    loadAllProduct,
  } = useProductContext();
  const {
    openNotification,
    authState: { user },
    gotoMainPage,
  } = useAppContext();

  var dataFiltered = listProduct?.filter((data) => data.factory === user._id);
  let failedProduct = 0;
  const failedStatus = [3, 4, 7, 8, 9];
  dataFiltered?.map((data) => {
    if (failedStatus.includes(data.status)) failedProduct++;
  });
  let sumProduct = dataFiltered.length ? dataFiltered.length : 0;

  useEffect(() => {
    if (user?.role === 2) {
      loadAllProduct();
    } else {
      openNotification("error", "Bạn không có quyền truy cập");
      gotoMainPage(user);
    }
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
