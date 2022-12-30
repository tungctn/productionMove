import { createContext, useContext, useEffect, useReducer } from "react";
import {
  getAllProductLine,
  searchProductLine,
  updateProductLine,
} from "../api/productline";
import { ProductLineReducer } from "../reducers/ProductLineReducer";
import {
  SET_PRODUCTLINE_BEGIN,
  SET_PRODUCTLINE_INFO,
  SET_PRODUCTLINE_LIST,
} from "../action";
import { useParams } from "react-router-dom";
import { setAuthHeader } from "../api/auth";
import { useAppContext } from "./AppContext";

export const ProductLineContext = createContext();

export const initState = {
  listProductLine: [],
};

const ProductLineContextProvider = (props) => {
  const {
    authState,
    authState: { user },
    gotoMainPage,
    openNotification,
  } = useAppContext(); // get authState from AppContext
  const [productlineState, dispatch] = useReducer(
    ProductLineReducer,
    authState
  );

  const loadListProductLine = async () => {
    dispatch({ type: SET_PRODUCTLINE_BEGIN });
    const response = await getAllProductLine();
    console.log(response);
    if (response.success) {
      dispatch({
        type: SET_PRODUCTLINE_LIST,
        payload: { listProductLine: response.data },
      });
    } else {
      gotoMainPage(user);
      openNotification("error", response.msg);
    }
  };

  const handleSearchProductLine = async (data) => {
    dispatch({ type: SET_PRODUCTLINE_BEGIN });
    const response = await searchProductLine(data);
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
