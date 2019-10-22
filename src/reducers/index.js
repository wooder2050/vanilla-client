import { combineReducers } from "redux";
import { LOG_IN } from "../contants/actionTypes.js";

const initialState = {
  isLogin: false
};

function isLoginReducers(state = initialState.isLogin, action) {
  switch (action.type) {
      case LOG_IN:
        return true;
    default:
      return state;
  }
}
export default combineReducers({
  isLogin: isLoginReducers
});
