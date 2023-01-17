import React, { useEffect } from "react";
import ProductDetail from "../../components/Product/ProductDetail";
import { useParams } from "react-router-dom";
import Default from "../../Layouts/Default";
import { useAppContext } from "../../contexts/AppContext";

const Product = (props) => {
  const { id } = useParams();
  const { role } = props;
  const {
    checkMiddleware,
  } = useAppContext();

  useEffect(() => {
    checkMiddleware(role, () => {});
  }, []);

  return (
    <div>
      <Default tagName="kho">
        <ProductDetail id={id} />
      </Default>
    </div>
  );
};

export default Product;
