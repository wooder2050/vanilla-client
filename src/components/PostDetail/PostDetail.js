import React, { Component } from "react";
import "./PostDetail.scss";

class PostDetail extends Component {
  componentDidMount() {}

  render() {
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
                <img
                  className="post-detail-photo"
                  src={this.props.currentPost.post_url}
                />
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
