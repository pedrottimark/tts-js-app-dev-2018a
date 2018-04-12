import React from 'react';

class RadioForm extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  _onChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    const {checked, name, options} = this.props;

    return (
      <form className={name}>
        {
          options.map(({text, value}) => (
            <label key={value}>
              <input
                type="radio"
                name={name}
                value={value}
                checked={value === checked}
                onChange={this._onChange}
              />
              {text}
            </label>
          ))
        }
      </form>
    );
  }
}

export default RadioForm;
