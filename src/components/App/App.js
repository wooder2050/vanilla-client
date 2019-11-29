import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import SideHeader from "../SideHeader/SideHeader";
import LoginWrapper from "../Login/LoginWrapper";
import MainFeed from "../MainFeed/MainFeed";
import MyPage from "../MyPage/MyPage";
import Upload from "../Upload/Upload";
import UploadDetail from "../UploadDetail/UploadDetail";
import Search from "../Search/Search";
import UserPage from "../UserPage/UserPage";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import PostDetail from "../PostDetail/PostDetail";
import "./App.scss";

class App extends Component {
  componentDidMount() {
    this.props.onLoad();
  }
  render() {
    console.log(this.props);
    return (
      <Router>
        <div className="App">
          <div className="body-wrapper">
            <div className="main-feed-wrapper">
              <header>
                <Header
                  authenticated={this.props.authenticated}
                  logout={this.props.logout.bind(this)}
                />
                <SideHeader
                  authenticated={this.props.authenticated}
                  user={this.props.user}
                />
              </header>
              <Switch>
                <Route path="/login">
                  <LoginWrapper
                    loginPage={this.props.loginPage}
                    movePage={this.props.movePage.bind(this)}
                    verification={this.props.verification.bind(this)}
                    register_error={this.props.register_error}
                    pwdError={this.props.pwdError}
                    emailError={this.props.emailError}
                  />
                </Route>
                <Route path="/search">
                  <Search
                    authenticated={this.props.authenticated}
                    user={this.props.user}
                    newPosts={this.props.newPosts}
                    startMusicPlayer={this.props.startMusicPlayer.bind(this)}
                    clickPost={this.props.clickPost.bind(this)}
                    searchError={this.props.searchError}
                    searchUsers={this.props.searchUsers}
                    searchState={this.props.modal}
                    searchUser={this.props.searchUser.bind(this)}
                    changeSearchState={this.props.closeModal.bind(this)}
                    closeModal={this.props.closeModal.bind(this)}
                  />
                </Route>
                <Route path="/mypage">
                  <MyPage
                    authenticated={this.props.authenticated}
                    user={this.props.user}
                    myPosts={this.props.myPosts}
                    startMusicPlayer={this.props.startMusicPlayer.bind(this)}
                    clickPost={this.props.clickPost.bind(this)}
                    clickPhoto={this.props.clickPhoto.bind(this)}
                    clickMusic={this.props.clickMusic.bind(this)}
                    clickVideo={this.props.clickVideo.bind(this)}
                    view={this.props.view}
                    followingUsers={this.props.followingUsers}
                    followedUsers={this.props.followedUsers}
                    myPageUpload={this.props.myPageUpload.bind(this)}
                    myPageModal={this.props.modal}
                    myPageinputError={this.props.inputError}
                    myPageClickModal={this.props.clickModal.bind(this)}
                    myPageClickFollowState={this.props.myPageClickFollowState.bind(
                      this
                    )}
                    myPageFollowState={this.props.myPageFollowState}
                    myPageListTitle={this.props.myPageListTitle}
                    myPageCurrentFollowList={this.props.myPageCurrentFollowList}
                    closeModal={this.props.closeModal.bind(this)}
                  />
                </Route>
                <Route
                  path="/upload/:assetId"
                  render={routeProps => (
                    <UploadDetail
                      authenticated={this.props.authenticated}
                      user={this.props.user}
                      view={this.props.view}
                      uploadDetailInputError={
                        this.props.stateuploadDetailInputError
                      }
                      posting={this.props.posting.bind(this)}
                      postingMusic={this.props.postingMusic.bind(this)}
                      uploadCurrnetSelectAsset={this.props.selectAsset}
                      routeProps={routeProps}
                    />
                  )}
                />
                <Route path="/upload">
                  <Upload
                    authenticated={this.props.authenticated}
                    user={this.props.user}
                    assets={this.props.assets}
                    view={this.props.view}
                    clickPhoto={this.props.clickPhoto.bind(this)}
                    clickMusic={this.props.clickMusic.bind(this)}
                    clickVideo={this.props.clickVideo.bind(this)}
                    uploadModal={this.props.modal}
                    uploadInputError={this.props.uploadInputError}
                    uploadPhoto={this.props.uploadPhoto.bind(this)}
                    uploadMedia={this.props.uploadMedia.bind(this)}
                    uploadClickModal={this.props.clickModal.bind(this)}
                    uploadSelectAsset={this.props.ClickAsset.bind(this)}
                    uploadCurrnetSelectAsset={this.props.selectAsset}
                    closeModal={this.props.closeModal.bind(this)}
                  />
                </Route>
                <Route
                  path="/:id"
                  render={routeProps => (
                    <UserPage
                      authenticated={this.props.authenticated}
                      user={this.props.user}
                      startMusicPlayer={this.props.startMusicPlayer.bind(this)}
                      clickPost={this.props.clickPost.bind(this)}
                      view={this.props.view}
                      clickPhoto={this.props.clickPhoto.bind(this)}
                      clickMusic={this.props.clickMusic.bind(this)}
                      clickVideo={this.props.clickVideo.bind(this)}
                      routeProps={routeProps}
                      onLoadUserPage={this.props.onLoadUserPage.bind(this)}
                      userPageInfo={this.props.userPageInfo}
                      userPagePosts={this.props.userPagePosts}
                      userPagefollower={this.props.userPagefollower}
                      userPagefollowing={this.props.userPagefollowing}
                      following={this.props.following}
                      userPageclickFollow={this.props.userPageclickFollow.bind(
                        this
                      )}
                      userPageClickFollowState={this.props.userPageClickFollowState.bind(
                        this
                      )}
                      userPageFollowState={this.props.userPageFollowState}
                      userPageListTitle={this.props.userPageListTitle}
                      userPageCurrentFollowList={
                        this.props.userPageCurrentFollowList
                      }
                      userPagefollowingUsers={this.props.userPagefollowingUsers}
                      userPagefollowedUsers={this.props.userPagefollowedUsers}
                    />
                  )}
                />
                <Route eaxct path="/">
                  <MainFeed
                    authenticated={this.props.authenticated}
                    user={this.props.user}
                    posts={this.props.myPosts}
                    followingUsers={this.props.followingUsers}
                    followingPosts={this.props.followingPosts}
                    startMusicPlayer={this.props.startMusicPlayer.bind(this)}
                    clickPost={this.props.clickPost.bind(this)}
                  />
                </Route>
              </Switch>
              <MusicPlayer
                musicPlayState={this.props.musicPlayState}
                currentMusic={this.props.currentMusic}
                closeMusicPlayer={this.props.closeMusicPlayer.bind(this)}
                changePlayMode={this.props.changePlayMode.bind(this)}
              />
              <PostDetail
                currentPost={this.props.currentPost}
                postViewState={this.props.postViewState}
                closePost={this.props.closePost.bind(this)}
              />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
