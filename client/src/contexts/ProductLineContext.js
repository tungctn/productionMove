import { createContext, useContext, useEffect, useReducer } from "react";
import { getAllProductLine, updateProductLine } from "../api/productline";
import { ProductLineReducer } from "../reducers/ProductLineReducer";
import { SET_PRODUCTLINE_INFO, SET_PRODUCTLINE_LIST } from "../action";
import { useParams } from "react-router-dom";
import { setAuthHeader } from "../api/auth";

export const ProductLineContext = createContext();

export const initState = {
  listProductLine: [],
};

const ProductLineContextProvider = (props) => {
  const [productlineState, dispatch] = useReducer(
    ProductLineReducer,
    initState
  );

  const loadListProductLine = async () => {
    // setAuthHeader(localStorage["token"]);
    const response = await getAllProductLine();
    console.log(response);
    if (response.success) {
      dispatch({
        type: SET_PRODUCTLINE_LIST,
        payload: { listProductLine: response.data },
      });
    }
  };


  const data = {
    productlineState,
    dispatch,
    loadListProductLine,
  };

  return (
    <ProductLineContext.Provider value={data}>
      {props.children}
    </ProductLineContext.Provider>
  );
};

const useProductLineContext = () => {
  return useContext(ProductLineContext);
};

export default ProductLineContextProvider;

export { useProductLineContext };
