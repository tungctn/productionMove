import { createContext, useContext, useEffect, useReducer } from "react";
import { getAllProductLine, updateProductLine } from "../api/productline";
import { ProductLineReducer } from "../reducers/ProductLineReducer";
import {
  SET_PRODUCTLINE_INFO,
  SET_PRODUCTLINE_LIST,
  SET_PRODUCT_LIST,
} from "../action";
import { useParams } from "react-router-dom";
import { ProductReducer } from "../reducers/ProductReducer";
import { getAllProduct } from "../api/product";

export const ProductContext = createContext();

export const initState = {
  listProduct: [],
};

const ProductContextProvider = (props) => {
  const [productState, dispatch] = useReducer(ProductReducer, initState);

  const loadListProduct = async () => {
    const response = await getAllProduct();
    console.log(response);
    if (response.success) {
      dispatch({
        type: SET_PRODUCT_LIST,
        payload: { listProduct: response.data },
      });
    }
  };

  useEffect(() => {
    loadListProduct();
  }, []);

  const data = {
    productState,
    dispatch,
    loadListProduct,
  };

  return (
    <ProductContext.Provider value={data}>
      {props.children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(ProductContext);
};

export default ProductContextProvider;

export { useProductContext };
