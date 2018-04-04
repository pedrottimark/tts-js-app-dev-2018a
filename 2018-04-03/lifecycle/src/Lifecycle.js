import React, { Component, Fragment } from "react";

export default class Lifecycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: `https://jsonplaceholder.typicode.com/albums?userId=${
        props.message
      }`,
      albums: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
      return {
          url: `https://jsonplaceholder.typicode.com/albums?userId=${
            nextProps.message
          }`
      }
  }

  // replaced by constructor()
  componentWillMount() {}

  getAlbums(message) {
    fetch(this.state.url, {
      mode: "cors",
    })
      .then(res => res.json())
      .then(albums => {
        this.setState({
          albums,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.message !== this.props.message) {
      // Update Albums
      this.getAlbums(this.props.message);
    }
  }

  componentDidMount() {
    const { message } = this.props;
    this.getAlbums(message);
  }

  render() {
    const { message } = this.props;

    return (
      <Fragment>
        <h2>{message}</h2>
        <pre>{JSON.stringify(this.state.albums, null, 4)}</pre>
      </Fragment>
    );
  }
}
