import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductLineDetail from "../../components/ProductLineForm/DetailProductLine";
import Default from "../../Layouts/Default";
import { LeftOutlined } from "@ant-design/icons";
import { useAppContext } from "../../contexts/AppContext";

const ImportDetail = () => {
  const { id } = useParams();

  const {
    openNotification,
    authState: { user },
    gotoMainPage,
  } = useAppContext();

  useEffect(() => {
    if (user?.role !== 3) {
      gotoMainPage(user);
      openNotification("error", "Bạn không có quyền truy cập");
    }
  }, []);

  return (
    <div>
      <Default tagName="nh">
        <div className="w-1/12 mt-5">
          <Link to={`/import/productline`}>
            <LeftOutlined></LeftOutlined>
          </Link>
        </div>
        <ProductLineDetail id={id} page="import" />
      </Default>
    </div>
  );
};

export default ImportDetail;
