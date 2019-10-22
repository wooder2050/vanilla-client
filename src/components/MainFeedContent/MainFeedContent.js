import React, { Component } from "react";
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
            {this.props.posts &&
              this.props.posts.map((post, i) => {
                return (
                  <div className="main-feed-content-wrapper">
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
                              {post.user_display_name}
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
                        <div className="posting-content-cover">
                          <img
                            className="posting-content"
                            src={post.cover_url}
                          />
                        </div>
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
