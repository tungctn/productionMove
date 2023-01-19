import Default from '../../layouts/Default';
import DemoPie from '../../components/statistic/DemoPie';
import { useProductContext } from '../../contexts/ProductContext';
import { useAppContext } from '../../contexts/AppContext';
import { useEffect, useState } from 'react';

const ProductStatistic = (props) => {
  const { role } = props;
  const [productState, setProductState] = useState('-1');
  const [year, setYear] = useState('0');
  const [quarter, setQuarter] = useState('-1');
  const [month, setMonth] = useState('0');
  const stateList = [
    {
      id: 0,
      type: 'Mới sản xuất',
    },
    {
      id: 1,
      type: 'Được đưa về đại lý',
    },
    {
      id: 2,
      type: 'Đã bán',
    },
    {
      id: 3,
      type: 'Lỗi cần bảo hành',
    },
    {
      id: 4,
      type: 'Đang bảo hành',
    },
    {
      id: 5,
      type: 'Đã bảo hành xong',
    },
    {
      id: 6,
      type: 'Đã trả lại cho khách hàng',
    },
    {
      id: 7,
      type: 'Lỗi, cần đưa về cơ sở sản xuất',
    },
    {
      id: 8,
      type: 'Lỗi, đã đưa về cơ sở sản xuất',
    },
    {
      id: 9,
      type: 'Lỗi cần thu hồi',
    },
    {
      id: 10,
      type: 'Đã hết thời gian bảo hành',
    },
    {
      id: 11,
      type: 'Trả lại cơ sở sản xuất do lâu không được bán',
    },
  ];

  const {
    productState: { listProduct, isLoading },
    loadAllProduct,
  } = useProductContext();
  const {
    authState: { user },
    checkMiddleware,
  } = useAppContext();

  const handleChange = (e) => {
    setProductState(e.target.value);
  };
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

  var dataFiltered = listProduct;
  let stateData;
  if (user.role === 2) {
    stateData = stateList.filter((state) => state.id === 0 || state.id === 1 || (state.id >= 8 && state.id <= 11));
    dataFiltered = dataFiltered.filter((data) => data.factory === user._id);
  } else if (user.role === 3) {
    stateData = stateList
      .filter(
        (state) =>
          state.id === 1 || state.id === 3 || state.id === 5 || state.id === 6 || (state.id >= 9 && state.id <= 11),
      )
      .map((state) => {
        if (state.id === 1) state.type = 'Chưa bán';
        return state;
      });
    dataFiltered = dataFiltered.filter((data) => data.store === user._id);
  } else {
    stateData = stateList.filter((state) => state.id === 4 || state.id === 5 || state.id === 7 || state.id === 8);
    dataFiltered = dataFiltered.filter((data) => data.location === user._id);
  }

  if (year !== '0') {
    dataFiltered = dataFiltered.filter((data) => data.createdAt.slice(0, 4) == year);
  }
  if (dataFiltered && quarter !== '-1') {
    dataFiltered = dataFiltered.filter((data) => Math.floor((data.createdAt.slice(5, 7) - -3) / 4) == Number(quarter));
  }
  if (dataFiltered && month !== '0') {
    dataFiltered = dataFiltered.filter((data) => Number(data.createdAt.slice(5, 7)) === Number(month));
  }
  if (dataFiltered) {
    if (productState !== '-1') {
      if (productState === '3') {
        dataFiltered = dataFiltered
          .filter((product) => product.status == 3 || product.status == 4 || product.status == 7 || product.status == 8)
          .map((product) => {
            return product.productLine.name;
          });
      } else {
        dataFiltered = dataFiltered
          .filter((product) => product.status == productState)
          .map((data) => {
            return data.productLine.name;
          });
      }
    } else {
      dataFiltered = dataFiltered.map((data) => {
        return data.productLine.name;
      });
    }
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

  var nho = [];
  var YearData;
  if (listProduct) {
    YearData = listProduct
      .filter((data) => {
        var string = data.createdAt.slice(0, 4) * 1;
        let valid = false;
        if (nho[string] !== '1') {
          nho[string] = '1';
          valid = true;
        }
        return valid === true;
      })
      .map((data) => data.createdAt.slice(0, 4));
  }
  var months, number, quarters;
  if (year !== '0') quarters = [1, 2, 3, 4];
  if (quarter !== '-1') {
    number = [1, 2, 3];
    months = number.map((i) => {
      return quarter * 3 + i;
    });
  }

  useEffect(() => {
    checkMiddleware(role, () => {
      loadAllProduct();
    });
  }, []);

  return (
    <Default tagName="ps">
      <div className="flex mt-5">
        <div className="basis-1/4">
          <div className="w-2/3 mx-auto">
            <label htmlFor="countries" className="block mb-2 text-base font-medium text-blue-600 dark:text-white">
              Trạng thái
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-blue-800 font-medium text-sm rounded-lg ring-1 focus:ring-blue-500
                                                    focus:border-blue-500 focus:outline-none block w-full py-3 px-1"
              onChange={handleChange}
            >
              <option value="-1"></option>
              {stateData.map((state) => {
                return (
                  <option value={state.id} key={state.id}>
                    {state.type}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="basis-1/4">
          <div className="w-2/3 mx-auto">
            <label htmlFor="countries" className="block mb-2 text-base font-medium text-blue-600 dark:text-white">
              Năm
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-blue-800 font-medium text-sm rounded-lg ring-1 focus:ring-blue-500
                                                    focus:border-blue-500 focus:outline-none block w-full py-3 px-1"
              onChange={yearChange}
            >
              <option value="0"></option>
              {YearData &&
                YearData.map((year) => {
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
        <div className="basis-1/4">
          <div className="w-2/3 mx-auto">
            <label htmlFor="countries" className="block mb-2 text-base font-medium text-blue-600 dark:text-white">
              Quý
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-blue-800 font-medium text-sm rounded-lg ring-1 focus:ring-blue-500
                                    focus:border-blue-500 focus:outline-none block w-full py-3 px-1"
              onChange={quarterChange}
              disabled={year == '0' ? true : false}
            >
              <option value="-1"></option>
              {quarters?.map((quart) => {
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
        <div className="basis-1/4">
          <div className="w-2/3 mx-auto">
            <label htmlFor="countries" className="block mb-2 text-base font-medium text-blue-600 dark:text-white">
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
        {dataSource.length > 0 && productState !== '-1' && (
          <div>
            <DemoPie data={dataSource} loading={isLoading} />
            <div className="mt-5 text-xl text-blue-900 font-bold">Tổng số sản phẩm: {sumProduct}</div>
          </div>
        )}
        {dataSource.length === 0 && productState !== '-1' && (
          <div className="container justify-items-center">
            <div className="text-3xl text-blue-200 mt-20">Không có sản phẩm nào !</div>
          </div>
        )}
        {productState === '-1' && (
          <div className="container justify-items-center">
            <div className="text-3xl text-blue-200 mt-20">Mời chọn loại thống kê !</div>
          </div>
        )}
      </div>
    </Default>
  );
}

export default ProductStatistic;
