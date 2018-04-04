import React, { Component, Fragment } from "react";

export default class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  getPosts(userId) {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${
      userId
    }`, {
      mode: "cors",
    })
      .then(res => res.json())
      .then(posts => {
        this.setState({
          posts,
        });
      });
  }

  componentDidUpdate(prevProps){
      if(prevProps.userId !== this.props.userId){
          this.getPosts(this.props.userId)
      }
  }

  render() {
    return (
      <Fragment>
        <h4>{this.props.userId}</h4>
        <pre>{JSON.stringify(this.state.posts)}</pre>
      </Fragment>
    );
  }
}
