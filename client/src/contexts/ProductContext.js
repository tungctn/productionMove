import { createContext, useReducer, useEffect, useContext } from "react";
import { getAllProduct } from "../api/product";
import { ProductReducer } from "../reducers/ProductReducer";
import { SET_PRODUCT_LIST } from "../action";

export const ProductContext = createContext();

export const initState = {
    listProduct: [],
};

const ProductContextProvider = (props) => {
    const [productState, dispatch] = useReducer (
        ProductReducer,
        initState,
    );

    const loadListProduct = async() => {
        const response = await getAllProduct();
        if (response.success) {
            dispatch ({
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
    };
    
    return (
        <ProductContext.Provider value={data}>
          {props.children}
        </ProductContext.Provider>
      );

}

const useProductContext = () => {
    return useContext(ProductContext);
  };
  
export default ProductContextProvider;
  
export { useProductContext };