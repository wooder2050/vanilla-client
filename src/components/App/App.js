import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import SideHeader from "../SideHeader/SideHeader";
import LoginWrapper from "../Login/LoginWrapper";
import MainFeed from "../MainFeed/MainFeed";
import MyPage from "../MyPage/MyPage";
import Upload from "../Upload/Upload";
import UploadDetail from "../UploadDetail/UploadDetail";
import Search from "../Search/Search";
import UserPage from "../UserPage/UserPage";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      error: null,
      authenticated: false,
      pwdError: null,
      emailError: null,
      assets: null,
      myPosts: null,
      newPosts: null
    };
  }

  componentDidMount() {
    console.log("componentDidMount ", this.state.authenticated);
    fetch("http://localhost:5000/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200 || response.status === 401)
          return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        if (responseJson.authenticated) {
          this.setState({
            authenticated: true,
            user: responseJson.user
          });
        } else {
          this.setState({
            authenticated: false,
            error: responseJson.message
          });
        }
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
    fetch("http://localhost:5000/onload/assets", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to onload asset");
      })
      .then(responseJson => {
        this.setState({
          assets: responseJson.assets
        });
      });

    fetch("http://localhost:5000/onload/myposts", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200 || response.status === 401)
          return response.json();
        throw new Error("failed to onload post");
      })
      .then(responseJson => {
        this.setState({
          myPosts: responseJson.posts
        });
      })
      .catch(error => {});

    fetch("http://localhost:5000/onload/newposts", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200 || response.status === 401)
          return response.json();
        throw new Error("failed to onload post");
      })
      .then(responseJson => {
        this.setState({
          newPosts: responseJson.newPosts
        });
      })
      .catch(error => {});
  }

  logout() {
    fetch("http://localhost:5000/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to logout");
      })
      .then(responseJson => {
        this.setState({
          authenticated: responseJson.authenticated
        });
      });
  }
  render() {
    return (
      <Router>
        <div className="App">
          <div className="body-wrapper">
            <div className="main-feed-wrapper">
              <header>
                <Header
                  authenticated={this.state.authenticated}
                  logout={this.logout.bind(this)}
                />
                <SideHeader user={this.state.user} />
              </header>
              <Switch>
                <Route path="/login" component={LoginWrapper} />
                <Route
                  path="/search"
                  render={routeProps => (
                    <Search
                      user={this.state.user}
                      newPosts={this.state.newPosts}
                      authenticated={this.state.authenticated}
                    />
                  )}
                ></Route>
                <Route
                  path="/mypage/:id"
                  render={routeProps => (
                    <MyPage
                      routeProps={routeProps}
                      user={this.state.user}
                      authenticated={this.state.authenticated}
                    />
                  )}
                />
                <Route
                  path="/upload/:assetId"
                  render={routeProps => (
                    <UploadDetail
                      routeProps={routeProps}
                      user={this.state.user}
                      authenticated={this.state.authenticated}
                    />
                  )}
                ></Route>
                <Route path="/upload">
                  <Upload
                    user={this.state.user}
                    authenticated={this.state.authenticated}
                    assets={this.state.assets}
                  />
                </Route>
                <Route
                  path="/:id"
                  render={routeProps => (
                    <UserPage
                      routeProps={routeProps}
                      user={this.state.user}
                      authenticated={this.state.authenticated}
                    />
                  )}
                />
                <Route eaxct path="/">
                  <MainFeed
                    user={this.state.user}
                    authenticated={this.state.authenticated}
                    posts={this.state.myPosts}
                  />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
