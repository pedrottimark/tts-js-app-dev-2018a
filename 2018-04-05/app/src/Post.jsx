import React, { Component, Fragment } from "react";

export default class Posts extends Component {
  constructor() {
    super();
    this.state = {
      post: {},
      comments: [],
    };
  }

  getPost(postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts?id=${postId}`, {
      mode: "cors",
    })
      .then(res => res.json())
      .then(posts => posts[0])
      .then(post => {
        this.setState({
          post,
        });
      });
  }

  getComments(postId) {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`, {
      mode: "cors",
    })
      .then(res => res.json())
      .then(comments => {
        this.setState({
          comments,
        });
      });
  }

  componentDidMount() {
    this.getPost(this.props.postId);
    this.getComments(this.props.postId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.postId !== this.props.postId) {
      this.getPost(this.props.postId);
      this.getComments(this.props.postId);
    }
  }

  render() {
    return (
      <Fragment>
        <h3>Post {this.props.postId}</h3>
        <h4>{this.state.post.title}</h4>
        <p>{this.state.post.body}</p>
        <h5>Comments</h5>
        <ul>
          {this.state.comments.map(comment => (
            <li key={comment.id}>
              <strong>{comment.name}:</strong>
              {comment.body}
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}
