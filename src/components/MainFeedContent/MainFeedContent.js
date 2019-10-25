import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./MainFeedContent.scss";
import like from "../../images/like.png";
import comment from "../../images/comment.png";
import bookmark from "../../images/bookmark.png";

class MainFeedContent extends Component {
  render() {
    return (
      <>
        {this.props.authenticated ? (
          <>
            {this.props.followingPosts &&
              this.props.followingPosts.map((post, i) => {
                return (
                  <div key={i} className="main-feed-content-wrapper">
                    {this.props.posts && (
                      <>
                        <div className="posting-header-wrapper">
                          <div className="posting-profile-wrapper">
                            <img
                              className="posting-profile"
                              src={post.profile_url}
                            />
                          </div>
                          <div className="posting-text-wrapper">
                            <div className="posting-user-id">
                              <NavLink
                                className="posting-user-id-inner"
                                to={`${post.poster_id}`}
                              >
                                {post.user_display_name}
                              </NavLink>
                            </div>
                            <div className="posting-location-date">
                              {post.location}, {post.post_date}
                            </div>
                          </div>
                          <div className="posting-option-wrapper">
                            <div className="postion-option"></div>
                            <div className="postion-option"></div>
                            <div className="postion-option"></div>
                          </div>
                        </div>
                        {post.post_type === "video" ? (
                          <div className="posting-content-video-cover">
                            <video
                              className="posting-content-video"
                              src={post.post_url}
                              width="500"
                              height="300"
                              controls
                            ></video>
                          </div>
                        ) : (
                          <div className="posting-content-cover">
                            {post.post_type === "music" ? (
                              <img
                                onClick={this.props.startMusicPlayer.bind(
                                  this,
                                  post
                                )}
                                className="posting-content"
                                src={post.cover_url}
                              />
                            ) : (
                              <img
                                onClick={this.props.clickPost.bind(this, post)}
                                className="posting-content"
                                src={post.post_url}
                              />
                            )}
                          </div>
                        )}

                        <div className="posting-like-comments-wrapper">
                          <div className="posting-like-wrapper">
                            <img className="posting-like" src={like} />
                            <p className="posting-text">1,200개</p>
                          </div>
                          <div className="posting-like-wrapper">
                            <img className="posting-like" src={comment} />
                            <p className="posting-text">1,200개</p>
                          </div>
                          <div className="posting-bookmark-wrapper">
                            <img className="posting-bookmark" src={bookmark} />
                          </div>
                        </div>
                        <div className="posting-content-text-wrapper">
                          <div className="posting-content-text">
                            <strong className="posting-content-text-id">
                              {post.user_display_name}
                            </strong>
                            <p className="posting-content-text-description">
                              {post.description}
                            </p>

                            {post.tags &&
                              post.tags.map((tag, i) => {
                                return (
                                  <p
                                    key={i}
                                    className="posting-content-tags"
                                    data-set={i}
                                  >
                                    {tag}
                                  </p>
                                );
                              })}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
          </>
        ) : (
          <div className="main-feed-content-wrapper">로그인이 필요합니다.</div>
        )}
      </>
    );
  }
}

export default MainFeedContent;
