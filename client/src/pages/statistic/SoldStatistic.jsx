import Default from '../../layouts/Default';
import DemoPie from '../../components/statistic/DemoPie';
import { useProductContext } from '../../contexts/ProductContext';
import { useAppContext } from '../../contexts/AppContext';
import { useEffect, useState } from 'react';

const SoldStatistic = (props) => {
  const { role } = props;
  const [year, setYear] = useState('0');
  const [quarter, setQuarter] = useState('-1');
  const [month, setMonth] = useState('0');

  const {
    productState: { listProduct, isLoading },
    loadAllProduct,
  } = useProductContext();
  const {
    authState: { user },
    checkMiddleware,
  } = useAppContext();
  const yearChange = (e) => {
    setYear(e.target.value);
    setQuarter('-1');
    setMonth('0');
  };
  const quarterChange = (e) => {
    setQuarter(e.target.value);
    setMonth('0');
  };
  const monthChange = (e) => {
    setMonth(e.target.value);
  };
  useEffect(() => {
    checkMiddleware(role, () => {
      loadAllProduct();
    });
  }, []);

  var dataFiltered = listProduct;
  if (dataFiltered) {
    dataFiltered = dataFiltered.filter((data) => data.isSold === true);
  }
  if (dataFiltered) {
    if (user.role === 2)
      dataFiltered = dataFiltered.filter((data) => data.factory == user._id);
    else if (user.role === 3)
      dataFiltered = dataFiltered.filter((data) => data.store == user._id);
  }
  if (year !== '0') {
    dataFiltered = dataFiltered.filter(
      (data) => data.customer.soldDate.slice(0, 4) == year,
    );
  }
  if (dataFiltered && quarter !== '-1') {
    dataFiltered = dataFiltered.filter(
      (data) =>
        Math.floor((data.customer.soldDate.slice(5, 7) - -3) / 4) ==
        Number(quarter),
    );
  }
  if (dataFiltered && month !== '0') {
    dataFiltered = dataFiltered.filter(
      (data) => Number(data.customer.soldDate.slice(5, 7)) === Number(month),
    );
  }
  var nho = [];
  var YearData;
  if (listProduct) {
    YearData = listProduct?.map((data) => {
      var string = data.createdAt.slice(0, 4);
      if (nho[string] !== '1') {
        nho[string] = '1';
        return string;
      }
    });
    YearData = listProduct?.filter((data) => data.isSold === true);
    if (YearData) {
      YearData = YearData.map((data) =>
        data.customer.soldDate.slice(0, 4),
      ).filter((data, index, self) => {
        return self.indexOf(data) === index;
      });
    }
  }
  var c, sumProduct, dataSource;
  if (dataFiltered) {
    dataFiltered = dataFiltered.map((data) => {
      return data.productLine.name;
    });
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
  if (quarter !== '-1') {
    number = [1, 2, 3];
    months = number.map((i) => {
      return quarter * 3 + i;
    });
  }
  if (year !== '0') quarters = [1, 2, 3, 4];

  return (
    <Default tagName="ss">
      <div className="flex mt-5">
        <div className="basis-1/3">
          <div className="w-1/2 mx-auto">
            <label
              htmlFor="countries"
              className="block mb-2 text-base font-medium text-blue-600 dark:text-white"
            >
              Năm
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-blue-800 font-medium text-sm rounded-lg ring-1 focus:ring-blue-500
                                                    focus:border-blue-500 focus:outline-none block w-full py-3 px-1"
              onChange={yearChange}
            >
              <option value="0"></option>
              {YearData?.map((year) => {
                return (
                  <option key={year} value={year}>
                    {' '}
                    {year}{' '}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="basis-1/3">
          <div className="w-1/2 mx-auto">
            <label
              htmlFor="countries"
              className="block mb-2 text-base font-medium text-blue-600 dark:text-white"
            >
              Quý
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-blue-800 font-medium text-sm rounded-lg ring-1 focus:ring-blue-500
                                    focus:border-blue-500 focus:outline-none block w-full py-3 px-1"
              onChange={quarterChange}
              disabled={year == '0' ? true : false}
            >
              <option value="-1"></option>
              {quarters &&
                quarters.map((quart) => {
                  return (
                    <option value={quart - 1} key={quart}>
                      {' '}
                      Quý {quart}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="basis-1/3">
          <div className="w-1/2 mx-auto">
            <label
              htmlFor="countries"
              className="block mb-2 text-base font-medium text-blue-600 dark:text-white"
            >
              Tháng
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-blue-800 font-medium text-sm rounded-lg ring-1 focus:ring-blue-500
                                                focus:border-blue-500 focus:outline-none block w-full py-3 px-1"
              onChange={monthChange}
              disabled={quarter == '-1' ? true : false}
            >
              <option value="0"></option>
              {months &&
                months.map((mon) => {
                  return (
                    <option value={mon} key={mon}>
                      {' '}
                      Tháng {mon}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>
      <div className="w-5/6 mx-auto mt-10">
        {dataSource.length !== 0 && year !== '0' && (
          <div>
            <DemoPie data={dataSource} loading={isLoading} />
            <div className="mt-5 text-xl text-blue-900 font-bold">
              Tổng số sản phẩm: {sumProduct}
            </div>
          </div>
        )}
        {dataSource.length == 0 && year !== '0' && (
          <div className="container justify-items-center">
            <div className="text-3xl text-blue-200 mt-20">
              Không có sản phẩm nào !
            </div>
          </div>
        )}
        {year === '0' && (
          <div className="container justify-items-center">
            <div className="text-3xl text-blue-200 mt-20">
              Mời chọn năm thống kê !
            </div>
          </div>
        )}
      </div>
    </Default>
  );
};

export default SoldStatistic;
