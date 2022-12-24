import Default from "../../Layouts/Default";
import DemoPie from "../../components/Statistic/DemoPie";
import { useProductContext } from "../../contexts/ProductContext";
import { useEffect, useState } from "react";

function FactoryStatistic() {
  const [productState, setProductState] = useState("-1");
  const [year, setYear] = useState("0");
  const [quarter, setQuarter] = useState("-1");
  const [month, setMonth] = useState("0");

  const {
    productState: { listProduct },
    loadAllProduct,
    loadUserProduct,
  } = useProductContext();

  const handleChange = (e) => {
    setProductState(e.target.value);
  };
  const yearChange = (e) => {
    setYear(e.target.value);
    setQuarter("-1");
    setMonth("0");
  };
  const quarterChange = (e) => {
    setQuarter(e.target.value);
    setMonth("0");
  };
  const monthChange = (e) => {
    setMonth(e.target.value);
  };

  var dataFiltered = listProduct;
  if (year !== "0") {
    dataFiltered = dataFiltered.filter(
      (data) => data.createdAt.slice(0, 4) == year
    );
  }
  if (dataFiltered && quarter !== "-1") {
    dataFiltered = dataFiltered.filter(
      (data) =>
        Math.floor((data.createdAt.slice(5, 7) - -3) / 4) == Number(quarter)
    );
  }
  if (dataFiltered && month !== "0") {
    dataFiltered = dataFiltered.filter(
      (data) => Number(data.createdAt.slice(5, 7)) === Number(month)
    );
  }
  console.log(year);
  if (dataFiltered) {
    if (productState !== "-1") {
      dataFiltered = dataFiltered.filter(
        (product) => product.status == productState
      );
      if (dataFiltered) {
        dataFiltered = dataFiltered.map((filteredProduct) => {
          return filteredProduct.productLine.code;
        });
      }
    } else {
      dataFiltered = dataFiltered.map((data) => {
        return data.productLine.code;
      });
    }
  }
  var nho = [];
  var YearData;
  if (listProduct) {
    YearData = listProduct.map((data) => {
      var string = data.createdAt.slice(0, 4);
      if (nho[string] !== "1") {
        nho[string] = "1";
        return string;
      }
    });
  }
  var c, sumProduct, dataSource;
  if (dataFiltered) {
    c = dataFiltered.reduce((count, value) => {
      return count[value] ? count[value]++ : (count[value] = 1), count;
    }, {});
    sumProduct = 0;
    dataSource = Object.keys(c).map((key) => {
      sumProduct += c[key];
      return { type: key, sales: c[key] };
    });
  }
  var months, number, quarters;
  if (quarter !== "-1") {
    number = [1, 2, 3];
    months = number.map((i) => {
      return quarter * 3 + i;
    });
  }
  if (year !== "0") quarters = [1, 2, 3, 4];

  useEffect(() => {
    // loadAllProduct();
    loadUserProduct();
  }, []);

  return (
    <Default tagName="fs">
      <div className="flex mt-5">
        <div className="basis-1/4">
          <div className="w-2/3 mx-auto">
            <label
              for="countries"
              className="block mb-2 text-base font-medium text-blue-600 dark:text-white">
              Trạng thái
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-blue-800 font-medium text-sm rounded-lg ring-1 focus:ring-blue-500
                                                    focus:border-blue-500 focus:outline-none block w-full py-3 px-1"
              onChange={handleChange}>
              <option value="-1">Tất cả</option>
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
        </div>
        <div className="basis-1/4">
          <div className="w-2/3 mx-auto">
            <label
              for="countries"
              className="block mb-2 text-base font-medium text-blue-600 dark:text-white">
              Năm
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-blue-800 font-medium text-sm rounded-lg ring-1 focus:ring-blue-500
                                                    focus:border-blue-500 focus:outline-none block w-full py-3 px-1"
              onChange={yearChange}>
              <option value="0"></option>
              {YearData.map((year) => {
                return (
                  <option key={year} value={year}>
                    {" "}
                    {year}{" "}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="basis-1/4">
          <div className="w-2/3 mx-auto">
            <label
              for="countries"
              className="block mb-2 text-base font-medium text-blue-600 dark:text-white">
              Quý
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-blue-800 font-medium text-sm rounded-lg ring-1 focus:ring-blue-500
                                    focus:border-blue-500 focus:outline-none block w-full py-3 px-1"
              onChange={quarterChange}
              disabled={year == "0" ? true : false}>
              <option value="-1"></option>
              {quarters &&
                quarters.map((quart) => {
                  return (
                    <option value={quart - 1} key={quart}>
                      {" "}
                      Quý {quart}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="basis-1/4">
          <div className="w-2/3 mx-auto">
            <label
              for="countries"
              className="block mb-2 text-base font-medium text-blue-600 dark:text-white">
              Tháng
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-blue-800 font-medium text-sm rounded-lg ring-1 focus:ring-blue-500
                                                focus:border-blue-500 focus:outline-none block w-full py-3 px-1"
              onChange={monthChange}
              disabled={quarter == "-1" ? true : false}>
              <option value="0"></option>
              {months &&
                months.map((mon) => {
                  return (
                    <option value={mon} key={mon}>
                      {" "}
                      Tháng {mon}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>
      <div className="w-5/6 mx-auto mt-10">
        {dataSource.length !== 0 && (
          <div>
            <DemoPie data={dataSource}></DemoPie>
            <div className="mt-5 text-xl text-blue-900 font-bold">
              Tổng số: {sumProduct}
            </div>
          </div>
        )}
        {dataSource.length == 0 && (
          <div className="container justify-items-center">
            <div className="text-3xl text-blue-200 mt-20">
              Không có sản phẩm nào !
            </div>
          </div>
        )}
      </div>
    </Default>
  );
}

export default FactoryStatistic;
