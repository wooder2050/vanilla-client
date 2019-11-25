import { SERVER_URL } from '../constants';

export const getAll = dispatch => {
  return new Promise(() => {
    fetch(`${SERVER_URL}/login/success`, {
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
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        if (responseJson.authenticated) {
          dispatch({
            type: "LOGIN_SUCCESS",
            responseJson
          });
          dispatch({
            type: "USERS_ONLOAD",
            responseJson
          });
          dispatch({
            type: "ASSETS_ONLOAD",
            responseJson
          });
          dispatch({
            type: "POSTS_ONLOAD",
            responseJson
          });
        }
      })
      .catch(error => {
        dispatch({
          type: "LOGIN_FAILED",
          error
        });
      });
  });
};

export const logoutAPI = dispatch => {
  return new Promise(() => {
    fetch(`${SERVER_URL}/logout`, {
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
        dispatch({
          type: "LOGOUT",
          responseJson
        });
      });
  });
};

export const myPageUploadAPI = (dispatch, event) => {
  var state = event.props.myPageModal;
  return new Promise(() => {
    if (event.fileInput.current) {
      if (
        event.props.user.email &&
        event.fileInput.current.files[0] &&
        event.displayNameInput.current.value &&
        event.infoInput.current.value &&
        event.jobInput.current.value
      ) {
        const formData = new FormData();
        formData.append("imgfile", event.fileInput.current.files[0]);
        var displayName = event.displayNameInput.current.value;
        var info = event.infoInput.current.value;
        var job = event.jobInput.current.value;
        var email = event.props.user.email;
        fetch(`${SERVER_URL}/upload/photo/s3`, {
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
            fetch(`${SERVER_URL}/users/update`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
              },
              body: JSON.stringify({
                profile_url: profileURL,
                info: info,
                user_display_name: displayName,
                user_job: job,
                email: email
              })
            })
              .then(response => {
                if (response.status === 200) return response.json();
                throw new Error("failed to upload");
              })
              .then(responseJson => {
                dispatch({
                  type: "USERINFO_UPDATE",
                  responseJson
                });
                dispatch({
                  type: "MYPAGEINPUT_ERROR_CLEAR"
                });
              });
          });
        dispatch({
          type: "CLICK_MODAL",
          state
        });
      } else {
        dispatch({
          type: "MYPAGEINPUT_ERROR"
        });
      }
    }
  });
};

export const verificationAPI = (dispatch, event) => {
  return new Promise(() => {
    if (
      event.emailInput &&
      event.passwordInput &&
      event.passwordInput2 &&
      event.userNameInput
    ) {
      var email = event.emailInput.current.value;
      var password = event.passwordInput.current.value;
      var password2 = event.passwordInput2.current.value;
      var user_name = event.userNameInput.current.value;
      var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      var passRule = /^[A-Za-z0-9]{6,12}$/;
      if (email.match(emailRule) === null) {
        var emailError = "Email is invalid";
        var pwdError = null;
        dispatch({
          type: "INPUT_ERROR",
          emailError,
          pwdError
        });
      } else if (password.match(passRule) === null) {
        var emailError = null;
        var pwdError = "Password is invalid.";
        dispatch({
          type: "INPUT_ERROR",
          emailError,
          pwdError
        });
      } else {
        var emailError = null;
        var pwdError = null;
        dispatch({
          type: "INPUT_ERROR",
          emailError,
          pwdError
        });
        fetch(`${SERVER_URL}/register`, {
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
              var page = "login";
              dispatch({
                type: "MOVE_PAGE",
                page
              });
              dispatch({
                type: "REGISTER_INPUT_NO_ERROR"
              });
            } else {
              if (responseJson.register_emailError) {
                var emailError = responseJson.register_emailError;
                var pwdError = null;
                dispatch({
                  type: "INPUT_ERROR",
                  emailError,
                  pwdError
                });
              } else {
                var emailError = null;
                var pwdError = responseJson.register_pwdError;
                dispatch({
                  type: "INPUT_ERROR",
                  emailError,
                  pwdError
                });
              }
            }
          })
          .catch(error => {
            dispatch({
              type: "REGISTER_INPUT_THROW_ERROR_FORM_SERVER",
              error
            });
          });
      }
    }
  });
};

export const searchUserAPI = (dispatch, event) => {
  return new Promise(() => {
    if (event.searchUserInput.current) {
      const username = event.searchUserInput.current.value;
      if (username === "") {
        var searchError = "Please enter at least 2 characters.";
        dispatch({
          type: "SEARCH_ERROR",
          searchError
        });
      } else {
        var searchError = null;
        dispatch({
          type: "SEARCH_ERROR",
          searchError
        });
        fetch(`${SERVER_URL}/users/search/${username}`, {
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
            var searchUsers = responseJson.users;
            dispatch({
              type: "SEARCH_USERS",
              searchUsers
            });
            var state = event.props.searchState;
            dispatch({
              type: "CLICK_MODAL",
              state
            });
          })
          .catch(error => {});
      }
    }
  });
};
export const uploadPhotoAPI = (dispatch, event) => {
  return new Promise(() => {
    if (event.fileInput.current) {
      const postContent = event.fileInput.current.files[0];
      const formData = new FormData();
      formData.append("imgfile", postContent);
      if (postContent) {
        fetch(`${SERVER_URL}/assets/upload/photo/s3`, {
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
            fetch(`${SERVER_URL}/assets/upload/photo/db`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
              },
              body: JSON.stringify({
                post_url: postContentURL,
                email: event.props.user.email,
                post_type: event.props.view
              })
            })
              .then(response => {
                if (response.status === 200) return response.json();
                throw new Error("failed to upload");
              })
              .then(responseJson => {
                dispatch({
                  type: "ASSETS_ONLOAD",
                  responseJson
                });
              });
          });
        var error = null;
        dispatch({
          type: "UPLOAD_INPUT_ERROR",
          error
        });
        dispatch({
          type: "CLOSE_MODAL"
        });
      } else {
        var error = "Please be sure to enter all items.";
        dispatch({
          type: "UPLOAD_INPUT_ERROR",
          error
        });
      }
    }
  });
};

export const uploadMediaAPI = (dispatch, event) => {
  return new Promise(() => {
    if (event.fileInput.current) {
      const postContent = event.fileInput.current.files[0];
      const postCover = event.fileInput2.current.files[0];
      const formData = new FormData();
      formData.append("imgfile", postContent);
      formData.append("imgfile", postCover);
      if (postContent && postCover) {
        fetch(`${SERVER_URL}/assets/upload/media/s3`, {
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
            fetch(`${SERVER_URL}/assets/upload/media/db`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
              },
              body: JSON.stringify({
                post_url: postContentURL,
                cover_url: coverURL,
                email: event.props.user.email,
                post_type: event.props.view
              })
            })
              .then(response => {
                if (response.status === 200) return response.json();
                throw new Error("failed to upload");
              })
              .then(responseJson => {
                dispatch({
                  type: "ASSETS_ONLOAD",
                  responseJson
                });
              });
          });
        var error = null;
        dispatch({
          type: "UPLOAD_INPUT_ERROR",
          error
        });
        dispatch({
          type: "CLOSE_MODAL"
        });
      } else {
        var error = "Please be sure to enter all items.";
        dispatch({
          type: "UPLOAD_INPUT_ERROR",
          error
        });
      }
    }
  });
};

export const postingAPI = (dispatch, event) => {
  return new Promise(() => {
    if (
      event.infoInput.current &&
      event.makerInput.current &&
      event.locationInput.current &&
      event.tagInput.current
    ) {
      const postDescription = event.infoInput.current.value;
      const postMaker = event.makerInput.current.value;
      const postLocation = event.locationInput.current.value;
      const postTags = event.tagInput.current.value;
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
        var error = null;
        dispatch({
          type: "POSTING_INPUT_ERROR",
          error
        });
        fetch(`${SERVER_URL}/posts/upload`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify({
            email: event.props.user.email,
            _id: event.props.user._id,
            user_display_name: event.props.user.user_display_name,
            profile_url: event.props.user.profile_url,
            post_type: event.props.view,
            assetId: event.props.routeProps.match.params.assetId,
            description: postDescription,
            maker: postMaker,
            location: postLocation,
            tags: tagsArray
          })
        }).then(response => {
          event.props.routeProps.history.push("/");
        });
      } else {
        var error = "Please enter all items.";
        dispatch({
          type: "POSTING_INPUT_ERROR",
          error
        });
      }
    }
  });
};

export const postingMusicAPI = (dispatch, event) => {
  return new Promise(() => {
    if (
      event.infoInput.current &&
      event.singerInput.current &&
      event.titleInput.current &&
      event.makerInput.current &&
      event.locationInput.current &&
      event.tagInput.current
    ) {
      const postDescription = event.infoInput.current.value;
      const postSinger = event.singerInput.current.value;
      const postTitle = event.titleInput.current.value;
      const postMaker = event.makerInput.current.value;
      const postLocation = event.locationInput.current.value;
      const postTags = event.tagInput.current.value;
      var tagsArray = postTags.split(",");
      var notTags = true;
      for (var i = 0; i < tagsArray.length; i++) {
        if (tagsArray[i][0] !== "#") notTags = false;
      }
      if (
        notTags &&
        postDescription !== null &&
        postSinger !== null &&
        postTitle !== null &&
        postMaker !== null &&
        postLocation !== null &&
        tagsArray.length !== 0
      ) {
        var error = null;
        dispatch({
          type: "POSTING_INPUT_ERROR",
          error
        });
        fetch(`${SERVER_URL}/posts/upload`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify({
            email: event.props.user.email,
            _id: event.props.user._id,
            user_display_name: event.props.user.user_display_name,
            profile_url: event.props.user.profile_url,
            post_type: event.props.view,
            assetId: event.props.routeProps.match.params.assetId,
            description: postDescription,
            singer: postSinger,
            title: postTitle,
            maker: postMaker,
            location: postLocation,
            tags: tagsArray
          })
        }).then(response => {
          event.props.routeProps.history.push("/");
        });
      } else {
        var error = "Please enter all items.";
        dispatch({
          type: "POSTING_INPUT_ERROR",
          error
        });
      }
    }
  });
};

export const onLoadUserPageAPI = (dispatch, event) => {
  return new Promise(() => {
    if (event.props.routeProps) {
      fetch(
        `${SERVER_URL}/users/${event.props.routeProps.match.params.id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
          }
        }
      )
        .then(response => {
          if (response.status === 200) return response.json();
        })
        .then(responseJson => {
          dispatch({
            type: "USERPAGE_ONLOAD",
            responseJson
          });

          if (event.props.user && event.props.user.following) {
            for (var i = 0; i < event.props.user.following.length; i++) {
              if (
                event.props.user.following[i] === event.props.userPageInfo._id
              ) {
                dispatch({
                  type: "FOLLOWING_STATE"
                });
              }
            }
          }
        });
    }
  });
};
export const userPageclickFollowAPI = (dispatch, event) => {
  return new Promise(() => {
    if (event.props.userPageInfo) {
      fetch(
        `${SERVER_URL}/users/update/following`,
        {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({
          following: event.props.user._id,
          followed: event.props.userPageInfo._id
        })
      })
        .then(response => {
          if (response.status === 200 || response.status === 401)
            return response.json();
          throw new Error("failed to authenticate user");
        })
        .then(responseJson => {})
        .catch(error => {});
    }
  });
};
