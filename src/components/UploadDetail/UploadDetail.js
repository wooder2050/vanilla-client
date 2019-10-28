import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./UploadDetail.scss";
import "antd/dist/antd.css";

class UploadDetail extends Component {
  constructor(props) {
    super(props);
    this.infoInput = React.createRef();
    this.singerInput = React.createRef();
    this.titleInput = React.createRef();
    this.makerInput = React.createRef();
    this.locationInput = React.createRef();
    this.tagInput = React.createRef();
  }
  render() {
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
              {this.props.view === "photo" ? (
                <div className="upload-detail-main-content-cover">
                  <div className="upload-detail-main-content-cover-wrapper">
                    {this.props.uploadCurrnetSelectAsset ? (
                      <div className="content-wrapper">
                        <img
                          className="upload-detail-main-content"
                          src={this.props.uploadCurrnetSelectAsset.url}
                        />
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div className="upload-detail-main-content-text">
                      메인 컨텐츠
                    </div>
                  </div>
                </div>
              ) : (
                <div className="upload-detail-main-content-cover">
                  <div className="upload-detail-main-content-cover-wrapper">
                    {this.props.uploadCurrnetSelectAsset ? (
                      <div className="content-wrapper-video">
                        {this.props.view === "video" ? (
                          <video
                            src={this.props.uploadCurrnetSelectAsset.url}
                            width="280"
                            height="280"
                            autoPlay
                            controls
                          ></video>
                        ) : (
                          <>
                            <img
                              className={"upload-audio-cover"}
                              src={
                                this.props.uploadCurrnetSelectAsset.cover_url
                              }
                            />
                            <audio
                              src={this.props.uploadCurrnetSelectAsset.url}
                              width="250"
                              type="audio/mp3"
                              controls
                            ></audio>
                          </>
                        )}
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div className="upload-detail-main-content-text">
                      메인 컨텐츠
                    </div>
                  </div>
                  <div className="upload-detail-main-content-cover-wrapper">
                    {this.props.uploadCurrnetSelectAsset ? (
                      <div className="content-wrapper">
                        <img
                          className="upload-detail-main-content-cover"
                          src={this.props.uploadCurrnetSelectAsset.cover_url}
                        />
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div className="upload-detail-main-content-text">커버</div>
                  </div>
                </div>
              )}

              <div className="upload-detail-main-content-input-form-cover">
                <div className="input-error">
                  {this.props.uploadDetailInputError}
                </div>
                <div>
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
                        ref={this.infoInput}
                      />
                    </div>
                  </div>
                  {this.props.view === "music" ? (
                    <>
                      <div className="input-cover-wrapper">
                        <div className="text-wrapper">
                          <label className="text">가수</label>
                        </div>
                        <div className="input-wrapper">
                          <input
                            className="input-description-form"
                            type="text"
                            name="singer"
                            placeholder="가수를 입력해주세요."
                            ref={this.singerInput}
                          />
                        </div>
                      </div>
                      <div className="input-cover-wrapper">
                        <div className="text-wrapper">
                          <label className="text">노래 제목</label>
                        </div>
                        <div className="input-wrapper">
                          <input
                            className="input-description-form"
                            type="text"
                            name="title"
                            placeholder="노래 제목을 입력해주세요."
                            ref={this.titleInput}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
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
                        ref={this.makerInput}
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
                        ref={this.locationInput}
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
                        ref={this.tagInput}
                      />
                    </div>
                  </div>
                  <div className="input-btn-wrapper">
                    <button
                      onClick={
                        this.props.view === "music"
                          ? e => this.props.postingMusic(this)
                          : e => this.props.posting(this)
                      }
                      className="input-btn"
                    >
                      공유하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UploadDetail;
