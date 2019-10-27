import { combineReducers } from "redux";
import { LOG_IN } from "../contants/actionTypes.js";
import usersReducers from "./user";
import loginReducers from "./login";
import assetReducers from "./asset";
import postReducers from "./post";
import clickReducers from "./click";
import musicPlayerReducers from "./musicPlayer";
import errorReducers from "./error";

// const initialState = {
//   isLogin: false,
//   user: {},
//   error: null,
//   authenticated: false,
//   pwdError: null,
//   emailError: null,
//   assets: null,
//   myPosts: null,
//   newPosts: null,
//   followingPosts: null,
//   followingUsers: null,
//   followedUsers: null,
//   veiw: "photo",
//   musicPlayState: "off",
//   currentMusic: null,
//   currentPost: null,
//   postViewState: "off",
//   myPageUserInfo: null,
//   myPageModal: false,
//   myPageinputError: null,
//   myPageFollowState: false,
//   myPageListTitle: null,
//   myPageCurrentFollowList: null,
//   loginPage: "login",
//   register_error: null,
//   pwdError: null,
//   emailError: null,
//   searchError: null,
//   searchUsers: [],
//   searchState: false,
//   uploadModal: false,
//   uploadAssets: null,
//   uploadInputError: null,
//   uploadCurrnetSelectAsset: null,
//   uploadDetailInputError: null
// };

export default combineReducers({
  login: loginReducers,
  users: usersReducers,
  asset: assetReducers,
  post: postReducers,
  click: clickReducers,
  musicPlayer: musicPlayerReducers,
  error: errorReducers
});
