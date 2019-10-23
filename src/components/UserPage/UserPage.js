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
      veiw: "photo",
      user_info: null,
      userPosts: null,
      following: false
    };
  }
  componentDidMount() {
    fetch(
      `http://localhost:5000/onload/userpage/${this.props.routeProps.match.params.id}`,
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
        console.log(responseJson.pageUser[0]);
        this.setState({
          user_info: responseJson.pageUser[0],
          userPosts: responseJson.pageUserPosts
        });
        if (this.props.user) {
          for (var i = 0; i < this.props.user.following.length; i++) {
            console.log(this.props.user.following[i], this.state.user_info._id);
            if (this.props.user.following[i] === this.state.user_info._id) {
              this.setState({
                following: true
              });
            }
          }
        }
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
  clickFollow() {
    fetch("http://localhost:5000/upload/follow", {
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
      .then(responseJson => {
        console.log(
          "팔로워 성공 ",
          responseJson.follower,
          responseJson.followee
        );
      })
      .catch(error => {});
  }
  render() {
    console.log(this.props.user.following, this.state.user_info);
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
                    0
                  </div>
                </div>
                <div className="userpage-main-content-header-info-number-cover">
                  <div className="userpage-main-content-header-info-title">
                    팔로워
                  </div>
                  <div className="userpage-main-content-header-info-number">
                    0
                  </div>
                </div>
                <div className="userpage-main-content-header-info-number-cover">
                  <div className="userpage-main-content-header-info-title">
                    팔로잉
                  </div>
                  <div className="userpage-main-content-header-info-number">
                    0
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
                  this.state.veiw === "photo"
                    ? "userpage-main-content-header border-bottom"
                    : "userpage-main-content-header"
                }
                onClick={this.clickPhoto.bind(this)}
              >
                사진
              </div>
              <div
                className={
                  this.state.veiw === "music"
                    ? "userpage-main-content-header border-bottom"
                    : "userpage-main-content-header"
                }
                onClick={this.clickMusic.bind(this)}
              >
                곡
              </div>
              <div
                className={
                  this.state.veiw === "video"
                    ? "userpage-main-content-header border-bottom"
                    : "userpage-main-content-header"
                }
                onClick={this.clickVideo.bind(this)}
              >
                영상
              </div>
            </div>
            {this.state.veiw === "photo" ? (
              <div className="userpost-cover">
                {this.state.userPosts &&
                  this.state.userPosts.map((post, i) => {
                    if (post.post_type === "photo") {
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
            {this.state.veiw === "music" ? (
              <div className="userpost-cover">
                {this.state.userPosts &&
                  this.state.userPosts.map((post, i) => {
                    if (post.post_type === "music") {
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
            {this.state.veiw === "video" ? (
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
