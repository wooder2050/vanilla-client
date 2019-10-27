import { connect } from "react-redux";
import App from "../components/App/App";
import { LOG_IN } from "../contants/actionTypes";

import { getAll, logoutAPI, myPageUploadAPI } from "../api";

const mapStateToProps = state => {
  const { authenticated, loginPage } = state.login;
  const {
    user,
    followingUsers,
    followedUsers,
    myPageUserInfo,
    myPageCurrentFollowList,
    searchUsers
  } = state.users;
  const { assets } = state.asset;
  const { myPosts, newPosts, followingPosts } = state.post;
  const { view, currentPost, postViewState, modal } = state.click;
  const { musicPlayState, currentMusic } = state.musicPlayer;
  const { inputError } = state.error;

  return {
    authenticated,
    loginPage,
    user,
    followingUsers,
    followedUsers,
    myPageUserInfo,
    myPageCurrentFollowList,
    searchUsers,
    assets,
    myPosts,
    newPosts,
    followingPosts,
    view,
    currentPost,
    postViewState,
    modal,
    musicPlayState,
    currentMusic
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad() {
      console.log("온로드");
      getAll(dispatch);
    },
    logout() {
      console.log("로그아웃");
      logoutAPI(dispatch);
    },
    clickPhoto() {
      console.log("클릭포토");
      dispatch({
        type: "CLICK_PHOTO"
      });
    },
    clickMusic() {
      console.log("클릭뮤직");
      dispatch({
        type: "CLICK_MUSIC"
      });
    },
    clickVideo() {
      console.log("클릭비디오");
      dispatch({
        type: "CLICK_VIDEO"
      });
    },
    startMusicPlayer(music) {
      console.log("스타트뮤직플레이어");
      dispatch({
        type: "START_MUSICPLAYER",
        music
      });
    },

    closeMusicPlayer() {
      console.log("뮤직플레이어 닫기");
      dispatch({
        type: "CLOSE_MUSICPLAYER"
      });
    },
    changePlayMode(state) {
      console.log("뮤직플레이어 모드 변경");
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
      console.log("포스트 클릭");
      dispatch({
        type: "CLICK_POST",
        post
      });
    },
    closePost() {
      console.log("포스트 닫기");
      dispatch({
        type: "CLOSE_POST"
      });
    },
    movePage(page) {
      console.log("로그인 페이지 이동");
      dispatch({
        type: "MOVE_PAGE",
        page
      });
    },
    myPageUpload(event, email) {
      console.log("마이페이지 업로드", event, email);
      myPageUploadAPI(dispatch, event, email);
    },
    clickModal(state) {
      dispatch({
        type: "CLICK_MODAL",
        state
      });
    }

    // verification(event) {
    //   dispatch({
    //     type: LOG_IN
    //   });
    // }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
