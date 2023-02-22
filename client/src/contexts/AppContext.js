import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { notification } from 'antd';
import { loginAPI, logoutAPI, setAuthHeader } from '../api/auth';
import { AuthReducer } from '../reducers/AuthReducer';
import { getProfile } from '../api/user';
import { SET_AUTH_BEGIN, SET_AUTH_FAILED, SET_AUTH_SUCCESS } from '../action';
import { useNavigate, useParams } from 'react-router-dom';

export const AppContext = createContext();

export const initState = {
  url: window.location.pathname,
  isLoading: false,
  user: null,
  isAuthenticated: false,
  listProductLine: [],
  listProduct: [],
  listRequest: [],
  listUser: [],
};

const AppContextProvider = (props) => {
  const [authState, dispatch] = useReducer(AuthReducer, initState);
  const navigate = useNavigate();
  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      duration: 2.5,
    });
  };
  const [openSidebar, setOpenSidebar] = useState(true);
  const convertObjectToArray = (obj) => {
    let result = [];
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    for (let index = 0; index < keys.length; index++) {
      const element = { propName: keys[index], value: values[index] };
      result.push(element);
    }
    return result;
  };

  const deadDate = (product, date) => {
    const newDate = new Date(date);
    switch (product.productLine.timePeriod.unit) {
      case 0:
        newDate.setDate(
          newDate.getDate() + product.productLine.timePeriod.period,
        );
        break;
      case 1:
        newDate.setMonth(
          newDate.getMonth() + product.productLine.timePeriod.period,
        );
        break;
      case 2:
        newDate.setFullYear(
          newDate.getFullYear() + product.productLine.timePeriod.period,
        );
        break;
      default:
        break;
    }
    return newDate;
  };

  const convertRoleToName = (role) => {
    switch (role) {
      case 1:
        return 'Ban điều hành';
      case 2:
        return 'Cơ sở sản xuất';
      case 3:
        return 'Đại lý phân phối';
      case 4:
        return 'Trung tâm bảo hành';
      default:
        throw new Error('Role is not match');
    }
  };

  const convertTypeToName = (type) => {
    switch (type) {
      case 0:
        return 'yêu cầu nhập sản phẩm';
      case 1:
        return 'yêu cầu bảo hành';
      case 2:
        return 'yêu cầu nhận sản phẩm đã bảo hành xong';
      case 3:
        return 'yêu cầu trả lại sản phẩm do không bảo hành được';
      case 4:
        return 'yêu cầu trả lại cơ sở sản xuất do lâu không bán được';
      case 5:
        return 'yêu cầu bàn giao sản phẩm mới cho khách hàng';
      case 6:
        return 'yêu cầu triệu hồi sản phẩm';
      default:
        throw new Error('type is not match');
    }
  };

  const convertStatusToName = (status) => {
    switch (status) {
      case 1:
        return 'Đã gửi yêu cầu';
      case 2:
        return 'Chờ xử lý';
      case 3:
        return 'Chấp nhận';
      case 4:
        return 'Từ chối';
      default:
        throw new Error('status is not match');
    }
  };

  const convertStatusToNameProduct = (type) => {
    switch (type) {
      case 0:
        return 'mới sản xuất';
      case 1:
        return 'đưa về đại lý';
      case 2:
        return 'đã bán';
      case 3:
        return 'lỗi cần bảo hành';
      case 4:
        return 'đang bảo hành';
      case 5:
        return 'đã bảo hành xong';
      case 6:
        return 'đã trả lại cho khách hàng';
      case 7:
        return 'lỗi, cần trả về nhà máy';
      case 8:
        return 'lỗi, đã đưa về cơ sở sản xuất';
      case 9:
        return 'lỗi cần triệu hồi';
      case 10:
        return 'hết thời gian bảo hành';
      case 11:
        return 'trả lại cơ sở sản xuất do lâu không bán được';
      default:
        throw new Error('type is not match');
    }
  };

  const convertUnitToName = (unit) => {
    switch (unit) {
      case 0:
        return 'ngày';
      case 1:
        return 'tháng';
      case 2:
        return 'năm';
      default:
        throw new Error('unit is not match');
    }
  };

  const loadUser = async () => {
    setAuthHeader(localStorage['token']);
    dispatch({ type: SET_AUTH_BEGIN });
    const response = await getProfile();
    if (response.success) {
      dispatch({
        type: SET_AUTH_SUCCESS,
        payload: {
          user: response.data,
        },
      });
    } else {
      localStorage.removeItem('token');
      openNotification('warning', response.msg);
      setAuthHeader(null);
      dispatch({ type: SET_AUTH_FAILED });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleLogin = async (data) => {
    dispatch({
      type: SET_AUTH_BEGIN,
    });
    const response = await loginAPI(data);
    if (response.success) {
      localStorage.setItem('token', response.accessToken);
      setAuthHeader(localStorage['token']);
      dispatch({
        type: SET_AUTH_SUCCESS,
        payload: {
          user: response.data,
        },
      });
      openNotification('success', response.msg);
      if (response.data.role === 1) {
        navigate('/productline');
      } else {
        navigate('/home');
      }
    } else {
      dispatch({
        type: SET_AUTH_FAILED,
      });
      openNotification('error', response.msg);
    }
  };

  const gotoMainPage = (user) => {
    if (user?.role === 1) {
      navigate('/productline');
    } else {
      navigate('/home');
    }
  };

  const checkMiddleware = (role, next) => {
    if (role.includes(authState.user?.role)) {
      next();
    } else {
      gotoMainPage(authState.user);
      openNotification('error', 'Bạn không có quyền truy cập trang này');
    }
  };

  const handleLogout = async () => {
    dispatch({ type: SET_AUTH_BEGIN });
    const response = await logoutAPI();
    localStorage.removeItem('token');
    dispatch({ type: SET_AUTH_FAILED });
    openNotification('success', response.msg);
  };

  const data = {
    loadUser,
    authState,
    openSidebar,
    setOpenSidebar,
    openNotification,
    handleLogin,
    handleLogout,
    convertObjectToArray,
    convertRoleToName,
    convertTypeToName,
    convertStatusToName,
    convertStatusToNameProduct,
    convertUnitToName,
    deadDate,
    gotoMainPage,
    checkMiddleware,
  };

  return (
    <AppContext.Provider value={data}>{props.children}</AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;

export { useAppContext };
