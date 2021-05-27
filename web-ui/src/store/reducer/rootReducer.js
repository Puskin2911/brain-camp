import {combineReducers} from "redux";
import gameReducer from "./GameReducer";
import authReducer from "./AuthReducer";

const rootReducer = combineReducers({
    games: gameReducer,
    auth: authReducer
});

export default rootReducer;
