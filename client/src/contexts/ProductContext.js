import { createContext, useContext, useEffect, useReducer } from "react";
import { getAllProductLine, updateProductLine } from "../api/productline";
import { ProductLineReducer } from "../reducers/ProductLineReducer";
import {
  SET_PRODUCTLINE_INFO,
  SET_PRODUCTLINE_LIST,
  SET_PRODUCT_BEGIN,
  SET_PRODUCT_LIST,
} from "../action";
import { useParams } from "react-router-dom";
import { ProductReducer } from "../reducers/ProductReducer";
import { getAllProduct, getProductByUser } from "../api/product";
import { useAppContext } from "./AppContext";
import { setAuthHeader } from "../api/auth";

export const ProductContext = createContext();

export const initState = {
  listProduct: [],
};

const ProductContextProvider = (props) => {
  const { authState, loadUser } = useAppContext(); // get authState from AppContext
  const [productState, dispatch] = useReducer(ProductReducer, authState);

  const loadUserProduct = async () => {
    dispatch({ type: SET_PRODUCT_BEGIN });
    const response = await getProductByUser();
    // console.log(response);
    if (response.success) {
      dispatch({
        type: SET_PRODUCT_LIST,
        payload: { listProduct: response.data },
      });
    }
  };

  const loadAllProduct = async () => {
    dispatch({ type: SET_PRODUCT_BEGIN });
    const response = await getAllProduct();
    console.log(response);
    if (response.success) {
      dispatch({
        type: SET_PRODUCT_LIST,
        payload: { listProduct: response.data },
      });
    }
  };


  const data = {
    productState,
    dispatch,
    loadUserProduct,
    loadAllProduct,
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
