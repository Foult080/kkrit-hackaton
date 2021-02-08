import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import contactForm from "./contactForm";
import news from "./news";
import profiles from "./profiles";
import employers from "./employers";
import hack from "./hack";
import team from "./team";

export default combineReducers({
  auth,
  alert,
  contactForm,
  news,
  profiles,
  employers,
  hack,
  team
});
