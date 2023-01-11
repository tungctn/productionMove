import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ProductLineDetail from '../../components/ProductLineForm/DetailProductLine';
import Default from '../../Layouts/Default';
import { LeftOutlined } from '@ant-design/icons';
import { useAppContext } from '../../contexts/AppContext';

const ImportDetail = (props) => {
  const { role } = props;
  const { id } = useParams();

  const { checkMiddleware } = useAppContext();

  useEffect(() => {
    checkMiddleware(role, () => {});
  }, []);

  return (
    <div>
      <Default tagName="nh">
        <div className="w-1/12 mt-5">
          <Navigate to={-1}>
            <LeftOutlined />
          </Navigate>
        </div>
        <ProductLineDetail id={id} page="import" />
      </Default>
    </div>
  );
};

export default ImportDetail;
