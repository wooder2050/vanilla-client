import React, { Component } from "react";
import "./UserPage.scss";
import { Progress } from "antd";
import arrow from "../../images/arrow.png";
import profile from "../../images/profile.png";
import "antd/dist/antd.css";

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_info: null,
      userPosts: null,
      following: false,
      followingNumber: 0,
      followerNumber: 0
    };
  }
  componentDidMount() {
    fetch(
      `http://localhost:5000/users/${this.props.routeProps.match.params.id}`,
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
        this.setState({
          user_info: responseJson.pageUser[0],
          userPosts: responseJson.pageUserPosts,
          followerNumber: responseJson.pageUser[0].follower.length,
          followingNumber: responseJson.pageUser[0].following.length
        });
        if (this.props.user && this.props.user.following) {
          for (var i = 0; i < this.props.user.following.length; i++) {
            if (this.props.user.following[i] === this.state.user_info._id) {
              this.setState({
                following: true
              });
            }
          }
        }
      });
  }
  clickFollow() {
    fetch("http://localhost:5000/users/followingUpdate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({
        following: this.props.user._id,
        followed: this.state.user_info._id
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
  render() {
    return (
      <>
        <div className="userpage-main-content-wrapper">
          <div className="userpage-main-content-header-wrapper">
            <div className="userpage-main-content-header-photo-wrapper">
              <div className="userpage-main-content-header-photo-border">
                <div className="userpage-main-content-header-photo">
                  {this.state.user_info ? (
                    <img
                      className="userpage-main-content-header-photo-img"
                      src={
                        this.state.user_info.profile_url
                          ? this.state.user_info.profile_url
                          : profile
                      }
                    />
                  ) : (
                    <img
                      className="userpage-main-content-header-photo-img"
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
            <div className="userpage-main-content-header-info-wrapper">
              {this.state.user_info ? (
                <div className="userpage-main-content-header-info-id">
                  {this.state.user_info.user_display_name
                    ? this.state.user_info.user_display_name
                    : this.state.user_info.email}
                </div>
              ) : (
                <div className="userpage-main-content-header-info-id">
                  {this.state.user_info ? this.state.user_info.email : ""}
                </div>
              )}
              <div className="userpage-main-content-header-info-number-wrapper">
                <div className="userpage-main-content-header-info-number-cover">
                  <div className="userpage-main-content-header-info-title">
                    게시물
                  </div>
                  <div className="userpage-main-content-header-info-number">
                    {this.state.userPosts ? this.state.userPosts.length : 0}
                  </div>
                </div>
                <div className="userpage-main-content-header-info-number-cover">
                  <div className="userpage-main-content-header-info-title">
                    팔로워
                  </div>
                  <div className="userpage-main-content-header-info-number">
                    {this.state.followerNumber}
                  </div>
                </div>
                <div className="userpage-main-content-header-info-number-cover">
                  <div className="userpage-main-content-header-info-title">
                    팔로잉
                  </div>
                  <div className="userpage-main-content-header-info-number">
                    {this.state.followingNumber}
                  </div>
                </div>
              </div>
              <div className="userpage-main-content-header-info-name-wrapper">
                <div className="userpage-main-content-header-info-name">
                  {this.state.user_info ? this.state.user_info.user_name : ""}
                </div>
                <div className="userpage-main-content-header-info-job">
                  {this.state.user_info ? this.state.user_info.user_job : ""}
                </div>
              </div>
              <div className="userpage-main-content-header-info-text-wrapper">
                {this.state.user_info ? this.state.user_info.info : ""}
              </div>
              <div className="userpage-main-content-header-info-detail-wrapper">
                상세정보
                <img className="arrow" src={arrow} />
              </div>
              <div className="userpage-main-content-header-info-modify-wrapper">
                {this.state.following ? (
                  <div className="userpage-main-content-header-info-modify-btn-following">
                    팔로잉
                  </div>
                ) : (
                  <div
                    className="userpage-main-content-header-info-modify-btn"
                    onClick={this.clickFollow.bind(this)}
                  >
                    팔로우
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="userpage-main-content-cover">
            <div className="userpage-main-content-inner-header-wrapper">
              <div
                className={
                  this.props.veiw === "photo"
                    ? "userpage-main-content-header border-bottom"
                    : "userpage-main-content-header"
                }
                onClick={this.props.clickPhoto.bind(this)}
              >
                사진
              </div>
              <div
                className={
                  this.props.veiw === "music"
                    ? "userpage-main-content-header border-bottom"
                    : "userpage-main-content-header"
                }
                onClick={this.props.clickMusic.bind(this)}
              >
                곡
              </div>
              <div
                className={
                  this.props.veiw === "video"
                    ? "userpage-main-content-header border-bottom"
                    : "userpage-main-content-header"
                }
                onClick={this.props.clickVideo.bind(this)}
              >
                영상
              </div>
            </div>
            {this.props.veiw === "photo" ? (
              <div className="userpost-cover">
                {this.state.userPosts &&
                  this.state.userPosts.map((post, i) => {
                    if (post.post_type === "photo") {
                      return (
                        <div key={i} className="userpost-wrapper">
                          <img className="userpost" src={post.post_url} />
                        </div>
                      );
                    }
                  })}
              </div>
            ) : (
              <div></div>
            )}
            {this.props.veiw === "music" ? (
              <div className="userpost-cover">
                {this.state.userPosts &&
                  this.state.userPosts.map((post, i) => {
                    if (post.post_type === "music") {
                      return (
                        <div
                          key={i}
                          onClick={this.props.startMusicPlayer.bind(this, post)}
                          className="userpost-wrapper"
                        >
                          <img className="userpost" src={post.cover_url} />
                        </div>
                      );
                    }
                  })}
              </div>
            ) : (
              <div></div>
            )}
            {this.props.veiw === "video" ? (
              <div className="userpost-cover">
                {this.state.userPosts &&
                  this.state.userPosts.map((post, i) => {
                    if (post.post_type === "video") {
                      return (
                        <div className="userpost-wrapper">
                          <img className="userpost" src={post.cover_url} />
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
      </>
    );
  }
}

export default UserPage;
