import React, { Component } from "react";
import "./MyPage.scss";
import { Progress } from "antd";
import profile from "../../images/profile.png";
import arrow from "../../images/arrow.png";
import "antd/dist/antd.css";

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      veiw: "photo",
      modal: false,
      user_info: null,
      inputError: null
    };
  }
  upload(event) {
    event.preventDefault();
    const profilePhoto = event.target.imgfile.files[0];
    const userDisplayName = event.target.user_display_name.value;
    const info = event.target.info.value;
    const userJob = event.target.user_job.value;
    const formData = new FormData();
    formData.append("imgfile", profilePhoto);
    if (profilePhoto & userDisplayName & info & userJob) {
      fetch("http://localhost:5000/upload/single", {
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
          fetch("http://localhost:5000/upload/database", {
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
  clickModal() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    return (
      <>
        <div className="mypage-main-content-wrapper">
          <div className="mypage-main-content-header-wrapper">
            <div className="mypage-main-content-header-photo-wrapper">
              <div className="mypage-main-content-header-photo-border">
                <div className="mypage-main-content-header-photo">
                  {this.props.user.profile_url ? (
                    <img
                      className="mypage-main-content-header-photo-img"
                      src={
                        this.state.user_info
                          ? this.state.user_info.profile_url
                          : this.props.user.profile_url
                      }
                    />
                  ) : (
                    <img
                      className="mypage-main-content-header-photo-img"
                      src={profile}
                    />
                  )}
                </div>
                <Progress
                  type="circle"
                  width="210px"
                  strokeWidth="3"
                  strokeColor={{
                    "0%": "#fee5a5",
                    "100%": "#486d87"
                  }}
                  percent={90}
                />
              </div>
              <div className="matching-point">
                90%
                <img className="arrow" src={arrow} />
              </div>
            </div>
            <div className="mypage-main-content-header-info-wrapper">
              {this.state.user_info ? (
                <div className="mypage-main-content-header-info-id">
                  {this.state.user_info.user_display_name
                    ? this.state.user_info.user_display_name
                    : this.props.user.email}
                </div>
              ) : (
                <div className="mypage-main-content-header-info-id">
                  {this.props.user.email}
                </div>
              )}
              <div className="mypage-main-content-header-info-number-wrapper">
                <div className="mypage-main-content-header-info-number-cover">
                  <div className="mypage-main-content-header-info-title">
                    게시물
                  </div>
                  <div className="mypage-main-content-header-info-number">
                    0
                  </div>
                </div>
                <div className="mypage-main-content-header-info-number-cover">
                  <div className="mypage-main-content-header-info-title">
                    팔로워
                  </div>
                  <div className="mypage-main-content-header-info-number">
                    0
                  </div>
                </div>
                <div className="mypage-main-content-header-info-number-cover">
                  <div className="mypage-main-content-header-info-title">
                    팔로잉
                  </div>
                  <div className="mypage-main-content-header-info-number">
                    0
                  </div>
                </div>
              </div>
              <div className="mypage-main-content-header-info-name-wrapper">
                <div className="mypage-main-content-header-info-name">
                  {this.props.user.user_name}
                </div>
                <div className="mypage-main-content-header-info-job">
                  {this.state.user_info
                    ? this.state.user_info.user_job
                    : this.props.user.user_job}
                </div>
              </div>
              <div className="mypage-main-content-header-info-text-wrapper">
                {this.state.user_info
                  ? this.state.user_info.info
                  : this.props.user.info}
              </div>
              <div className="mypage-main-content-header-info-detail-wrapper">
                상세정보
                <img className="arrow" src={arrow} />
              </div>
              <div className="mypage-main-content-header-info-modify-wrapper">
                <div
                  className="mypage-main-content-header-info-modify-btn"
                  onClick={this.clickModal.bind(this)}
                >
                  프로필 수정
                  <img className="arrow" src={arrow} />
                </div>
              </div>
            </div>
          </div>
          <div className="mypage-main-content-cover">
            <div className="mypage-main-content-inner-header-wrapper">
              <div
                className={
                  this.state.veiw === "photo"
                    ? "mypage-main-content-header border-bottom"
                    : "mypage-main-content-header"
                }
                onClick={this.clickPhoto.bind(this)}
              >
                사진
              </div>
              <div
                className={
                  this.state.veiw === "music"
                    ? "mypage-main-content-header border-bottom"
                    : "mypage-main-content-header"
                }
                onClick={this.clickMusic.bind(this)}
              >
                곡
              </div>
              <div
                className={
                  this.state.veiw === "video"
                    ? "mypage-main-content-header border-bottom"
                    : "mypage-main-content-header"
                }
                onClick={this.clickVideo.bind(this)}
              >
                영상
              </div>
            </div>
            {this.state.veiw === "photo" ? (
              <div className="mypost-cover">
                {this.props.myPosts &&
                  this.props.myPosts.map((post, i) => {
                    if (post.post_type === "photo") {
                      return (
                        <div key={i} className="mypost-wrapper">
                          <img className="mypost" src={post.cover_url} />
                        </div>
                      );
                    }
                  })}
              </div>
            ) : (
              <div></div>
            )}
            {this.state.veiw === "music" ? (
              <div className="mypost-cover">
                {this.props.myPosts &&
                  this.props.myPosts.map((post, i) => {
                    if (post.post_type === "music") {
                      return (
                        <div key={i} className="mypost-wrapper">
                          <img className="mypost" src={post.cover_url} />
                        </div>
                      );
                    }
                  })}
              </div>
            ) : (
              <div></div>
            )}
            {this.state.veiw === "video" ? (
              <div className="mypost-cover">
                {this.props.myPosts &&
                  this.props.myPosts.map((post, i) => {
                    if (post.post_type === "video") {
                      return (
                        <div key={i} className="mypost-wrapper">
                          <img className="mypost" src={post.cover_url} />
                        </div>
                      );
                    }
                  })}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {this.state.modal ? (
          <div className="modal-body">
            <div className="modal-modify-profile-wrapper">
              <div className="modal-modify-profile">
                <form onSubmit={this.upload.bind(this)}>
                  <div
                    className="close-modal"
                    onClick={this.clickModal.bind(this)}
                  >
                    X
                  </div>
                  <div className="current-profile">
                    <img
                      src={
                        this.state.user_info
                          ? this.state.user_info.profile_url
                          : this.props.user.profile_url
                      }
                      className="current-profile-photo"
                    />
                  </div>
                  <div className="profile-photo-wrapper">
                    <label className="input-profile-photo-label">
                      프로필 사진 바꾸기
                    </label>
                    <input
                      className="input-profile-photo-form"
                      type="file"
                      name="imgfile"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div className="profile-wrapper">
                    <div className="input-profile-label">사용자 이름</div>
                    <input
                      className="input-profile-form"
                      type="text"
                      name="user_display_name"
                      placeholder="영어로 입력해주세요"
                    />
                  </div>
                  <div className="profile-wrapper">
                    <div className="input-profile-label">소개</div>
                    <input
                      className="input-profile-form"
                      type="text"
                      name="info"
                      placeholder="
                    Please introduce yourself."
                    />
                  </div>
                  <div className="profile-wrapper">
                    <div className="input-profile-label">직업</div>
                    <input
                      className="input-profile-form"
                      type="text"
                      name="user_job"
                      placeholder="
                    Please enter your occupation."
                    />
                  </div>
                  <div className="input-errorr">{this.state.inputError}</div>
                  <div className="input-profile-btn-wrapper">
                    <button className="input-profile-btn">완료</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </>
    );
  }
}

export default MyPage;
