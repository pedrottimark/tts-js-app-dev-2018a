import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.whatever = "Hey";
    this.state = {
      firstName: "Matt",
      lastName: "Stegall",
      age: 22,
      friends: [
        {
          name: "Friend1",
        },
        {
          name: "Friend2",
        },
      ],
    };
  }

  render() {
    const { age, firstName, lastName } = this.state;

    const canDrink = age >= 21;
    const canDrive = age >= 16;

    return (
      <div>
        <p>
          {this.whatever}, My name is {firstName} {lastName}, I'm {age}
        </p>
        <ul>
          {/* DON'T DO THIS, TOO CLEVER */}
          <li>I can{!canDrink && "'t"} drink</li>
          {canDrive ? <li>I can drive</li> : <li>I can't drive</li>}
          {canDrink &&
            canDrive && (
              <li
                style={{
                  color: `#${Math.floor(Math.random() * 65536).toString(16)}`,
                  fontSize: 25 * 3 + "px",
                }}
              >
                But not at the same time
              </li>
            )}
        </ul>
        <p>Friends</p>
        <ul>{this.state.friends.map(friend => <li key={friend.name}>{friend.name}</li>)}</ul>
        <ul>
          <li className="blue">Red</li>
          <li className="red">Green</li>
          <li className="green">Blue</li>
        </ul>
      </div>
    );
  }
}

export default App;
