import React from 'react';

class TextForm extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  _onChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    const {name, placeholder, value} = this.props;

    return (
      <form className={name}>
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          onChange={this._onChange}
          value={value}
        />
      </form>
    );
  }
}

export default TextForm;
