import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./Search.scss";
import search from "../../images/search.png";
import profile from "../../images/profile.png";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_error: null,
      users: [],
      searchState: false
    };
  }
  searchUser(event) {
    event.preventDefault();
    const username = event.target.username.value;
    if (username === "") {
      this.setState({
        search_error: "Please enter at least 2 characters."
      });
    } else {
      this.setState({
        search_error: null
      });
      fetch(`http://localhost:5000/search/${username}`, {
        method: "GET",
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
          this.setState({
            users: responseJson.users,
            searchState: true
          });
        })
        .catch(error => {});
    }
  }
  changeSearchState() {
    this.setState({
      searchState: false
    });
  }
  render() {
    return (
      <div
        className="search-page-content-wrapper"
        onClick={this.changeSearchState.bind(this)}
      >
        <div className="search-page-header-wrapper">
          <form onSubmit={this.searchUser.bind(this)}>
            <div className="search-bar-wrapper">
              <div className="search-icon-wrapper">
                <img className="search-icon" src={search} />
              </div>
              <input
                className="search-bar"
                placeholder="Search a user"
                name="username"
              />
            </div>
            <div className="search-bar-btn-wrapper">
              <button type="submit" className="search-bar-btn">
                검색
              </button>
            </div>
          </form>
          <div className="search-bar-error-wrapper">
            <div className="search-bar-error">{this.state.search_error}</div>
          </div>
        </div>
        <div className="search-page-content-wraper">
          <div
            className={
              this.state.searchState
                ? "search-page-result-wraper display"
                : "search-page-result-wraper"
            }
          >
            {this.state.users.map((user, i) => {
              return (
                <NavLink
                  className="search-page-result-user-wrapper"
                  to={`${user._id}`}
                >
                  <div className="search-page-result-user-profile-wrapper">
                    <img
                      className="search-page-result-user-profile"
                      src={user.profile_url ? user.profile_url : profile}
                    />
                  </div>
                  <div className="search-page-result-user-text-wrapper">
                    <strong className="search-page-result-user-id">
                      {user.user_display_name
                        ? user.user_display_name
                        : user.email}
                    </strong>
                    {user.user_name}
                  </div>
                </NavLink>
              );
            })}
          </div>
          <div className="search-page-content-cover">
            {this.props.newPosts ? (
              this.props.newPosts.map((post, i) => {
                if (post.post_type === "music") {
                  return (
                    <div
                      key={i}
                      onClick={this.props.startMusicPlayer.bind(this, post)}
                      className="search-page-content-box"
                    >
                      <img
                        className="search-page-content"
                        src={post.cover_url}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={i} className="search-page-content-box">
                      <img
                        className="search-page-content"
                        src={
                          post.post_type === "photo"
                            ? post.post_url
                            : post.cover_url
                        }
                      />
                    </div>
                  );
                }
              })
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
