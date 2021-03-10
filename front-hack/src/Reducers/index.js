import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import team from "./team";
import hackatons from "./hackatons";

export default combineReducers({ auth, alert, hackatons, team });
