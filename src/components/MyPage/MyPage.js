import React, { Component } from "react";
import "./MyPage.scss";
import { NavLink } from "react-router-dom";
import { Progress } from "antd";
import profile from "../../images/profile.png";
import arrow from "../../images/arrow.png";
import "antd/dist/antd.css";

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.displayNameInput = React.createRef();
    this.infoInput = React.createRef();
    this.jobInput = React.createRef();
  }
  componentDidMount() {
    this.props.closeModal();
  }
  render() {
    console.log(this.props);
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
                      src={this.props.user.profile_url}
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
              <div className="mypage-main-content-header-info-id">
                {this.props.user.user_display_name
                  ? this.props.user.user_display_name
                  : this.props.user.email}
              </div>
              <div className="mypage-main-content-header-info-number-wrapper">
                <div className="mypage-main-content-header-info-number-cover">
                  <div className="mypage-main-content-header-info-title">
                    게시물
                  </div>
                  <div className="mypage-main-content-header-info-number">
                    {this.props.myPosts ? this.props.myPosts.length : 0}
                  </div>
                </div>
                <div
                  onClick={this.props.myPageClickFollowState.bind(
                    this,
                    this.props.myPageFollowState,
                    this.props.followedUsers,
                    "팔로워"
                  )}
                  className="mypage-main-content-header-info-number-cover"
                >
                  <div className="mypage-main-content-header-info-title">
                    팔로워
                  </div>
                  <div className="mypage-main-content-header-info-number">
                    {this.props.user.follower
                      ? this.props.user.follower.length
                      : 0}
                  </div>
                </div>
                <div
                  onClick={this.props.myPageClickFollowState.bind(
                    this,
                    this.props.myPageFollowState,
                    this.props.followingUsers,
                    "팔로잉"
                  )}
                  className="mypage-main-content-header-info-number-cover"
                >
                  <div className="mypage-main-content-header-info-title">
                    팔로잉
                  </div>
                  <div className="mypage-main-content-header-info-number">
                    {this.props.user.following
                      ? this.props.user.following.length
                      : 0}
                  </div>
                </div>
              </div>
              <div className="mypage-main-content-header-info-name-wrapper">
                <div className="mypage-main-content-header-info-name">
                  {this.props.user.user_name}
                </div>
                <div className="mypage-main-content-header-info-job">
                  {this.props.user.user_job}
                </div>
              </div>
              <div className="mypage-main-content-header-info-text-wrapper">
                {this.props.user.info}
              </div>
              <div className="mypage-main-content-header-info-detail-wrapper">
                상세정보
                <img className="arrow" src={arrow} />
              </div>
              <div className="mypage-main-content-header-info-modify-wrapper">
                <div
                  className="mypage-main-content-header-info-modify-btn"
                  onClick={this.props.myPageClickModal.bind(
                    this,
                    this.props.myPageModal
                  )}
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
                  this.props.view === "photo"
                    ? "mypage-main-content-header border-bottom"
                    : "mypage-main-content-header"
                }
                onClick={this.props.clickPhoto.bind(this)}
              >
                사진
              </div>
              <div
                className={
                  this.props.view === "music"
                    ? "mypage-main-content-header border-bottom"
                    : "mypage-main-content-header"
                }
                onClick={this.props.clickMusic.bind(this)}
              >
                곡
              </div>
              <div
                className={
                  this.props.view === "video"
                    ? "mypage-main-content-header border-bottom"
                    : "mypage-main-content-header"
                }
                onClick={this.props.clickVideo.bind(this)}
              >
                영상
              </div>
            </div>
            {this.props.view === "photo" ? (
              <div className="mypost-cover">
                {this.props.myPosts &&
                  this.props.myPosts.map((post, i) => {
                    if (post.post_type === "photo") {
                      return (
                        <div key={i} className="mypost-wrapper">
                          <img className="mypost" src={post.post_url} />
                        </div>
                      );
                    }
                  })}
              </div>
            ) : (
              <div></div>
            )}
            {this.props.view === "music" ? (
              <div className="mypost-cover">
                {this.props.myPosts &&
                  this.props.myPosts.map((post, i) => {
                    if (post.post_type === "music") {
                      return (
                        <div
                          key={i}
                          onClick={this.props.startMusicPlayer.bind(this, post)}
                          className="mypost-wrapper"
                        >
                          <img className="mypost" src={post.cover_url} />
                        </div>
                      );
                    }
                  })}
              </div>
            ) : (
              <div></div>
            )}
            {this.props.view === "video" ? (
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
        {this.props.myPageFollowState ? (
          <>
            <div
              onClick={this.props.myPageClickFollowState.bind(
                this,
                this.props.myPageFollowState
              )}
              className="followList-background"
            ></div>
            <div className="followList-wrapper">
              <div className="title">{this.props.myPageListTitle}</div>
              {this.props.myPageCurrentFollowList.map((user, i) => {
                return (
                  <>
                    <NavLink
                      className="followList-user-wrapper"
                      to={`${user[0]._id}`}
                    >
                      <div key={i} className="followList-user-profile-wrapper">
                        <img
                          className="followList-user-profile"
                          src={
                            user[0].profile_url ? user[0].profile_url : profile
                          }
                        />
                      </div>
                      <div className="followList-user-text-wrapper">
                        <strong className="followList-user-id">
                          {user[0].user_display_name
                            ? user[0].user_display_name
                            : user[0].email}
                        </strong>
                        {user[0].user_name}
                      </div>
                    </NavLink>
                  </>
                );
              })}
            </div>
          </>
        ) : (
          <div></div>
        )}

        {this.props.myPageModal ? (
          <div className="modal-body">
            <div className="modal-modify-profile-wrapper">
              <div className="modal-modify-profile">
                <div>
                  <div
                    className="close-modal"
                    onClick={this.props.myPageClickModal.bind(
                      this,
                      this.props.myPageModal
                    )}
                  >
                    X
                  </div>
                  <div className="current-profile">
                    <img
                      src={this.props.user.profile_url}
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
                      placeholder="example@gmail.com"
                      ref={this.fileInput}
                    />
                  </div>
                  <div className="profile-wrapper">
                    <div className="input-profile-label">사용자 이름</div>
                    <input
                      className="input-profile-form"
                      type="text"
                      name="user_display_name"
                      placeholder="영어로 입력해주세요"
                      ref={this.displayNameInput}
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
                      ref={this.infoInput}
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
                      ref={this.jobInput}
                    />
                  </div>
                  <div className="input-errorr">{this.props.inputError}</div>
                  <div className="input-profile-btn-wrapper">
                    <button
                      onClick={e => this.props.myPageUpload(this)}
                      className="input-profile-btn"
                    >
                      완료
                    </button>
                  </div>
                </div>
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
