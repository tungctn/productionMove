import { LeftOutlined } from '@ant-design/icons';
import { Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { quantityInStock } from '../../api/factory';
import TableInfo from '../../components/table/TableInfo';
import Default from '../../layouts/Default';
import Order from './Order';
import { useAppContext } from '../../contexts/AppContext';

const Factory = (props) => {
  'use strict';
  const { role } = props;
  const [listQuantity, setListQuantity] = useState([]);
  const [loading, setLoading] = useState(false);
  const { checkMiddleware } = useAppContext();
  const { id } = useParams();
  const dataColumn = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Tên nhà máy',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Số hàng tồn kho',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return <Order record={record} />;
      },
    },
  ];

  const loadListQuantity = async () => {
    setLoading(true);
    const response = await quantityInStock(id);
    if (response.success) {
      setListQuantity(response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkMiddleware(role, () => {
      loadListQuantity();
    });
  }, [id]);

  const dataSource = listQuantity?.map((quantity, index) => {
    return {
      ...quantity,
      name: quantity.factory.name,
      key: index + 1,
      amount: quantity.listProduct.length,
    };
  });

  return (
    <div>
      <Default tagName="nh">
        <div className="w-1/12 mt-5">
        </div>
        <div className="w-11/12 mt-5 mx-auto">
          <TableInfo
            dataColumn={dataColumn}
            dataSource={dataSource}
            loading={loading}
          />
        </div>
      </Default>
    </div>
  );
};

export default Factory;
