import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from '../../components/request/Notification';
import SearchProduct from '../../components/search-filter/SearchProduct';
import TableInfo from '../../components/table/TableInfo';
import { useAppContext } from '../../contexts/AppContext';
import { useProductContext } from '../../contexts/ProductContext';
import Default from '../../layouts/Default';
const Home = (props) => {
  ('use strict');
  const { role } = props;
  const navigate = useNavigate();
  const { convertStatusToNameProduct, checkMiddleware } = useAppContext();
  const {
    productState: { listProduct, isLoading },
    loadUserProduct,
  } = useProductContext();
  const dataColumn = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Mã định danh',
      dataIndex: 'identifier',
      key: 'identifier',
    },
    {
      title: 'Dòng sản phẩm',
      dataIndex: 'productline',
      key: 'productline',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
  ];
  useEffect(() => {
    checkMiddleware(role, () => {
      loadUserProduct();
    });
  }, []);

  const dataSource = listProduct?.map((product, index) => {
    return {
      ...product,
      key: index + 1,
      productline: product.productLine.name,
      status: convertStatusToNameProduct(product.status),
    };
  });

  return (
    <div className="w-full">
      <Default tagName="kho">
        <SearchProduct />
        <div className="w-11/12 mt-5 mx-auto">
          <TableInfo
            onRow={(r) => ({
              onClick: () => {
                navigate(`/product/${r._id}`);
              },
            })}
            dataColumn={dataColumn}
            dataSource={dataSource}
            loading={isLoading}
            locale={{
              emptyText: (
                <span>
                  <img
                    src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    className="w-[200px] h-[200px] mx-auto"
                    alt=""
                  />
                  Không có sản phẩm nào
                </span>
              ),
            }}
          />
        </div>
      </Default>
    </div>
  );
};
export default Home;
