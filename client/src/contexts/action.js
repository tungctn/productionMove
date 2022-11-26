export const SET_AUTH_BEGIN = "SET_AUTH_BEGIN"
export const SET_AUTH_SUCCESS = "SET_AUTH_SUCCESS"
export const SET_AUTH_FAILED = "SET_AUTH_FAILED"

export const SET_USER_LIST = 'SET_USER_LIST'
export const SET_USER_UPDATE = 'SET_USER_UPDATE'
export const SET_USER_DELETE = 'SET_USER_DELETE'

// const loadUser = async () => {
//     console.log("load user");
//     if (!localStorage["token"]) {
//       dispatch({
//         type: SET_AUTH_FAILED,
//       });
//       return;
//     }

//     setAuthHeader(localStorage["token"]);
//     dispatch({
//       type: SET_AUTH_BEGIN,
//     });

//     const responseData = await getProfile();
//     console.log(responseData);
//     if (responseData.success) {
//       dispatch({
//         type: SET_AUTH_SUCCESS,
//         payload: {
//           user: responseData.data,
//         },
//       });
//     }
//     if (responseData.success) {
//       localStorage.removeItem("token");
//       setAuthHeader(null);
//       dispatch({
//         type: SET_AUTH_FAILED,
//       });
//     }
//   };

//   useEffect(() => {
//     loadUser();
//   }, []);