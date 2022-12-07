import React from "react";
import { useParams } from "react-router-dom";
import ProductLineDetail from "../../components/ProductLineForm/DetailProductLine";
import Default from "../../Layouts/Default";

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
