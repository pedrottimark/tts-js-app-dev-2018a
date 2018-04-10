import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      messages: [],
      backgroundColor: "black",
      color: "green",
      colorInput: "",
      backgroundColorInput: "",
    }
  }

  componentDidMount() {
    const { dbRef } = this.props;

    dbRef.child("message").on("value", (snapshot) => {
      this.setState({
        message: snapshot.val()
      })
    })
    dbRef.child("color").on("value", (snapshot) => {
      this.setState({
        color: snapshot.val()
      })
    })
    dbRef.child("backgroundColor").on("value", (snapshot) => {
      this.setState({
        backgroundColor: snapshot.val()
      })
    })
    dbRef.child("messages").on("child_added", (snapshot) => {

      this.setState(oldState => {
        return ({
          messages: [...oldState.messages, snapshot.val()],
        })
      })
    })
  }

  onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  }

  onClick = () => {
    const { dbRef } = this.props;

    dbRef.update({
      backgroundColor: this.state.backgroundColorInput,
      color: this.state.colorInput,
    });
  }

  sendMessage = () => {
    const { dbRef } = this.props;
    const message = this.state.newMessage;

    dbRef.child("messages").push(message)
  }

  render() {
    return (
      <div className="App">
        <h1>React Firebase</h1>
        <input type="text" value={this.state.newMessage} onChange={this.onChange} name="newMessage" />
        <button onClick={this.sendMessage}>Send</button>
        {/* <p>{this.state.message}</p> */}
        {/* {/* <input type="text" value={this.state.backgroundColorInput} onChange={this.onChange} name="backgroundColorInput" /> */}
        {/* <input type="text" value={this.state.colorInput} onChange={this.onChange} name="colorInput"/>
        <button onClick={this.onClick}>Send</button> */}
        {/* <div style={{
          height: "500px",
          width: "500px",
          backgroundColor: this.state.backgroundColor
        }}>
          <h1 style={{color:this.state.color}}>This is a preview</h1>
        </div> */}
        <h6>messages</h6>
        <ul>
          {this.state.messages.map(message => <li key={message} >{message}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
