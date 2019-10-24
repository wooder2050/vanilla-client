import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import "./Upload.scss";
import "antd/dist/antd.css";
import play from "../../images/play.png";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      assets: null,
      inputError: null,
      select_post: null
    };
  }

  uploadSingle(event) {
    event.preventDefault();
    const postContent = event.target.post_content.files[0];
    const formData = new FormData();
    formData.append("imgfile", postContent);
    if (postContent) {
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
          const postContentURL = responseJosn.profile_url;
          fetch("http://localhost:5000/upload/databasepost", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({
              post_url: postContentURL,
              email: this.props.user.email,
              post_type: this.props.veiw
            })
          })
            .then(response => {
              if (response.status === 200) return response.json();
              throw new Error("failed to upload");
            })
            .then(responseJosn => {
              this.setState({
                assets: responseJosn.assets
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

  upload(event) {
    event.preventDefault();
    const postContent = event.target.post_content.files[0];
    const postCover = event.target.post_cover.files[0];
    const formData = new FormData();
    formData.append("imgfile", postContent);
    formData.append("imgfile", postCover);
    if (postContent && postCover) {
      fetch("http://localhost:5000/upload/multi", {
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
          console.log(postContentURL, coverURL);
          fetch("http://localhost:5000/upload/databasepost", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({
              post_url: postContentURL,
              cover_url: coverURL,
              email: this.props.user.email,
              post_type: this.props.veiw
            })
          })
            .then(response => {
              if (response.status === 200) return response.json();
              throw new Error("failed to upload");
            })
            .then(responseJosn => {
              console.log(responseJosn.assets);
              this.setState({
                assets: responseJosn.assets
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
    return (
      <>
        <div className="upload-feed-wrapper">
          <div className="upload-header-content-cover">
            <div className="upload-header-content-header-wrapper">
              <div
                className={
                  this.props.veiw === "photo"
                    ? "upload-header-content-header border-bottom"
                    : "upload-header-content-header"
                }
                onClick={this.props.clickPhoto.bind(this)}
              >
                사진
              </div>
              <div
                className={
                  this.props.veiw === "music"
                    ? "upload-header-content-header border-bottom"
                    : "upload-header-content-header"
                }
                onClick={this.props.clickMusic.bind(this)}
              >
                곡
              </div>
              <div
                className={
                  this.props.veiw === "video"
                    ? "upload-header-content-header border-bottom"
                    : "upload-header-content-header"
                }
                onClick={this.props.clickVideo.bind(this)}
              >
                영상
              </div>
            </div>
          </div>
          <div className="upload-main-content-wrapper">
            <div className="upload-main-content-header-wrapper">
              <div className="upload-main-content-header-cancel-btn">
                <NavLink className="upload-main-content-header-cancel" to="/">
                  취소
                </NavLink>
              </div>
              <div
                className="upload-main-content-header-upload-btn"
                onClick={this.clickModal.bind(this)}
              >
                업로드
              </div>
              <div className="upload-main-content-header-next-btn">
                <NavLink
                  className="upload-main-content-header-next"
                  to={`/upload/${this.state.select_post}`}
                >
                  다음
                </NavLink>
              </div>
            </div>
          </div>

          <div className="upload-main-content-list-wrapper">
            {!this.state.assets &&
              this.props.assets &&
              this.props.assets.map((asset, i) => {
                if (asset.type === this.props.veiw) {
                  return (
                    <div
                      key={i}
                      className={
                        this.state.select_post === asset._id
                          ? "upload-post select-post"
                          : "upload-post"
                      }
                      data-set={i}
                      onClick={this.selectAsset.bind(this, asset._id)}
                    >
                      <img
                        className="upload-post-content"
                        src={
                          asset.type === "photo"
                            ? asset.url
                            : asset.cover_url
                        }
                      />
                      {this.props.veiw !== "photo" ? (
                        <div className="player-btn-wrapper">
                          <img className="player-btn-wrapper" src={play} />
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  );
                }
              })}
            {this.state.assets &&
              this.state.assets.map((asset, i) => {
                if (asset.type === this.props.veiw) {
                  return (
                    <div
                      key={i}
                      className={
                        this.state.select_post === asset._id
                          ? "upload-post select-post"
                          : "upload-post"
                      }
                      data-set={i}
                      onClick={this.selectAsset.bind(this, asset._id)}
                    >
                      <img
                        className="upload-post-content"
                        src={
                          asset.type === "photo"
                            ? asset.url
                            : asset.cover_url
                        }
                      />
                      {this.props.veiw !== "photo" ? (
                        <div className="player-btn-wrapper">
                          <img className="player-btn-wrapper" src={play} />
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  );
                }
              })}
          </div>
        </div>

        {this.state.modal ? (
          <div className="modal-body-upload">
            <div className="modal-upload-wrapper">
              <div className="modal-upload">
                <form
                  onSubmit={
                    this.props.veiw === "photo"
                      ? this.uploadSingle.bind(this)
                      : this.upload.bind(this)
                  }
                >
                  <div
                    className="close-modal"
                    onClick={this.clickModal.bind(this)}
                  >
                    X
                  </div>
                  <div className="upload-wrapper">
                    <div className="input-upload-label">POST UPLOAD</div>
                    <input
                      className="input-upload-form"
                      type="file"
                      name="post_content"
                    />
                  </div>
                  {this.props.veiw === "photo" ? (
                    <div></div>
                  ) : (
                    <div className="upload-wrapper">
                      <div className="input-upload-label">COVER UPLOAD</div>
                      <input
                        className="input-upload-form"
                        type="file"
                        name="post_cover"
                      />
                    </div>
                  )}
                  <div className="input-errorr">{this.state.inputError}</div>
                  <div className="input-upload-btn-wrapper">
                    <button className="input-upload-btn">완료</button>
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

export default Upload;
