import React from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../../components/Product/ProductDetail";
import ProductLineDetail from "../../components/ProductLineForm/DetailProductLine";
import Default from "../../Layouts/Default";

const ProductType = () => {
  const { id } = useParams();
  return (
    <div>
      <Default tagName="kho">
        <ProductDetail id={id} />
      </Default>
    </div>
  );
};

export default ProductType;
