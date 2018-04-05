import React, {Component} from "react"

import Profile from "./Profile";

// Create a stateful react component by inheriting from Component
export default class Home extends Component {
    // Intial component setup
  constructor() {
    // Calls the Component constructor (always required)
    super();
    // set the initial state
    this.state = {
      inputValue: "",
      displayValue: "",
    };
    // Setting our callback contexts
    this.onSet = this.onSet.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  // Sets display value to input value
  onSet() {
    // Async setState signature (uses a function)
    this.setState(prevState => ({
      displayValue: prevState.inputValue,
    }));
  }

  onChange(event) {
    // Dereferencing the event value (makes it more constant/immutable);
    // the event value may change
    const value = event.target.value;

    this.setState({
      inputValue: value,
    });
  }

  render() {
    return (
      <div>
        <h1>JSON Users</h1>
        <input
          type="text"
          // setting the textbox value to our state value
          value={this.state.inputValue}
          // updates state when the user types
          onChange={this.onChange}
        />
        <button
          // Triggers inputValue -> displayValue
          onClick={this.onSet}
        >
          Look Up User
        </button>
        <Profile
          // Pass display value to Lifecycle component
          username={this.state.displayValue}
        />
      </div>
    );
  }
}