import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductLineEdit from "../../components/ProductLineForm/EditProductLine";
import { useAppContext } from "../../contexts/AppContext";
import Default from "../../Layouts/Default";

const ProductLineUpdate = () => {
  const { id } = useParams();
  const {
    openNotification,
    authState: { user },
    gotoMainPage,
  } = useAppContext();
  useEffect(() => {
    if (user?.role !== 1) {
      gotoMainPage(user);
      openNotification("error", "Bạn không có quyền truy cập");
    }
  }, []);
  return (
    <div>
      <Default tagName="dsp">
        <ProductLineEdit id={id} />
      </Default>
    </div>
  );
};

export default ProductLineUpdate;
