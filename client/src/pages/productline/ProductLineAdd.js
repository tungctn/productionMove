import React, { useEffect } from "react";
import AddProductLine from "../../components/ProductLineForm/AddProductLine";
import { useAppContext } from "../../contexts/AppContext";
import Default from "../../Layouts/Default";

const ProductLineAdd = () => {
  const {
    authState: { user },
    checkMiddleware,
  } = useAppContext();

  useEffect(() => {
    checkMiddleware(user, () => {});
  }, []);

  return (
    <div>
      <Default>
        <AddProductLine />
      </Default>
    </div>
  );
};

export default ProductLineAdd;
