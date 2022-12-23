import { Badge, Descriptions, Image } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductLine } from "../../api/productline";
import Default from "../../Layouts/Default";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ProductLineDetail from "../../components/ProductLineForm/DetailProductLine";

const ProductLineInfo = (props) => {
  
  const { id } = useParams();

  return (
    <div>
      <Default tagName='dsp'>
        <ProductLineDetail page="productline" id={id} />
      </Default>
    </div>
  );
};

export default ProductLineInfo;
