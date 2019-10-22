import React, { Component } from "react";
import "./MainFeed.scss";
import StoryFeed from "../StoryFeed/StoryFeed";
import RecommendFeed from "../RecommendFeed/RecommendFeed";
import Profile from "../Profile/Profile";
import MainFeedContent from "../MainFeedContent/MainFeedContent";

class MainFeed extends Component {
  render() {
    console.log(this.props.posts);
    return (
      <>
        <div className="main-feed-component-wrapper">
          <div className="main-feed-component-scroll">
            <MainFeedContent
              posts={this.props.posts}
              authenticated={this.props.authenticated}
            />
          </div>
        </div>
        {this.props.authenticated ? (
          <div className="side-feed-content-wrapper">
            <Profile user={this.props.user} />
            <StoryFeed user={this.props.user} />
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
