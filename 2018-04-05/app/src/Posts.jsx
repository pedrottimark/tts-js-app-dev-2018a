import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  getPosts(userId) {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {
      mode: "cors",
    })
      .then(res => res.json())
      .then(posts => {
        this.setState({
          posts,
        });
      });
  }

  componentDidMount() {
    this.getPosts(this.props.userId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.getPosts(this.props.userId);
    }
  }

  render() {
    return (
      <Fragment>
        <h3>Posts</h3>
        <ul>
          {this.state.posts.map(post => (
            <li key={post.id}>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}
