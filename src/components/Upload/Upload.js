import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Upload.scss";
import "antd/dist/antd.css";
import play from "../../images/play.png";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.fileInput2 = React.createRef();
  }
  componentDidMount() {
    this.props.closeModal();
  }
  render() {
    return (
      <>
        <div className="upload-feed-wrapper">
          <div className="upload-header-content-cover">
            <div className="upload-header-content-header-wrapper">
              <div
                className={
                  this.props.view === "photo"
                    ? "upload-header-content-header border-bottom"
                    : "upload-header-content-header"
                }
                onClick={this.props.clickPhoto.bind(this)}
              >
                사진
              </div>
              <div
                className={
                  this.props.view === "music"
                    ? "upload-header-content-header border-bottom"
                    : "upload-header-content-header"
                }
                onClick={this.props.clickMusic.bind(this)}
              >
                곡
              </div>
              <div
                className={
                  this.props.view === "video"
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
                onClick={this.props.uploadClickModal.bind(
                  this,
                  this.props.uploadModal
                )}
              >
                업로드
              </div>
              <div className="upload-main-content-header-next-btn">
                <NavLink
                  className="upload-main-content-header-next"
                  to={`/upload/${
                    this.props.uploadCurrnetSelectAsset
                      ? this.props.uploadCurrnetSelectAsset._id
                      : ""
                  }`}
                >
                  다음
                </NavLink>
              </div>
            </div>
          </div>

          <div className="upload-main-content-list-wrapper">
            {this.props.assets &&
              this.props.assets.map((asset, i) => {
                if (asset.type === this.props.view) {
                  return (
                    <div
                      key={i}
                      className={
                        this.props.uploadCurrnetSelectAsset &&
                        this.props.uploadCurrnetSelectAsset._id === asset._id
                          ? "upload-post select-post"
                          : "upload-post"
                      }
                      data-set={i}
                      onClick={this.props.uploadSelectAsset.bind(this, asset)}
                    >
                      <img
                        className="upload-post-content"
                        src={
                          asset.type === "photo" ? asset.url : asset.cover_url
                        }
                      />
                      {this.props.view !== "photo" ? (
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

        {this.props.uploadModal ? (
          <div className="modal-body-upload">
            <div className="modal-upload-wrapper">
              <div className="modal-upload">
                <div>
                  <div
                    className="close-modal"
                    onClick={this.props.closeModal.bind(this)}
                  >
                    X
                  </div>
                  <div className="upload-wrapper">
                    <div className="input-upload-label">POST UPLOAD</div>
                    <input
                      className="input-upload-form"
                      type="file"
                      name="post_content"
                      ref={this.fileInput}
                    />
                  </div>
                  {this.props.view === "photo" ? (
                    <div></div>
                  ) : (
                    <div className="upload-wrapper">
                      <div className="input-upload-label">COVER UPLOAD</div>
                      <input
                        className="input-upload-form"
                        type="file"
                        name="post_cover"
                        ref={this.fileInput2}
                      />
                    </div>
                  )}
                  <div className="input-errorr">
                    {this.props.uploadInputError}
                  </div>
                  <div className="input-upload-btn-wrapper">
                    <button onClick={
                    this.props.view === "photo"
                      ? e => this.props.uploadPhoto(this)
                      : e=> this.props.uploadMedia(this)
                  } className="input-upload-btn">완료</button>
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

export default Upload;
