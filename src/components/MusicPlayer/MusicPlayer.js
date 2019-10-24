import React, { Component } from "react";
import "./MusicPlayer.scss";
import cover from "../../images/ex1.jpg";
import { Progress } from "antd";
import "antd/dist/antd.css";
import play from "../../images/played.png";
import pause from "../../images/pause.png";
import stop from "../../images/stop.png";
import next from "../../images/next.png";
import prev from "../../images/prev.png";
import footerplay from "../../images/footer-play.png";
import footerpause from "../../images/footer-pause.png";
import footerstop from "../../images/footer-stop.png";
import footernext from "../../images/footer-next.png";
import footerprev from "../../images/footer-prev.png";

class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      pause: true,
      duration: "",
      isLive: false,
      curTime: 0,
      startTime: 0
    };
    this.timerId = 0;
    this.url = null;
    this.audio = new Audio(this.url);
  }
  componentDidMount() {
    this.timerId = setInterval(e => {
      this.tick();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  tick() {
    if (this.state.isLive) {
      const v = new Date().getTime();
      this.setState({ curTime: v });
    }
  }
  play() {
    const v = new Date().getTime();
    this.setState({
      play: true,
      pause: false,
      duration: this.audio.duration,
      curTime: v,
      startTime: v,
      isLive: true
    });
    this.audio.play();
  }

  pause() {
    this.audio.pause();
    if (this.state.isLive)
      this.setState({
        isLive: false,
        play: false,
        pause: true,
        curTime: 0,
        startTime: 0
      });
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    if (this.state.isLive)
      this.setState({
        isLive: false,
        play: false,
        pause: true,
        curTime: 0,
        startTime: 0
      });
    this.per = Math.floor(
      (Math.floor(this.audio.currentTime) / Math.floor(this.state.duration)) *
        1000
    );
  }

  render() {
    function getTime(time) {
      if (!isNaN(time)) {
        return (
          Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
      }
    }

    const currentTime = getTime(Math.floor(this.audio.currentTime));
    const per = Math.floor(
      (Math.floor(this.audio.currentTime) / Math.floor(this.state.duration)) *
        1000
    );
    const duration = getTime(this.state.duration);
    const tempStyle = {
      width: `${(per / 10) * 3}px`
    };
    const tempStyle2 = {
      width: `${(per / 10) * 2}px`
    };
    const coverStyle = {
      background: `center / cover no-repeat url(${
        this.props.currentMusic ? this.props.currentMusic.cover_url : cover
      })`
    };
    if (this.props.currentMusic) {
      if (this.url !== this.props.currentMusic.post_url) {
        this.url = this.props.currentMusic.post_url;
        this.audio = new Audio(this.url);
      }
    }
    return (
      <>
        {this.props.musicPlayState === "bodyPlay" ? (
          <div className="main">
            <div
              onClick={this.props.changePlayMode.bind(
                this,
                this.props.musicPlayState
              )}
              className="player-background"
            ></div>
            <div className="player-content-wrapper">
              <div className="player-wrapper">
                <div className="cover">
                  <div
                    onClick={this.props.closeMusicPlayer.bind(this)}
                    className="close-modal"
                  >
                    X
                  </div>
                  <div className="title-cover">
                    <div className="title">{this.props.currentMusic.title}</div>
                  </div>
                  <div className="singer-cover">
                    <div className="singer">
                      {this.props.currentMusic.singer}
                    </div>
                  </div>
                  <div
                    style={coverStyle}
                    className={`cover-img ${
                      this.state.play ? "cover-play" : ""
                    }`}
                  ></div>
                  <Progress
                    type="circle"
                    width="230px"
                    strokeWidth="3"
                    strokeColor={{
                      "0%": "#fee5a5",
                      "100%": "#486d87"
                    }}
                    percent={per / 10}
                  />
                  <div className="play-btn-cover-wrapper">
                    <div className="play-btn-cover">
                      <img className="play-btn" src={prev} />
                    </div>
                    {this.state.play ? (
                      <div
                        className="play-btn-cover"
                        onClick={this.pause.bind(this)}
                      >
                        <img className="play-btn" src={pause} />
                      </div>
                    ) : (
                      <div
                        className="play-btn-cover"
                        onClick={this.play.bind(this)}
                      >
                        <img className="play-btn" src={play} />
                      </div>
                    )}

                    <div
                      className="play-btn-cover"
                      onClick={this.stop.bind(this)}
                    >
                      <img className="play-btn" src={stop} />
                    </div>

                    <div className="play-btn-cover">
                      <img className="play-btn" src={next} />
                    </div>
                  </div>
                  <div className="playing-bar" style={tempStyle}>
                    <div className="playing-ball"></div>
                  </div>
                  <div className="current-time">{currentTime}</div>
                  <div className="duration">{duration}</div>
                  <div className="play-bar"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={
              this.props.musicPlayState === "off"
                ? "footer-wrapper display-none"
                : "footer-wrapper"
            }
          >
            {" "}
            <div
              onClick={this.props.changePlayMode.bind(
                this,
                this.props.musicPlayState
              )}
              className="footer-cover-trigger"
            ></div>
            <div className="footer-cover">
              <div
                style={coverStyle}
                className={`footer-cover-img ${
                  this.state.play ? "cover-play" : ""
                }`}
              ></div>
              <div className="footer-text-cover">
                <div className="footer-title">
                  {this.props.currentMusic ? this.props.currentMusic.title : ""}
                </div>
                <div className="footer-singer">
                  {this.props.currentMusic
                    ? this.props.currentMusic.singer
                    : ""}
                </div>
              </div>

              <div className="footer-play-state-cover">
                <div className="footer-playing-bar" style={tempStyle2}>
                  <div className="footer-playing-ball"></div>
                </div>
                <div className="footer-play-bar"></div>
              </div>

              <div className="footer-btn-cover">
                <div className="footer-play-btn-cover">
                  <img className="footer-play-btn" src={footerprev} />
                </div>
                {this.state.play ? (
                  <div
                    className="footer-play-btn-cover"
                    onClick={this.pause.bind(this)}
                  >
                    <img className="footer-play-btn" src={footerpause} />
                  </div>
                ) : (
                  <div
                    className="footer-play-btn-cover"
                    onClick={this.play.bind(this)}
                  >
                    <img className="footer-play-btn" src={footerplay} />
                  </div>
                )}

                <div
                  className="footer-play-btn-cover"
                  onClick={this.stop.bind(this)}
                >
                  <img className="footer-play-btn" src={footerstop} />
                </div>

                <div className="footer-play-btn-cover">
                  <img className="footer-play-btn" src={footernext} />
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default MusicPlayer;
