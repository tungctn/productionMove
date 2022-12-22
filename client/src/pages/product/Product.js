import React from "react";
import ProductDetail from "../../components/Product/ProductDetail";
import { useParams } from "react-router-dom";
import Default from "../../layouts/Default";

const Product = () => {
  const { id } = useParams();
  return (
    <div>
      <Default tagName="kho">
        <ProductDetail id={id} />
      </Default>
    </div>
  );
};

export default Product;
