import React, { Component } from "react";
import "./Register.scss";
import icon from "../../images/Google-Plus-icon.png";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register_user: {},
      register_error: null,
      register_authenticated: false,
      register_pwdError: null,
      register_emailError: null
    };
  }

  verification(event) {
    event.preventDefault();
    const email = event.target.username.value;
    const password = event.target.password.value;
    const password2 = event.target.password2.value;
    const user_name = event.target.user_name.value;
    var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var passRule = /^[A-Za-z0-9]{6,12}$/;
    if (email.match(emailRule) === null) {
      this.setState({
        emailError: "Email is invalid"
      });
    } else if (password.match(passRule) === null) {
      this.setState({
        pwdError: "Password is invalid."
      });
    } else {
      this.setState({
        emailError: null,
        pwdError: null
      });
      fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({
          email: email,
          password: password,
          password2: password2,
          user_name: user_name
        })
      })
        .then(response => {
          if (response.status === 200 || response.status === 401)
            return response.json();
          throw new Error("failed to authenticate user");
        })
        .then(responseJson => {
          if (responseJson.register_user) {
            this.props.movePage("login");
            this.setState({
              register_authenticated: true,
              register_user: responseJson.register_user,
              register_emailError: null,
              register_pwdError: null
            });
          } else {
            if (responseJson.register_emailError) {
              this.setState({
                register_authenticated: false,
                register_emailError: responseJson.register_emailError
              });
            } else {
              this.setState({
                register_authenticated: false,
                register_pwdError: responseJson.register_pwdError
              });
            }
          }
        })
        .catch(error => {
          this.setState({
            register_authenticated: false,
            register_error: "Failed to authenticate user"
          });
        });
    }
  }
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
          <form onSubmit={this.verification.bind(this)}>
            <div className="email-text-wrapper">
              <div className="input-error">
                {this.state.register_emailError}
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
              <div className="input-error">{this.state.register_pwdError}</div>
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
