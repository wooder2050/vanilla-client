import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./PostDetail.scss";

class PostDetail extends Component {
  render() {
    console.log(this.props);
    return (
      <>
        {this.props.postViewState === "on" ? (
          <div className="post-detail-cover-wrapper">
            <div
              onClick={this.props.closePost.bind(this)}
              className="post-background"
            ></div>
            <div className="post-detail-wrapper">
              <div className="post-detail-content">
                <div className="post-detail-photo-wrapper">
                  <img
                    className="post-detail-photo"
                    src={this.props.currentPost.post_url}
                  />
                </div>
                <div className="post-detail-info-wrapper">
                  <div className="post-detail-info-header">
                    <div className="post-detail-info-profile-wrapper">
                      <img
                        className="post-detail-info-profile"
                        src={this.props.currentPost.profile_url}
                      />
                    </div>
                    <div className="post-detail-info-text-wrapper">
                      <div className="posting-user-id">
                        <NavLink
                          className="posting-user-id-inner"
                          to={`${this.props.currentPost.poster_id}`}
                        >
                          {this.props.currentPost.user_display_name}
                        </NavLink>
                      </div>
                      <div className="posting-location-date">
                        {this.props.currentPost.location}
                        {this.props.currentPost.post_date}
                      </div>
                    </div>
                  </div>
                  <div className="posting-content-text-wrapper">
                    <div className="posting-content-text">
                      <strong className="posting-content-text-id">
                        {this.props.currentPost.user_display_name}
                      </strong>
                      <p className="posting-content-text-description">
                        {this.props.currentPost.description}
                      </p>
                      {this.props.currentPost.tags &&
                        this.props.currentPost.tags.map((tag, i) => {
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
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </>
    );
  }
}

export default PostDetail;
