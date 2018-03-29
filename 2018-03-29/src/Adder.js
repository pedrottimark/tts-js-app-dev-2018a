import React from 'react';

class Adder extends React.Component {
  render () {
    return (
      <form className="adder">
        <input
          type="text"
          placeholder="text of new item"
          value={this.state.text}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default Adder;
