import React, { Component, Fragment } from "react";

export default class Posts extends Component {
  constructor() {
    super();
    this.state = {
      albums: [],
    };
  }

  render() {
    return (
      <Fragment>
        <h3>Albums</h3>
        <ul>
          {this.state.albums.map(album => (
            <li key={album.id}>{album.title}</li>
          ))}
        </ul>
      </Fragment>
    );
  }
}
