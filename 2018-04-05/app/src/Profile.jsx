import React, { Component, Fragment } from "react";
import Posts from "./Posts";
import Albums from "./Albums";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  getUser(username) {
    fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`, {
      mode: "cors",
    })
      .then(res => res.json())
      .then(users => users[0] || {})
      .then(user => {
        this.setState({
          user,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.username !== this.props.username) {
      // Update user
      this.getUser(this.props.username);
    }
  }

  render() {
    const { username } = this.props;

    return (
      <Fragment>
        <h1>{this.state.user.name}</h1>
        <h2>
          {username}: {this.state.user.email}
        </h2>

        {this.state.user.id && (
          <Fragment>
            <Posts userId={this.state.user.id} />
            <Albums userId={this.state.user.id} />
          </Fragment>
        )}
      </Fragment>
    );
  }
}
