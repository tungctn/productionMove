import React from "react";
import { useParams } from "react-router-dom";
import ProductLineDetail from "../../components/ProductLineForm/DetailProductLine";
import Default from "../../layouts/Default";

const ImportDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <Default tagName="nh">
        <ProductLineDetail id={id} page="import" />
      </Default>
    </div>
  );
};

export default ImportDetail;
