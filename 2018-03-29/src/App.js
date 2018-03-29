import React from 'react';
import classNames from 'classnames';

import './App.css';

import CompletednessFilter from './CompletednessFilter';
import Heading from './Heading';
import LogOffButton from './LogOffButton';
import NameForm from './NameForm';
import TodoList from './TodoList';

import {getDoer, postDoer, putDoer} from './fetch';
import {} from './logic';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doer: null,
      logOn: {
        value: '',
        hasError: false,
        isSubmitting: false,
      },
      signUp: {
        value: '',
        hasError: false,
        isSubmitting: false,
      },
    };

    this.onLogOn = this.onLogOn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onLogOff = this.onLogOff.bind(this);
  }

  onLogOn(value) {
    this.setState({
      logOn: {
        isSubmitting: true,
        value,
      },
    });

    getDoer(
      value,
      (doer) => {
        console.info('onLogOn', doer);
        this.setState({
          doer,
          logOn: {
            hasError: false,
            isSubmitting: false,
            value: '',
          }
        });
      },
      () => {
        console.info('onLogOn name does not exist', value);
        this.setState({
          logOn: {
            hasError: true,
            isSubmitting: false,
            value,
          }
        })
      }
    );
  }

  onSignUp(value) {
    this.setState({
      signUp: {
        isSubmitting: true,
        value,
      },
    });

    getDoer(
      value,
      () => {
        console.info('onSignUp name already exists', value);
        this.setState({
          signUp: {
            hasError: true,
            isSubmitting: false,
            value,
          }
        })
      },
      () => {
        const doer = {
          id: value,
          completedness: 'all',
          todos: [],
        };

        postDoer(
          doer,
          (response) => {
            console.info('onSignUp success: ' + response.ok);
            this.setState({
              doer,
              signUp: {
                hasError: false,
                isSubmitting: false,
                value: '',
              }
            });
          },
          (error) => {
            console.error('onSignUp failure: ' + error.message);
            this.setState({
              signUp: {
                hasError: true,
                isSubmitting: false,
              },
            })
          }
        );
      }
    );
  }

  onLogOff() {
    console.info('onLogOff', this.state.doer.id);
    this.setState({
      doer: null,
    });
  }

  render() {
    const {doer, logOn, signUp} = this.state;
    const on = doer !== null;
    const className = classNames({TodoList: true, on})

    return (on
      ? <div className={className}>
          <header>
            <div>
              <Heading
                id={doer.id}
                todos={doer.todos}
              />
              <CompletednessFilter
                completedness={doer.completedness}
              />
            </div>
            <div>
              <LogOffButton onClick={this.onLogOff} />
            </div>
          </header>
          <main>
            <TodoList
              completedness={doer.completedness}
              todos={doer.todos}
            />
          </main>
        </div>
      : <div className={className}>
          <header>
            <div>
            </div>
            <div>
              <NameForm
                buttonText="Log On"
                name="logOn"
                placeholder="Name of returning doer"
                hasError={logOn.hasError}
                isSubmitting={logOn.isSubmitting}
                onSubmit={this.onLogOn}
              />
              <NameForm
                buttonText="Sign Up"
                name="signUp"
                placeholder="Name of new doer"
                hasError={signUp.hasError}
                isSubmitting={signUp.isSubmitting}
                onSubmit={this.onSignUp}
              />
            </div>
          </header>
          <main>
            <svg viewBox="0 0 15 12"><polyline points="2 7 5 10 13 2" fill="none" stroke="hsl(165,100%,40%)" strokeWidth="1"/></svg>
          </main>
        </div>
    );
  }
}

export default App;
