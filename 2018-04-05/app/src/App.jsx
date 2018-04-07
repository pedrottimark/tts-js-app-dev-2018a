import React, { Component, Fragment } from "react";
import { Link, Route } from "react-router-dom";

import Profile from "./Profile";
import Home from "./Home";

import Post from "./Post"

const About = props => (
  <Fragment>
    <h1>About</h1>
    <p>{props.message}</p>
  </Fragment>
);

const App = props => (
  <Fragment>
    <ul>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/about"}>About</Link>
      </li>
    </ul>
    <Route
      exact
      path="/"
      render={props => (
        <Home
          onSearch={username => {
            props.history.push(`/profile/${username}`);
          }}
        />
      )}
    />
    {/* <Route path="/about" component={About}/> */}
    <Route
      path="/about"
      render={() => <About message="I'm in a render prop" />}
    />
    <Route
      path="/profile/:username"
      render={props => (
        <Profile
          // Pass display value to Lifecycle component
          username={props.match.params.username}
        />
      )}
    />
    <Route 
      path="/post/:postId"
      render={
        props => (
          <Post postId={props.match.params.postId} />
        )
      }
    />
    {/* <Route
      path="/about"
      children={() => <About message="I'm in a render prop" />}
    /> */}
    {/* <Route path="/" render={props => <pre>{JSON.stringify(props, null, 4)}</pre>}/> */}
  </Fragment>
);

export default App;
