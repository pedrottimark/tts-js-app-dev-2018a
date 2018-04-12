import React from 'react';
import {connect} from 'react-redux';

import './App.css';

import Heading from './Heading';
import LogOffForm from './LogOffForm';
import NameForm from './NameForm';
import RadioForm from './RadioForm';
import TextForm from './TextForm';
import TodoList from './TodoList';

import {
  logOff,
  logOn,
  signUp,
} from './actions';

const completednessOptions = [
  {
    text: 'all',
    value: 'all',
  },
  {
    text: 'not done',
    value: 'uncompleted',
  },
  {
    text: 'done',
    value: 'completed',
  }
];

const sortingOptions = [
  {
    text: 'newer first',
    value: 'newerFirst',
  },
  {
    text: 'older first',
    value: 'olderFirst',
  },
];

class App extends React.Component {
  render() {
    const {doer, loggingOff, loggingOn, signingUp} = this.props;
    const on = doer !== null;

    return (on
      ? <div className="TodoList on">
          <header>
            <div>
              <Heading
                id={doer.id}
                list={doer.list}
              />
            </div>
            <div>
              <TextForm
                name="matching"
                placeholder="text in items to match"
                value={doer.view.matching}
                onChange={() => {}}
              />
              <RadioForm
                name="completedness"
                options={completednessOptions}
                checked={doer.view.completedness}
                onChange={() => {}}
              />
            </div>
            <div>
            </div>
            <div>
              <LogOffForm
                disabled={loggingOff.isSubmitting}
                onClick={this.props.logOff}
              />
            </div>
          </header>
          <main>
            <TodoList
              view={doer.view}
              onDeleteItem={() => {}}
              onToggleCompleted={() => {}}
              list={doer.list}
            />
          </main>
        </div>
      : <div className="TodoList off">
          <header>
            <div>
              <NameForm
                buttonText="Log on"
                name="logOn"
                placeholder="Name of returning doer"
                hasError={loggingOn.error}
                disabled={loggingOn.isSubmitting}
                onSubmit={this.props.logOn}
              />
              <NameForm
                buttonText="Sign up"
                name="signUp"
                placeholder="Name of new doer"
                hasError={signingUp.error}
                disabled={signingUp.isSubmitting}
                onSubmit={this.props.signUp}
              />
            </div>
          </header>
          <main>
          </main>
        </div>
    );
  }
}

// A “connected” component subscribes to relevant parts of state in the Redux store.
const mapStateToProps = ({doer, loggingOff, loggingOn, signingUp}) => ({
  doer,
  loggingOff,
  loggingOn,
  signingUp,
});

const mapDispatchToProps = {
  logOff,
  logOn,
  signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
