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
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      error: null,
      authenticated: false,
      pwdError: null,
      emailError: null,
      assets: null,
      myPosts: null,
      newPosts: null,
      followingPosts: null,
      followingUsers: null,
      followedUsers: null,
      veiw: "photo",
      musicPlayState: "off",
      currentMusic: null,
      currentPost: null,
      postViewState: "off",
      myPageUserInfo: null,
      myPageModal: false,
      myPageinputError: null,
      myPageFollowState: false,
      myPageListTitle: null,
      myPageCurrentFollowList: null,
      loginPage: "login",
      register_error: null,
      pwdError: null,
      emailError: null,
      searchError: null,
      searchUsers: [],
      searchState: false,
      uploadModal: false,
      uploadAssets: null,
      uploadInputError: null,
      uploadCurrnetSelectAsset: null,
      uploadDetailInputError: null
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200 || response.status === 401)
          return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        if (responseJson.authenticated) {
          this.setState({
            authenticated: true,
            user: responseJson.user
          });
        } else {
          this.setState({
            authenticated: false,
            error: responseJson.message
          });
        }
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });

    fetch("http://localhost:5000/assets", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to onload asset");
      })
      .then(responseJson => {
        this.setState({
          assets: responseJson.assets
        });
      });

    fetch("http://localhost:5000/posts/myPost", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200 || response.status === 401)
          return response.json();
        throw new Error("failed to onload post");
      })
      .then(responseJson => {
        this.setState({
          myPosts: responseJson.posts
        });
      })
      .catch(error => {});

    fetch("http://localhost:5000/posts/newPost", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200 || response.status === 401)
          return response.json();
        throw new Error("failed to onload post");
      })
      .then(responseJson => {
        this.setState({
          newPosts: responseJson.newPosts
        });
      })
      .catch(error => {});

    fetch("http://localhost:5000/posts/followingPost", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200 || response.status === 401)
          return response.json();
        throw new Error("failed to onload post");
      })
      .then(responseJson => {
        this.setState({
          followingPosts: responseJson.followingPosts
        });
      })
      .catch(error => {});

    fetch("http://localhost:5000/users/followingUsers", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200 || response.status === 401)
          return response.json();
        throw new Error("failed to onload post");
      })
      .then(responseJson => {
        this.setState({
          followingUsers: responseJson.followingUsers,
          followedUsers: responseJson.followedUsers
        });
      })
      .catch(error => {});
  }

  logout() {
    fetch("http://localhost:5000/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to logout");
      })
      .then(responseJson => {
        this.setState({
          authenticated: responseJson.authenticated
        });
      });
  }
  clickPhoto() {
    this.setState({
      veiw: "photo"
    });
  }
  clickMusic() {
    this.setState({
      veiw: "music"
    });
  }
  clickVideo() {
    this.setState({
      veiw: "video"
    });
  }
  startMusicPlayer(music) {
    this.setState({
      musicPlayState: "bodyPlay",
      currentMusic: music
    });
  }
  closeMusicPlayer() {
    this.setState({
      musicPlayState: "off",
      currentMusic: null
    });
  }
  changePlayMode(state) {
    if (state === "bodyPlay") {
      this.setState({
        musicPlayState: "footPlay"
      });
    } else {
      this.setState({
        musicPlayState: "bodyPlay"
      });
    }
  }
  clickPost(post) {
    this.setState({
      currentPost: post,
      postViewState: "on"
    });
  }
  closePost() {
    this.setState({
      currentPost: null,
      postViewState: "off"
    });
  }
  movePage(page) {
    this.setState({
      loginPage: page
    });
  }
  myPageUpload(event) {
    event.preventDefault();
    const profilePhoto = event.target.imgfile.files[0];
    const userDisplayName = event.target.user_display_name.value;
    const info = event.target.info.value;
    const userJob = event.target.user_job.value;
    const formData = new FormData();
    formData.append("imgfile", profilePhoto);
    if (profilePhoto && userDisplayName && info && userJob) {
      fetch("http://localhost:5000/assets/upload/photo", {
        method: "POST",
        body: formData
      })
        .then(response => {
          if (response.status === 200 || response.status === 401)
            return response.json();
          throw new Error("failed to upload");
        })
        .then(responseJosn => {
          const profileURL = responseJosn.profile_url;
          fetch("http://localhost:5000/users/update", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({
              profile_url: profileURL,
              info: info,
              user_display_name: userDisplayName,
              user_job: userJob,
              email: this.props.user.email
            })
          })
            .then(response => {
              if (response.status === 200) return response.json();
              throw new Error("failed to upload");
            })
            .then(responseJosn => {
              this.setState({
                user_info: responseJosn.user
              });
            });
        });

      this.setState({
        modal: !this.state.modal
      });
    } else {
      this.setState({
        inputError: "Please be sure to enter all items."
      });
    }
  }
  myPageClickModal() {
    this.setState({
      myPageModal: !this.state.myPageModal
    });
  }
  myPageClickFollowState(list, name) {
    this.setState({
      myPageFollowState: !this.state.myPageFollowState,
      myPageListTitle: name,
      myPageCurrentFollowList: list
    });
  }

  verification(event) {
    event.preventDefault();
    const email = event.target.username.value;
    const password = event.target.password.value;
    const password2 = event.target.password2.value;
    const user_name = event.target.user_name.value;
    var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var passRule = /^[A-Za-z0-9]{6,12}$/;
    if (email.match(emailRule) === null) {
      this.setState({
        emailError: "Email is invalid",
        pwdError: null
      });
    } else if (password.match(passRule) === null) {
      this.setState({
        emailError: null,
        pwdError: "Password is invalid."
      });
    } else {
      this.setState({
        emailError: null,
        pwdError: null
      });
      fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({
          email: email,
          password: password,
          password2: password2,
          user_name: user_name
        })
      })
        .then(response => {
          if (response.status === 200 || response.status === 401)
            return response.json();
          throw new Error("failed to authenticate user");
        })
        .then(responseJson => {
          if (responseJson.register_user) {
            this.props.movePage("login");
            this.setState({
              emailError: null,
              pwdError: null
            });
          } else {
            if (responseJson.register_emailError) {
              this.setState({
                emailError: responseJson.register_emailError
              });
            } else {
              this.setState({
                pwdError: responseJson.register_pwdError
              });
            }
          }
        })
        .catch(error => {
          this.setState({
            register_error: "Failed to authenticate user"
          });
        });
    }
  }
  searchUser(event) {
    event.preventDefault();
    const username = event.target.username.value;
    if (username === "") {
      this.setState({
        searchError: "Please enter at least 2 characters."
      });
    } else {
      this.setState({
        searchError: null
      });
      fetch(`http://localhost:5000/users/search/${username}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        }
      })
        .then(response => {
          if (response.status === 200 || response.status === 401)
            return response.json();
          throw new Error("failed to authenticate user");
        })
        .then(responseJson => {
          this.setState({
            searchUsers: responseJson.users,
            searchState: true
          });
        })
        .catch(error => {});
    }
  }
  changeSearchState() {
    this.setState({
      searchState: false
    });
  }

  uploadPhoto(event) {
    event.preventDefault();
    const postContent = event.target.post_content.files[0];
    const formData = new FormData();
    formData.append("imgfile", postContent);
    if (postContent) {
      fetch("http://localhost:5000/assets/upload/photo/s3", {
        method: "POST",
        body: formData
      })
        .then(response => {
          if (response.status === 200 || response.status === 401)
            return response.json();
          throw new Error("failed to upload");
        })
        .then(responseJosn => {
          const postContentURL = responseJosn.profile_url;
          fetch("http://localhost:5000/assets/upload/photo/db", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({
              post_url: postContentURL,
              email: this.state.user.email,
              post_type: this.state.veiw
            })
          })
            .then(response => {
              if (response.status === 200) return response.json();
              throw new Error("failed to upload");
            })
            .then(responseJosn => {
              this.setState({
                uploadAssets: responseJosn.assets
              });
            });
        });
      this.setState({
        uploadModal: !this.state.uploadModal
      });
    } else {
      this.setState({
        uploadInputError: "Please be sure to enter all items."
      });
    }
  }
  uploadMedia(event) {
    event.preventDefault();
    const postContent = event.target.post_content.files[0];
    const postCover = event.target.post_cover.files[0];
    const formData = new FormData();
    formData.append("imgfile", postContent);
    formData.append("imgfile", postCover);
    if (postContent && postCover) {
      fetch("http://localhost:5000/assets/upload/media/s3", {
        method: "POST",
        body: formData
      })
        .then(response => {
          if (response.status === 200 || response.status === 401)
            return response.json();
          throw new Error("failed to upload");
        })
        .then(responseJosn => {
          const postContentURL = responseJosn.post_url;
          const coverURL = responseJosn.cover_url;
          fetch("http://localhost:5000/assets/upload/media/db", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({
              post_url: postContentURL,
              cover_url: coverURL,
              email: this.state.user.email,
              post_type: this.state.veiw
            })
          })
            .then(response => {
              if (response.status === 200) return response.json();
              throw new Error("failed to upload");
            })
            .then(responseJosn => {
              this.setState({
                uploadAssets: responseJosn.assets
              });
            });
        });
      this.setState({
        uploadModal: !this.state.uploadModal
      });
    } else {
      this.setState({
        uploadInputError: "Please be sure to enter all items."
      });
    }
  }
  uploadClickModal() {
    this.setState({
      uploadModal: !this.state.uploadModal
    });
  }
  uploadSelectAsset(asset) {
    this.setState({
      uploadCurrnetSelectAsset: asset
    });
  }

  posting(event) {
    event.preventDefault();
    const postDescription = event.target.description.value;
    const postMaker = event.target.maker.value;
    const postLocation = event.target.location.value;
    const postTags = event.target.tags.value;
    var tagsArray = postTags.split(",");
    var notTags = true;
    for (var i = 0; i < tagsArray.length; i++) {
      if (tagsArray[i][0] !== "#") notTags = false;
    }
    if (
      notTags &&
      postDescription !== null &&
      postMaker !== null &&
      postLocation !== null &&
      tagsArray.length !== 0
    ) {
      this.setState({
        uploadDetailInputError: null
      });
      fetch("http://localhost:5000/posts/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({
          email: this.state.user.email,
          _id: this.state.user._id,
          user_display_name: this.state.user.user_display_name,
          profile_url: this.state.user.profile_url,
          post_type: this.state.veiw,
          assetId: this.state.routeProps.match.params.assetId,
          description: postDescription,
          maker: postMaker,
          location: postLocation,
          tags: tagsArray
        })
      }).then(response => {
        this.props.routeProps.history.push("/");
      });
    } else {
      this.setState({
        uploadDetailInputError: "Please enter all items."
      });
    }
  }
  postingMusic(event) {
    event.preventDefault();
    const postDescription = event.target.description.value;
    const postMaker = event.target.maker.value;
    const postSinger = event.target.singer.value;
    const postTitle = event.target.title.value;
    const postLocation = event.target.location.value;
    const postTags = event.target.tags.value;
    var tagsArray = postTags.split(",");
    var notTags = true;
    for (var i = 0; i < tagsArray.length; i++) {
      if (tagsArray[i][0] !== "#") notTags = false;
    }
    if (
      notTags &&
      postDescription !== null &&
      postMaker !== null &&
      postSinger !== null &&
      postTitle !== null &&
      postLocation !== null &&
      tagsArray.length !== 0
    ) {
      this.setState({
        input_error: null
      });
      fetch("http://localhost:5000/posts/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({
          email: this.state.user.email,
          _id: this.state.user._id,
          user_display_name: this.state.user.user_display_name,
          profile_url: this.state.user.profile_url,
          post_type: this.state.veiw,
          assetId: this.state.uploadDetailSelectAsset,
          description: postDescription,
          maker: postMaker,
          singer: postSinger,
          title: postTitle,
          location: postLocation,
          tags: tagsArray
        })
      }).then(response => {
        this.props.routeProps.history.push("/");
      });
    } else {
      this.setState({
        uploadDetailInputError: "Please enter all items."
      });
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="body-wrapper">
            <div className="main-feed-wrapper">
              <header>
                <Header
                  authenticated={this.state.authenticated}
                  logout={this.logout.bind(this)}
                />
                <SideHeader user={this.state.user} />
              </header>
              <Switch>
                <Route path="/login">
                  <LoginWrapper
                    loginPage={this.state.loginPage}
                    movePage={this.movePage.bind(this)}
                    verification={this.verification.bind(this)}
                    register_error={this.state.register_error}
                    pwdError={this.state.pwdError}
                    emailError={this.state.emailError}
                  />
                </Route>
                <Route
                  path="/search"
                  render={routeProps => (
                    <Search
                      authenticated={this.state.authenticated}
                      user={this.state.user}
                      newPosts={this.state.newPosts}
                      startMusicPlayer={this.startMusicPlayer.bind(this)}
                      clickPost={this.clickPost.bind(this)}
                      searchError={this.state.searchError}
                      searchUsers={this.state.searchUsers}
                      searchState={this.state.searchState}
                      searchUser={this.searchUser.bind(this)}
                      changeSearchState={this.changeSearchState.bind(this)}
                    />
                  )}
                ></Route>
                <Route
                  path="/mypage"
                  render={routeProps => (
                    <MyPage
                      authenticated={this.state.authenticated}
                      user={this.state.user}
                      myPosts={this.state.myPosts}
                      startMusicPlayer={this.startMusicPlayer.bind(this)}
                      clickPost={this.clickPost.bind(this)}
                      clickPhoto={this.clickPhoto.bind(this)}
                      clickMusic={this.clickMusic.bind(this)}
                      clickVideo={this.clickVideo.bind(this)}
                      veiw={this.state.veiw}
                      followingUsers={this.state.followingUsers}
                      followedUsers={this.state.followedUsers}
                      myPageUpload={this.myPageUpload.bind(this)}
                      myPageUserInfo={this.state.myPageUserInfo}
                      myPageModal={this.state.myPageModal}
                      myPageinputError={this.state.myPageinputError}
                      myPageClickModal={this.myPageClickModal.bind(this)}
                      myPageClickFollowState={this.myPageClickFollowState.bind(
                        this
                      )}
                      myPageFollowState={this.state.myPageFollowState}
                      myPageListTitle={this.state.myPageListTitle}
                      myPageCurrentFollowList={
                        this.state.myPageCurrentFollowList
                      }
                    />
                  )}
                />
                <Route path="/upload/:assetId">
                  <UploadDetail
                    authenticated={this.state.authenticated}
                    veiw={this.state.veiw}
                    uploadDetailInputError={this.stateuploadDetailInputError}
                    posting={this.posting.bind(this)}
                    postingMusic={this.postingMusic.bind(this)}
                    uploadCurrnetSelectAsset={
                      this.state.uploadCurrnetSelectAsset
                    }
                  />
                </Route>
                <Route path="/upload">
                  <Upload
                    authenticated={this.state.authenticated}
                    assets={this.state.assets}
                    veiw={this.state.veiw}
                    clickPhoto={this.clickPhoto.bind(this)}
                    clickMusic={this.clickMusic.bind(this)}
                    clickVideo={this.clickVideo.bind(this)}
                    uploadModal={this.state.uploadModal}
                    uploadAssets={this.state.uploadAssets}
                    uploadInputError={this.state.uploadInputError}
                    uploadPhoto={this.uploadPhoto.bind(this)}
                    uploadMedia={this.uploadMedia.bind(this)}
                    uploadClickModal={this.uploadClickModal.bind(this)}
                    uploadSelectAsset={this.uploadSelectAsset.bind(this)}
                    uploadCurrnetSelectAsset={
                      this.state.uploadCurrnetSelectAsset
                    }
                  />
                </Route>
                <Route
                  path="/:id"
                  render={routeProps => (
                    <UserPage
                      authenticated={this.state.authenticated}
                      user={this.state.user}
                      startMusicPlayer={this.startMusicPlayer.bind(this)}
                      clickPost={this.clickPost.bind(this)}
                      veiw={this.state.veiw}
                      clickPhoto={this.clickPhoto.bind(this)}
                      clickMusic={this.clickMusic.bind(this)}
                      clickVideo={this.clickVideo.bind(this)}
                      routeProps={routeProps}
                    />
                  )}
                />
                <Route eaxct path="/">
                  <MainFeed
                    authenticated={this.state.authenticated}
                    user={this.state.user}
                    posts={this.state.myPosts}
                    followingUsers={this.state.followingUsers}
                    followingPosts={this.state.followingPosts}
                    startMusicPlayer={this.startMusicPlayer.bind(this)}
                    clickPost={this.clickPost.bind(this)}
                  />
                </Route>
              </Switch>
              <MusicPlayer
                musicPlayState={this.state.musicPlayState}
                currentMusic={this.state.currentMusic}
                closeMusicPlayer={this.closeMusicPlayer.bind(this)}
                changePlayMode={this.changePlayMode.bind(this)}
              />
              <PostDetail
                currentPost={this.state.currentPost}
                postViewState={this.state.postViewState}
                closePost={this.closePost.bind(this)}
              />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
