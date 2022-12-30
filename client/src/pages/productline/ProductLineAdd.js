import React, { useEffect } from "react";
import AddProductLine from "../../components/ProductLineForm/AddProductLine";
import { useAppContext } from "../../contexts/AppContext";
import Default from "../../Layouts/Default";

const ProductLineAdd = () => {
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
      <Default>
        <AddProductLine />
      </Default>
    </div>
  );
};

export default ProductLineAdd;
