import React from "react";
import { useParams, Link } from "react-router-dom";
import ProductLineDetail from "../../components/ProductLineForm/DetailProductLine";
import Default from "../../Layouts/Default";
import { LeftOutlined } from "@ant-design/icons";

const ImportDetail = () => {
  const { id } = useParams();
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
