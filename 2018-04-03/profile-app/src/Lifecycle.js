import React, { Component, Fragment } from "react";
import Posts from "./Posts"

export default class Lifecycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  getUser(username) {
    fetch(`https://jsonplaceholder.typicode.com/users?username=${
      username
    }`, {
      mode: "cors",
    })
      .then(res => res.json())
      .then(users => users[0])
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
        <h2>{username}</h2>
        <pre>{JSON.stringify(this.state.user, null, 4)}</pre>
        <Posts userId={this.state.user.id}/>
      </Fragment>
    );
  }
}
