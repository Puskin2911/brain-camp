import AuthAction from "../action/AuthAction";

const initState = {
    isAuthenticated: false
}

export default function authReducer(state = initState, action) {
    switch (action.type) {
        case AuthAction.initAuthenticated:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        default:
            return {
                ...state
            }
    }
}