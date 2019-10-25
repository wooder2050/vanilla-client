import React, { Component } from "react";
import "./Register.scss";
import icon from "../../images/Google-Plus-icon.png";

class Register extends Component {
  render() {
    return (
      <div className="login-session">
        <h1 className="logo">VANILLA</h1>
        <div className="login-register-header">
          <div className="login-text-wrapper">
            <p className="login-text1">
              <a
                className="login-text-inner1"
                onClick={this.props.movePage.bind(this, "login")}
              >
                로그인
              </a>
            </p>
          </div>
          <div className="register-text-wrapper">
            <p className="register-text2">회원가입</p>
          </div>
        </div>
        <div className="form-wrapper">
          <form onSubmit={this.props.verification.bind(this)}>
            <div className="email-text-wrapper">
              <div className="input-error">
                {this.props.emailError}
              </div>
              <label className="email-text">이메일을 입력하세요</label>
            </div>
            <div className="email-input-wrapper">
              <input
                className="input-email-form"
                type="text"
                name="username"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="email-text-wrapper">
              <div className="input-error">{this.props.pwdError}</div>
              <label className="email-text">
                비밀번호를 입력하세요 (6자 이상)
              </label>
            </div>
            <div className="email-input-wrapper">
              <input
                className="input-email-form"
                type="password"
                name="password"
                placeholder="ex)12abc34"
              />
            </div>
            <div className="email-text-wrapper">
              <label className="email-text">
                비밀번호를 다시 한 번 입력하세요
              </label>
            </div>
            <div className="email-input-wrapper">
              <input
                className="input-email-form"
                type="password"
                name="password2"
                placeholder="ex)12abc34"
              />
            </div>
            <div className="email-text-wrapper">
              <label className="email-text">닉네임을 입력하세요</label>
            </div>
            <div className="email-input-wrapper">
              <input
                className="input-email-form"
                type="text"
                name="user_name"
                placeholder="ex)바닐라똥코드"
                data-parse="uppercase"
              />
            </div>
            <div className="input-email-btn-wrapper">
              <button className="input-email-btn">이메일로 가입하기</button>
            </div>
          </form>
        </div>
        <div className="sns-border">
          <div className="sns-border-text">SNS계정으로 시작하기</div>
        </div>
        <div className="input-google-wrapper">
          <a
            className="input-google-text"
            href="http://localhost:5000/login/google"
          >
            <img className="google-logo" src={icon} />
            구글로 로그인하기
          </a>
        </div>
        <div className="input-google-wrapper">
          <a className="input-google-text" href="/login/google">
            <img className="google-logo" src={icon} />
            카카오로 로그인하기
          </a>
        </div>
      </div>
    );
  }
}

export default Register;
