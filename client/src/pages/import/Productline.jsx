import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchProductLine from '../../components/search-filter/SearchProductLine';
import TableInfo from '../../components/table/TableInfo';
import { useAppContext } from '../../contexts/AppContext';
import { useProductLineContext } from '../../contexts/ProductLineContext';
import Default from '../../layouts/Default';

const Import = (props) => {
  'use strict';
  const { role } = props;
  const dataColumn = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Tên dòng sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Mã dòng sản phẩm',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Ngày sản xuất',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];
  const navigate = useNavigate();
  const {
    productlineState: { listProductLine, isLoading },
    loadListProductLine,
  } = useProductLineContext();
  const { checkMiddleware } = useAppContext();

  useEffect(() => {
    checkMiddleware(role, () => {
      loadListProductLine();
    });
  }, []);

  const dataSource = listProductLine?.map((productline, index) => {
    return {
      ...productline,
      key: index + 1,
      createdAt: productline.createdAt.split('T')[0],
    };
  });
  return (
    <div className="w-full">
      <Default tagName="nh">
        <SearchProductLine page="import" />
        <div className="w-11/12 mt-5">
          <TableInfo
            dataColumn={dataColumn}
            dataSource={dataSource}
            onRow={(r) => ({
              onClick: () => {
                navigate(`/import/productline/${r._id}`);
              },
            })}
            setTitle={() => 'Chọn dòng sản phẩm cần nhập'}
            loading={isLoading}
          />
        </div>
      </Default>
    </div>
  );
};

export default Import;
