import React from 'react';

const name = 'completedness';
const values = ['all', 'uncompleted', 'completed'];

class CompletednessFilter extends React.Component {
  render() {
    const {completedness} = this.props;

    return (
      <form className={name}>
        {
          values.map((value) => (
            <label key={value}>
              <input
                type="radio"
                name={name}
                value={value}
                checked={value === completedness}
              />
              {value}
            </label>
          ))
        }
      </form>
    );
  }
}

export default CompletednessFilter;
