import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./UserPage.scss";
import { Progress } from "antd";
import arrow from "../../images/arrow.png";
import "antd/dist/antd.css";

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      veiw: "photo",
      modal: false,
      user_info: null,
      inputError: null
    };
  }
  componentDidMount() {
    console.log(this.props.routeProps.match.params.id);
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
    ).then(response => {
      console.log(response);
      if (response.status === 200) return response.json();
    });
    // .then(responseJson => {
    //   this.setState({
    //     user_info: responseJson.pageUser
    //   });
    // });
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
                  <img
                    className="mypage-main-content-header-photo-img"
                    src={
                      this.state.user_info
                        ? this.state.user_info.profile_url
                        : this.props.user.profile_url
                    }
                  />
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
                {this.state.user_info
                  ? this.state.user_info.user_display_name
                  : this.props.user.user_display_name}
              </div>
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
                  팔로우
                </div>
              </div>
            </div>
          </div>
          <div className="mypage-main-content-cover">
            <div className="mypage-main-content-header-wrapper">
              <div
                className="mypage-main-content-header"
                onClick={this.clickPhoto.bind(this)}
              >
                사진
              </div>
              <div
                className="mypage-main-content-header"
                onClick={this.clickMusic.bind(this)}
              >
                곡
              </div>
              <div
                className="mypage-main-content-header"
                onClick={this.clickVideo.bind(this)}
              >
                영상
              </div>
            </div>
            {this.state.veiw === "photo" ? <div>사진</div> : <div></div>}
            {this.state.veiw === "music" ? <div>음악</div> : <div></div>}
            {this.state.veiw === "video" ? <div>영상 </div> : <div></div>}
          </div>
        </div>
      </>
    );
  }
}

export default UserPage;
