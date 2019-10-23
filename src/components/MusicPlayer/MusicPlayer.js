import React, { Component } from "react";
import "./MusicPlayer.scss";
import mp from "../../images/경제환 - 니가 돌아올 희망은 없다는 걸 알아 official MV.mp3";
import cover from "../../images/ex1.jpg";
import { Progress } from "antd";
import "antd/dist/antd.css";

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
    this.url = mp;
    this.audio = new Audio(this.url);
  }

  componentDidMount() {
    this.timerId = setInterval(e => {
      this.tick();
    }, 1000);
    console.log(
      "componentDidMount : ",
      this.state.startTime,
      this.state.curTime,
      this.audio.currentTime
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
    console.log(
      "componentWillUnmount : ",
      this.state.startTime,
      this.state.curTime,
      this.audio.currentTime
    );
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
    console.log(
      "play : ",
      this.state.startTime,
      this.state.curTime,
      this.audio.currentTime
    );
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
    console.log(
      "pause : ",
      this.state.startTime,
      this.state.curTime,
      this.audio.currentTime
    );
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
    console.log(
      "stop : ",
      this.state.startTime,
      this.state.curTime,
      this.audio.currentTime,
      this.state.duration
    );
  }

  render() {
    console.log(
      "render : ",
      this.state.startTime,
      this.state.curTime,
      this.audio.currentTime,
      this.state.duration
    );

    function getTime(time) {
      if (!isNaN(time)) {
        return (
          Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
      }
    }
    var lyricsText = [
      {
        text: "[Intro: Polina]",
        timeIn: "00:00.00",
        duration: 460
      },
      {
        text:
          "Tell me where to go, tell me what to do, I'll be right there for you",
        timeIn: "00:00.46",
        duration: 5500
      },
      {
        text:
          "Tell me what to say, no matter if it's true, I'll say it all for you",
        timeIn: "00:05.96",
        duration: 6940
      }
    ];

    const currentTime = getTime(Math.floor(this.audio.currentTime));
    const per = Math.floor(
      (Math.floor(this.audio.currentTime) / Math.floor(this.state.duration)) *
        1000
    );
    const duration = getTime(this.state.duration);
    const tempStyle = {
      position: "absolute",
      top: "350px",
      left: "100px",
      width: `${(per / 10) * 2}px`,
      height: "10px",
      background: "orange",
      zIndex: "2"
    };
    const tempStyle2 = {
      position: "absolute",
      top: "-2px",
      right: "-5px",
      width: "10px",
      height: "10px",
      background: "white",
      border: "2px solid blue",
      borderRadius: "5px",
      zIndex: "3"
    };
    const coverStyle = {
      background: `center / cover no-repeat url(${cover})`
    };
    return (
      <>
        <div className="player-background"></div>
        <div className="player-content-wrapper">
          <div className="player-wrapper">
            <div className="cover">
              <div
                style={coverStyle}
                className={`cover-img ${this.state.play ? "cover-play" : ""}`}
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
              <div>
                {currentTime}/{duration}
              </div>
              {per ? per / 10 : ""}
              <br></br>
              <button onClick={this.play.bind(this)}>Play</button>
              <button onClick={this.pause.bind(this)}>Pause</button>
              <button onClick={this.stop.bind(this)}>Stop</button>
              <button>Prev</button>
              <button>Next</button>
              <div style={tempStyle}>
                <div style={tempStyle2}></div>
              </div>
              <div className="play-bar"></div>

              <div></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MusicPlayer;
