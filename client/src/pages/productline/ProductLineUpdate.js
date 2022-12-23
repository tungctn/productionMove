import React from "react";
import { useParams } from "react-router-dom";
import ProductLineEdit from "../../components/ProductLineForm/EditProductLine";
import Default from "../../Layouts/Default";

const ProductLineUpdate = () => {
  const { id } = useParams();

  return (
    <div>
      <Default tagName="dsp">
        <ProductLineEdit id={id} />
      </Default>
    </div>
  );
};

export default ProductLineUpdate;
