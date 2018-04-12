import React from 'react';

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onChange(event) {
    const text = event.target.value;
    this.setState({text});
  }

  _onSubmit(event) {
    event.preventDefault();
    this.props.onAddItem(this.state.text);
    this.setState({text: ''});
  }

  render () {
    return (
      <form className="adder" onSubmit={this._onSubmit}>
        <input
          type="text"
          placeholder="text of new item"
          value={this.state.text}
          onChange={this._onChange}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default ItemForm;
