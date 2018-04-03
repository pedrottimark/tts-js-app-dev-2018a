import React, { Component } from "react";

import Lifecyle from "./Lifecycle";

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: "2",
      displayValue: 1,
    };
    this.onSet = this.onSet.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSet() {
    this.setState(prevState => ({
      displayValue: prevState.inputValue,
    }));
  }

  onChange(event) {
    const value = event.target.value;

    if (Number(value) < 11) {
      this.setState({
        inputValue: value,
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Lifecycle demo</h1>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.onChange}
        />
        <button onClick={this.onSet}>Set Display</button>
        <Lifecyle message={this.state.displayValue} />
      </div>
    );
  }
}

export default App;
