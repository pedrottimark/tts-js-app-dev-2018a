import React, { Component, Fragment } from "react";

export default class Posts extends Component {
  constructor() {
    super();
    this.state = {
      albums: [],
    };
  }

  getAlbums(userId) {
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`, {
      mode: "cors",
    })
      .then(res => res.json())
      .then(albums => {
        this.setState({ albums });
      });
  }

  componentDidMount(){
      this.getAlbums(this.props.userId);
  }

  componentDidUpdate(prevProps){
    if(prevProps.userId !== this.props.userId){
        this.getAlbums(this.props.userId);
    }
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
