const API_BASE_URL = 'http://127.0.0.1:8080';
// const API_BASE_URL = 'http://ec2-54-169-208-186.ap-southeast-1.compute.amazonaws.com';
const ACCESS_TOKEN = 'accessToken';

const BASE_AUTH_API_URL = '/api/auth';
const CHECK_AUTH_URL = API_BASE_URL + BASE_AUTH_API_URL + '/validate';
const LOGIN_URL = API_BASE_URL + BASE_AUTH_API_URL + '/login';
const SIGNUP_URL = API_BASE_URL + BASE_AUTH_API_URL + '/signup';
const JOIN_ROOM_URL = API_BASE_URL + "/api/room/join";

const SOCKET_CONNECT_URL = API_BASE_URL + '/stomp';

const ApiConstants = {
    ACCESS_TOKEN,
    CHECK_AUTH_URL,
    LOGIN_URL,
    SIGNUP_URL,
    SOCKET_CONNECT_URL,
    JOIN_ROOM_URL
};

export default ApiConstants;