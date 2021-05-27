import axios from "axios";
import ApiConstants from "../constants/ApiConstants";
import localStorageHelper from "../utils/localStorageHelper";

const validateUser = (token) => axios.get(
    ApiConstants.CHECK_AUTH_URL,
    {
        headers: {Authorization: 'Bearer ' + token}
    }
);

const login = (loginInfo) => axios.post(
    ApiConstants.LOGIN_URL,
    loginInfo
);

const getAuthorizationHeader = {Authorization: 'Bearer ' + localStorageHelper.getCookie("access_token")}

const authService = {
    validateUser,
    login,
    getAuthorizationHeader
}

export default authService;