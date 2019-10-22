import React, { Component } from "react";
import "./AboutVanilla.scss";

class AboutVanilla extends Component {
  render() {
    return (
      <div className="about-vanilla">
        <div className="about-vanilla-header">
          <h2 className="about-vanilla-header-greet">환영합니다.</h2>
          <h3 className="about-vanilla-header-info">
            인디 가수의 공연 소식과 정보, 노래를
          </h3>
          <h3 className="about-vanilla-header-info">
            모두 이 곳에서 만날 수 있습니다.
          </h3>
        </div>
        <div className="line-border"></div>
        <div className="about-vanilla-content">
          <div className="about-vanilla-text-wrapper">
            <h2 className="about-vanilla-title">인디 가수들의 음악</h2>
            <h3 className="about-vanilla-text">
              음원과 함께 비발매곡까지 듣기
            </h3>
          </div>
          <div className="about-vanilla-text-wrapper">
            <h2 className="about-vanilla-title">공연 정보</h2>
            <h3 className="about-vanilla-text">
              공연 시기와 공연장 정보 그리고 예매까지
            </h3>
          </div>
          <div className="about-vanilla-text-wrapper">
            <h2 className="about-vanilla-title">공연 영상</h2>
            <h3 className="about-vanilla-text">
              함께 하지 못한 공연의 영상까지 제공
            </h3>
          </div>
          <div className="about-vanilla-text-wrapper">
            <h2 className="about-vanilla-title">인디 가수들의 소소한 일상</h2>
            <h3 className="about-vanilla-text">
              인디 가수들의 일상을 공유합니다.
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutVanilla;
