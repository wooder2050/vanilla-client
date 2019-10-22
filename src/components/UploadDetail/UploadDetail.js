import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./UploadDetail.scss";
import "antd/dist/antd.css";

class UploadDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      veiw: "photo",
      modal: false,
      assets: null,
      select_asset: null,
      input_error: null
    };
  }
  componentDidMount() {
    fetch(
      `http://localhost:5000/upload/${this.props.routeProps.match.params.assetId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        }
      }
    )
      .then(response => {
        if (response.status === 200 || response.status === 401)
          return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        this.setState({
          select_asset: responseJson.asset
        });
      })
      .catch(error => {});
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
        input_error: null
      });
      fetch("http://localhost:5000/upload/posting", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({
          email: this.props.user.email,
          user_display_name:this.props.user.user_display_name,
          profile_url: this.props.user.profile_url,
          post_type: this.state.veiw,
          assetId: this.props.routeProps.match.params.assetId,
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
        input_error: "Please enter all items."
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
  selectAsset(id) {
    this.setState({
      select_post: id
    });
  }
  render() {
    console.log(this.props.user);
    return (
      <>
        <div className="body-upload-detail-wrapper">
          <div className="upload-upload-detail-feed-wrapper">
            <div className="upload-detail-header-content-cover">
              <div className="upload-detail-main-content-header-cancel-btn">
                <NavLink
                  className="upload-detail-main-content-header-cancel"
                  to="/upload"
                >
                  이전
                </NavLink>
              </div>
            </div>
            <div className="upload-detail-main-content-wrapper">
              <div className="upload-detail-main-content-cover">
                <div className="upload-detail-main-content-cover-wrapper">
                  {this.state.select_asset ? (
                    <img
                      className="upload-detail-main-content"
                      src={this.state.select_asset[0].url}
                    />
                  ) : (
                    <div></div>
                  )}
                  <div className="upload-detail-main-content-text">
                    메인 컨텐츠
                  </div>
                </div>
                <div className="upload-detail-main-content-cover-wrapper">
                  {this.state.select_asset ? (
                    <img
                      className="upload-detail-main-content-cover"
                      src={this.state.select_asset[0].cover_url}
                    />
                  ) : (
                    <div></div>
                  )}
                  <div className="upload-detail-main-content-text">커버</div>
                </div>
              </div>
              <div className="upload-detail-main-content-input-form-cover">
                <div className="input-error">{this.state.input_error}</div>
                <form onSubmit={this.posting.bind(this)}>
                  <div className="input-cover-wrapper">
                    <div className="text-wrapper">
                      <label className="text">설명</label>
                    </div>
                    <div className="input-wrapper">
                      <textarea
                        className="input-description-form"
                        type="text"
                        name="description"
                        placeholder="문구 입력..."
                      />
                    </div>
                  </div>
                  <div className="input-cover-wrapper">
                    <div className="text-wrapper">
                      <label className="text">컨텐츠 제작자</label>
                    </div>
                    <div className="input-wrapper">
                      <input
                        className="input-description-form"
                        type="text"
                        name="maker"
                        placeholder="이름을 입력해주세요."
                      />
                    </div>
                  </div>
                  <div className="input-cover-wrapper">
                    <div className="text-wrapper">
                      <label className="text">장소</label>
                    </div>
                    <div className="input-wrapper">
                      <input
                        className="input-description-form"
                        type="text"
                        name="location"
                        placeholder="ex)상상마당, 언플러그드"
                      />
                    </div>
                  </div>
                  <div className="input-cover-wrapper">
                    <div className="text-wrapper">
                      <label className="text">태그</label>
                    </div>
                    <div className="input-wrapper">
                      <input
                        className="input-description-form"
                        type="text"
                        name="tags"
                        placeholder="ex)#김수영, #1집"
                      />
                      {this.state.tags}
                    </div>
                  </div>
                  <div className="input-btn-wrapper">
                    <button type="submit" className="input-btn">
                      공유하기
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UploadDetail;
