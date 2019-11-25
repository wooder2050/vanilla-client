import { combineReducers } from "redux";
import usersReducers from "./user";
import loginReducers from "./login";
import assetReducers from "./asset";
import postReducers from "./post";
import clickReducers from "./click";
import musicPlayerReducers from "./musicPlayer";
import errorReducers from "./error";

export default combineReducers({
  login: loginReducers,
  users: usersReducers,
  asset: assetReducers,
  post: postReducers,
  click: clickReducers,
  musicPlayer: musicPlayerReducers,
  error: errorReducers
});
