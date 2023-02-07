import { createContext, useContext, useEffect, useReducer } from "react";
import {
  getAllProductLine,
  searchProductLine,
} from "../api/productline";
import { ProductLineReducer } from "../reducers/ProductLineReducer";
import {
  SET_PRODUCTLINE_BEGIN,
  SET_PRODUCTLINE_LIST,
} from "../action";
import { useAppContext } from "./AppContext";

export const ProductLineContext = createContext();

const ProductLineContextProvider = (props) => {
  const {
    authState,
    authState: { user },
  } = useAppContext(); // get authState from AppContext
  const [productlineState, dispatch] = useReducer(
    ProductLineReducer,
    authState
  );

  const loadListProductLine = async () => {
    dispatch({ type: SET_PRODUCTLINE_BEGIN });
    const response = await getAllProductLine();
    if (response.success) {
      dispatch({
        type: SET_PRODUCTLINE_LIST,
        payload: { listProductLine: response.data },
      });
    }
  };

  const handleSearchProductLine = async (data) => {
    dispatch({ type: SET_PRODUCTLINE_BEGIN });
    const response = await searchProductLine(data);
    if (response.success) {
      dispatch({
        type: SET_PRODUCTLINE_LIST,
        payload: { listProductLine: response.data },
      });
    }
  };

  const data = {
    productlineState,
    loadListProductLine,
    handleSearchProductLine,
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
