import { Input } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProduceSearch from "../../components/Produce/ProduceSearch";
import TableInfo from "../../components/TableInfo/TableInfo";
import { useAppContext } from "../../contexts/AppContext";
import { useProductContext } from "../../contexts/ProductContext";
import { useRequestContext } from "../../contexts/RequestContext";
import Default from "../../Layouts/Default";

const Home = () => {
  const navigate = useNavigate();
  const { convertStatusToNameProduct } = useAppContext();
  const {
    productState: { listProduct, isLoading },
    loadUserProduct,
  } = useProductContext();
  const { loadListRequest } = useRequestContext();
  const dataColumn = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Mã định danh",
      dataIndex: "identifier",
      key: "identifier",
    },
    {
      title: "Dòng sản phẩm",
      dataIndex: "productline",
      key: "productline",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
  ];
  useEffect(() => {
    loadUserProduct();
  }, []);

  const dataSource = listProduct.map((product, index) => {
    return {
      ...product,
      key: index + 1,
      productline: product.productLine.name,
      status: convertStatusToNameProduct(product.status),
    };
  });

  return (
    <div className="w-full">
      <Default tagName="kho">
        <ProduceSearch />
        <div className="mt-5">
          <TableInfo
            onRow={(r) => ({
              onClick: () => {
                navigate(`/product/${r._id}`);
                console.log(r);
              },
            })}
            dataColumn={dataColumn}
            dataSource={dataSource}
            loading={isLoading}
          />
        </div>
      </Default>
    </div>
  );
};

export default Home;
