import React, { Component } from "react";
import "./MainFeed.scss";
import StoryFeed from "../StoryFeed/StoryFeed";
import RecommendFeed from "../RecommendFeed/RecommendFeed";
import Profile from "../Profile/Profile";
import MainFeedContent from "../MainFeedContent/MainFeedContent";

class MainFeed extends Component {
  render() {
    return (
      <>
        <div className="main-feed-component-wrapper">
          <div className="main-feed-component-scroll">
            <MainFeedContent
              followingPosts={this.props.followingPosts}
              posts={this.props.posts}
              authenticated={this.props.authenticated}
            />
          </div>
        </div>
        {this.props.authenticated ? (
          <div className="side-feed-content-wrapper">
            <Profile user={this.props.user} />
            <StoryFeed
              user={this.props.user}
              followingUsers={this.props.followingUsers}
            />
            <RecommendFeed user={this.props.user} />
          </div>
        ) : (
          <div></div>
        )}
      </>
    );
  }
}

export default MainFeed;
