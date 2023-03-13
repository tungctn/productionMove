import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ProductLineDetail from '../../components/productLine/DetailProductLine';
import Default from '../../layouts/Default';
import { useAppContext } from '../../contexts/AppContext';

const ImportDetail = (props) => {
  'use strict';
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
        </div>
        <ProductLineDetail id={id} page="import" />
      </Default>
    </div>
  );
};

export default ImportDetail;
