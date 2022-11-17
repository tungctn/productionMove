export const AuthReducer = (state, action) => {
    switch(action.type) {
        case 'NOT_AUTHENICATED':
            return {
                ...state,
                isAuthenicated: false
            }
            case 'IS_AUTHENICATED':
                return {
                    ...state,
                    isAuthenicated: true
                }
        default: throw new Error("Action not match")
    }
}