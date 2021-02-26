import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import team from "./team";

export default combineReducers({ auth, alert, team });
