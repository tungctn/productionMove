import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchProduct from "../../components/SearchFilter/SearchProduct";
import TableInfo from "../../components/TableInfo/TableInfo";
import { useAppContext } from "../../contexts/AppContext";
import { useProductContext } from "../../contexts/ProductContext";
import { useRequestContext } from "../../contexts/RequestContext";
import Default from "../../Layouts/Default";

const Home = () => {
  const navigate = useNavigate();
  const {
    convertStatusToNameProduct,
    openNotification,
    authState: { user },
    checkMiddleware,
  } = useAppContext();
  const {
    productState: { listProduct, isLoading },
    loadUserProduct,
  } = useProductContext();
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
    checkMiddleware(user, () => {
      loadUserProduct();
    });
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
        <SearchProduct />
        <div className="w-11/12 mt-5 mx-auto">
          <TableInfo
            onRow={(r) => ({
              onClick: () => {
                navigate(`/product/${r._id}`);
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
