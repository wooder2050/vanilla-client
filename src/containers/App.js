import { connect } from "react-redux";
import App from "../components/App/App";

import {
  getAll,
  logoutAPI,
  myPageUploadAPI,
  verificationAPI,
  searchUserAPI,
  uploadPhotoAPI,
  uploadMediaAPI,
  postingAPI,
  postingMusicAPI,
  onLoadUserPageAPI,
  userPageclickFollowAPI
} from "../api";

const mapStateToProps = state => {
  const { authenticated, loginPage } = state.login;
  const {
    user,
    followingUsers,
    followedUsers,
    myPageUserInfo,
    myPageCurrentFollowList,
    searchUsers,
    myPageFollowState,
    myPageListTitle,
    userPageInfo,
    userPagePosts,
    userPagefollower,
    userPagefollowing,
    following,
    userPageFollowState,
    userPageListTitle,
    userPageCurrentFollowList,
    userPagefollowingUsers,
    userPagefollowedUsers
  } = state.users;
  const { assets, selectAsset } = state.asset;
  const { myPosts, newPosts, followingPosts } = state.post;
  const { view, currentPost, postViewState, modal } = state.click;
  const { musicPlayState, currentMusic } = state.musicPlayer;
  const {
    inputError,
    emailError,
    pwdError,
    register_error,
    searchError,
    uploadInputError,
    uploadDetailInputError
  } = state.error;

  return {
    authenticated,
    loginPage,
    user,
    followingUsers,
    followedUsers,
    myPageUserInfo,
    myPageCurrentFollowList,
    searchUsers,
    myPageFollowState,
    myPageListTitle,
    userPageInfo,
    userPagePosts,
    userPagefollower,
    userPagefollowing,
    following,
    userPageFollowState,
    userPageListTitle,
    userPageCurrentFollowList,
    userPagefollowingUsers,
    userPagefollowedUsers,
    assets,
    selectAsset,
    myPosts,
    newPosts,
    followingPosts,
    view,
    currentPost,
    postViewState,
    modal,
    musicPlayState,
    currentMusic,
    inputError,
    emailError,
    pwdError,
    register_error,
    searchError,
    uploadInputError,
    uploadDetailInputError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad() {
      console.log("getall start");
      getAll(dispatch);
    },
    logout() {
      logoutAPI(dispatch);
    },
    clickPhoto() {
      dispatch({
        type: "CLICK_PHOTO"
      });
    },
    clickMusic() {
      dispatch({
        type: "CLICK_MUSIC"
      });
    },
    clickVideo() {
      dispatch({
        type: "CLICK_VIDEO"
      });
    },
    startMusicPlayer(music) {
      dispatch({
        type: "START_MUSICPLAYER",
        music
      });
    },
    closeMusicPlayer() {
      dispatch({
        type: "CLOSE_MUSICPLAYER"
      });
    },
    changePlayMode(state) {
      if (state === "bodyPlay") {
        dispatch({
          type: "BODYPLAY_MUSICPLAYER"
        });
      } else {
        dispatch({
          type: "FOOTERPLAY_MUSICPLAYER"
        });
      }
    },
    clickPost(post) {
      dispatch({
        type: "CLICK_POST",
        post
      });
    },
    closePost() {
      dispatch({
        type: "CLOSE_POST"
      });
    },
    movePage(page) {
      dispatch({
        type: "MOVE_PAGE",
        page
      });
    },
    myPageUpload(event) {
      myPageUploadAPI(dispatch, event);
    },
    clickModal(state) {
      dispatch({
        type: "CLICK_MODAL",
        state
      });
    },
    myPageClickFollowState(state, list, name) {
      dispatch({
        type: "CLICK_FOLLOW_MYPAGE_MODAL",
        state,
        list,
        name
      });
    },
    verification(event) {
      verificationAPI(dispatch, event);
    },
    searchUser(event) {
      searchUserAPI(dispatch, event);
    },
    closeModal() {
      dispatch({
        type: "CLOSE_MODAL"
      });
    },
    ClickAsset(asset) {
      dispatch({
        type: "SELECT_ASSET",
        asset
      });
    },
    uploadPhoto(event) {
      uploadPhotoAPI(dispatch, event);
    },
    uploadMedia(event) {
      uploadMediaAPI(dispatch, event);
    },
    posting(event) {
      postingAPI(dispatch, event);
    },
    postingMusic(event) {
      postingMusicAPI(dispatch, event);
    },
    onLoadUserPage(event) {
      onLoadUserPageAPI(dispatch, event);
    },
    userPageclickFollow(event) {
      userPageclickFollowAPI(dispatch, event);
    },
    userPageClickFollowState(state, list, name) {
      dispatch({
        type: "CLICK_FOLLOW_USERPAGE_MODAL",
        state,
        list,
        name
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
