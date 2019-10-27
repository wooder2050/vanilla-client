import { connect } from "react-redux";

export const getAll = dispatch => {
  return new Promise(() => {
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
        dispatch({
          type: "LOGOUT",
          responseJson
        });
      });
  });
};

export const myPageUploadAPI = (dispatch, event, email) => {
  return new Promise(() => {
    console.log(event, email);
    if (
      event.target.imgfile &&
      event.target.user_display_name &&
      event.target.info &&
      event.target.user_job
    ) {
      const profilePhoto = event.target.imgfile.files[0];
      const userDisplayName = event.target.user_display_name.value;
      const info = event.target.info.value;
      const userJob = event.target.user_job.value;
      const formData = new FormData();
      formData.append("imgfile", profilePhoto);
      console.log(
        "myPageUploadAPI ",
        profilePhoto && userDisplayName && info && userJob
      );
    } else {
      console.log("실패");
    }

    // if (profilePhoto && userDisplayName && info && userJob) {
    //   fetch("http://localhost:5000/assets/upload/photo/s3", {
    //     method: "POST",
    //     body: formData
    //   })
    //     .then(response => {
    //       if (response.status === 200 || response.status === 401)
    //         return response.json();
    //       throw new Error("failed to upload");
    //     })
    //     .then(responseJosn => {
    //       const profileURL = responseJosn.profile_url;
    //       fetch("http://localhost:5000/users/update", {
    //         method: "POST",
    //         headers: {
    //           Accept: "application/json",
    //           "Content-Type": "application/json",
    //           "Access-Control-Allow-Credentials": true
    //         },
    //         body: JSON.stringify({
    //           profile_url: profileURL,
    //           info: info,
    //           user_display_name: userDisplayName,
    //           user_job: userJob,
    //           email: email
    //         })
    //       })
    //         .then(response => {
    //           if (response.status === 200) return response.json();
    //           throw new Error("failed to upload");
    //         })
    //         .then(responseJson => {
    //           console.log("클라이언트 ", responseJson.user);
    //           dispatch({
    //             type: "USERINFO_UPDATE",
    //             responseJson
    //           });
    //           dispatch({
    //             type: "MYPAGEINPUT_ERROR_CLEAR"
    //           });
    //         });
    //     });
    //   dispatch({
    //     type: "CLICK_MODAL"
    //   });
    // } else {
    //   dispatch({
    //     type: "MYPAGEINPUT_ERROR"
    //   });
    // }
  });
};
