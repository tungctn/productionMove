import { createContext, useContext, useReducer } from 'react';
import { SET_PRODUCT_BEGIN, SET_PRODUCT_LIST } from '../action';
import { ProductReducer } from '../reducers/ProductReducer';
import { getAllProduct, getProductByUser, searchProduct } from '../api/product';
import { useAppContext } from './AppContext';

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const {
    authState,
    authState: { user },
  } = useAppContext(); // get authState from AppContext
  const [productState, dispatch] = useReducer(ProductReducer, authState);

  const loadUserProduct = async () => {
    dispatch({ type: SET_PRODUCT_BEGIN });
    const response = await getProductByUser();
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
    if (response.success) {
      dispatch({
        type: SET_PRODUCT_LIST,
        payload: { listProduct: response.data },
      });
    }
  };

  const handleSearchProduct = async (searchForm) => {
    if (Object.keys(searchForm).length !== 0) {
      dispatch({ type: SET_PRODUCT_BEGIN });
      const response = await searchProduct(searchForm);
      if (response.success) {
        dispatch({
          type: SET_PRODUCT_LIST,
          payload: { listProduct: response.data },
        });
      }
    }
  };

  const data = {
    productState,
    loadUserProduct,
    loadAllProduct,
    handleSearchProduct,
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
