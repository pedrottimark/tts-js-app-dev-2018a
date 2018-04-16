import React from 'react';
import classNames from 'classnames';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onChange(event) {
    this.setState({value: event.target.value});
  }

  _onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
  }

  render() {
    const {buttonText, name, placeholder, hasError, disabled} = this.props;
    const {value} = this.state;

    const className = classNames({
      [name]: true,
      error: hasError,
    });

    return (
      <form className={className} onSubmit={this._onSubmit}>
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          pattern="\w+"
          title="one or more alphanumeric characters including underscore"
          disabled={disabled}
          onChange={this._onChange}
          value={value}
        />
        <button disabled={disabled} type="submit">{buttonText}</button>
      </form>
    );
  }
}

export default NameForm;
