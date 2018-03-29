# Lesson 16: React, part 2

Before we learn and practice more about React, let’s pause to remember the big picture.

To add a new feature to a Web or mobile application, you might change any of the following:

* markup
* style
* data for state
* code for logic
* code for interaction is the subject of this lesson

## Create a React application

1. Only if you **did not already** install it for last lesson: `npm install --global create-react-app`

2. Change to a directory which will be the **parent** of a new application directory

3. Create the new application directory: `create-react-app todo-react-2`

4. Change to the **child** directory: `cd todo-react-2`

5. Install dependencies: `npm install --save classnames`

6. Copy files **from** your clone of the class repository **to** the new application:

    * Command prompt in Microsoft Windows:

        ```sh
        mkdir db
        copy path_to_your_clone/tts-js-app-dev-2018a/2018-03-29/db/db.json db

        copy path_to_your_clone/tts-js-app-dev-2018a/2018-03-29/src/*.* src
        ```

    * Shell in Linux or Terminal in Apple macOS:

        ```sh
        mkdir db
        cp path_to_your_clone/tts-js-app-dev-2018a/2018-03-29/db/db.json db

        cp path_to_your_clone/tts-js-app-dev-2018a/2018-03-29/src/*.* src
        ```

7. Open the `todo-react-2` directory in your code editor

8. Open the `package.json` file, edit as follows, and then save your changes:

    * For the development server to pass requests to and responses from the data server, paste a property: `"proxy": "http://localhost:3001",`

    * To start a data server, paste a property within the `"scripts"` object: `"server": "json-server --port 3001 --watch ./db/db.json",`

9. In the first Command Prompt, Shell, or Terminal window, start the data server: `npm run server`

10. Start a second Command Prompt, Shell, or Terminal window, start the development server: `npm start`

11. After the application starts in a new tab of Chrome browser, to see “hot reloading” of changes, replace `React App` with `Todo React 2` in the `index.html` file in `public` subdirectory of the application, and then save your change

## Review objectives from part 1

1. Describe structure and behavior as functions: given state, return elements.

2. Replace template languages with JavaScript for code and JSX for markup.

3. Build with components as if they are application-specific HTML elements.

4. Pass data down the “render tree” via props of descendant components.

## Learning objectives

1. Bind event handlers in class and function components.

2. Write callback functions to update the state of ancestor components.

3. Control the state of form elements.

4. Compose components to reuse code and separate concerns.

## Warm-up exercise 1

Given what y’all learned in part 1, will a volunteer please explain the `Heading.js` file in `src` subdirectory.

## Warm-up exercise 2

Let’s trace a component from the bottom up:

1. Given what y’all learned in part 1, will a volunteer please explain the `logOffButton.js` file in `src` subdirectory.

2. Will other volunteers suggest things we expect to find in the `App.js` file of a component that renders a Log Off button?

3. Will another volunteer tell what condition based on the state determines whether the application renders a Log Off button?

## Bind arguments of event handlers

Given a function, the [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) method returns a new function that when called:

* has its `this` keyword set to the provided value
* has a sequence of zero or more arguments preceding any provided when the new function is called

Will a volunteer please say what is the value of `this` and what (if any) arguments:

```js
onToggleCompleted.bind(null, todoItem.id)
```

Will another volunteer please say what is the value of `this` and what (if any) arguments:

```js
this.onToggleCompleted = this.onToggleCompleted.bind(this);
```

## setState

The props (short for properties) and state are both plain JavaScript objects:

* a component receives props (like a function and its arguments)
* state is managed within the component (like variables declared within a function)

Interactive behavior in a React application has a simple cause-and-effect relationship:

* Cause: The `setState` method of a React component schedules an update to its state object.
* Effect: When state changes, the component responds by re-rendering.

Initialize the state of a component in its constructor function:

```js
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

    // bind methods
  }

  // methods
}
```

When you call `setState` with an object, React merges its properties into the state:

```js
onLogOff() {
  this.setState({
    doer: null,
  });
}
```

Look for the following points in the challenges:

* Because `setState` is asynchronous, if properties of the next state depend on properties of the previous state, then provide a callback function which given current state, returns a correct update to the state.

* You can provide to `setState` a second callback function which makes a request to update the state on the server.

## Challenge 1 toggleCompleted

In pairs: work “from the bottom up” in our first challenge to toggle the `completed` property when you click the text of a todo item.

1. In the `TodoItem.js` file in `src` subdirectory:

    * Add `onToggleCompleted` to object destructuring in arguments of function component

    * Add `onClick={onToggleCompleted.bind(null, todoItem.id)}` prop to opening `<p>` tag

2. In the `TodoList.js` file in `src` subdirectory:

    * Add `onToggleCompleted` to object destructuring in arguments of function component

    * Add `onToggleCompleted={onToggleCompleted}` prop to `TodoItem` element

3. In the `App.js` file in `src` subdirectory:

    * Add `toggleCompleted` to [empty] named imports from `'./logic'`

    * Add `this.onToggleCompleted = this.onToggleCompleted.bind(this);` to body of `constructor` function

    * Add the following method to body of `App` class:

        ```js
        onToggleCompleted(id) {
          this.setState(
            ({doer}) => ({
              doer: toggleCompleted(doer, id),
            }),
            () => {
              putDoer(this.state.doer);
            }
          );
        }
        ```

    * Add `onToggleCompleted={this.onToggleCompleted}` prop to `TodoList` element in `render` method

4. Save your changes.

5. If Console pane in browser does not display errors, log on as any of the following: `lesson12`, `lesson14`, `lesson16`

6. Click text of some todo items to toggle completed property.

7. Look for changed values of `"completed"` property in the `db.json` file in `db` subdirectory.

## Challenge 2 deleteItem

Change roles: work “from the top down” in our second challenge to delete a todo item when you click the Delete button.

1. In the `App.js` file in `src` subdirectory:

    * Add `deleteItem` to named imports from `'./logic'`

    * Add `this.onDeleteItem = this.onDeleteItem.bind(this);` to body of `constructor` function

    * Add the following method to body of `App` class:

        ```js
        onDeleteItem(id) {
          this.setState(
            ({doer}) => ({
              doer: deleteItem(doer, id),
            }),
            () => {
              putDoer(this.state.doer);
            }
          );
        }
        ```

    * Add `onDeleteItem={this.onDeleteItem}` prop to `TodoList` element in `render` method

2. In the `TodoList.js` file in `src` subdirectory:

    * Add `onDeleteItem` to object destructuring in arguments of function component

    * Add `onDeleteItem={onDeleteItem}` prop to `TodoItem` element

3. In the `TodoItem.js` file in `src` subdirectory:

    * Add `onDeleteItem` to object destructuring in arguments of function component

    * Add `<button onClick={onDeleteItem.bind(null, todoItem.id)}>Delete</button>` element after `p` element

4. Save your changes.

5. If Console pane in browser does not display errors, log on as any of the following: `lesson10`, `lesson12`, `lesson14`, `lesson16`

6. Click Delete button of some todo items

7. Look for absence of deleted items in the `db.json` file in `db` subdirector.

## Challenge 3 changeCompletedness

Change roles: work “from the top down” in our next challenge to change the completedness filter when you click a radio button.

1. In the `App.js` file in `src` subdirectory:

    * Add `changeCompletedness` to named imports from `'./logic'`

    * Add `this.onChangeCompletedness = this.onChangeCompletedness.bind(this);` to body of `constructor` function

    * Add the following method to body of `App` class:

        ```js
        onChangeCompletedness(completedness) {
          this.setState(
            ({doer}) => ({
              doer: changeCompletedness(doer, completedness),
            }),
            () => {
              putDoer(this.state.doer);
            }
          );
        }
        ```

    * Add `onChange={this.onChangeCompletedness}` prop to `CompletednessFilter` element in `render` method

2. In the `CompletednessFilter.js` file in `src` subdirectory:

    * Add the following event handler method to body of class:

        ```js
        _onChange(event) {
          this.props.onChange(event.target.value);
        }
        ```

    * Add the following constructor function to body of class:

        ```js
        constructor(props) {
          super(props);
          this._onChange = this._onChange.bind(this);
        }
        ```

    * Add `onChange={this._onChange}` prop to `input` element in `render` method

3. Save your changes

4. If Console pane in browser does not display errors, log on as any of the following: `lesson10`, `lesson12`, `lesson14`, `lesson16`

5. Click radio buttons

6. Look for changed values of `"completedness"` property in the `db.json` file in `db` subdirectory

## Challenge 4 addItem

Change roles: work “from the bottom up” in our next challenge to add a todo item after you type text of new item in the box, and then either click the Add button or press Enter or Return.

1. In the `Adder.js` file in `src` subdirectory:

    * Add the following event handler method to body of class:

        ```js
        _onChange(event) {
          const text = event.target.value;
          this.setState({text});
        }

        _onSubmit(event) {
          event.preventDefault();
          this.props.onAddItem(this.state.text);
          this.setState({text: ''});
        }
        ```

    * Add the following constructor function to body of class:

        ```js
        constructor(props) {
          super(props);
          this.state = {text: ''};
          this._onChange = this._onChange.bind(this);
          this._onSubmit = this._onSubmit.bind(this);
        }
        ```

    * Add `onSubmit={this._onSubmit}` prop to opening `<form>` tag

    * Add `onChange={this._onChange}` prop to `<input>` tag

2. In the `App.js` file in `src` subdirectory:

    * Add `import Adder from './Adder';`

    * Add `addItem` to named imports from `'./logic'`

    * Add `this.onAddItem = this.onAddItem.bind(this);` to body of `constructor` function

    * Add the following method to body of `App` class:

        ```js
        onAddItem(text) {
          this.setState(
            ({doer}) => ({
              doer: addItem(doer, text),
            }),
            () => {
              putDoer(this.state.doer);
            }
          );
        }
        ```

    * Add `<Adder onAddItem={this.onAddItem} />` element after `TodoList` element in `render` method

3. Save your changes.

4. If Console pane in browser does not display errors, log on as any of the following: `lesson10`, `lesson12`, `lesson14`, `lesson16`

5. Type text of new item in the box, and then either click the Add button or press Enter or Return

6. Look for added items in the `db.json` file in `db` subdirectory

## Challenge 5 modal

Some components don’t know their children ahead of time. This is especially common for components that represent generic boxes. We recommend that such components use the special `children` prop.

In pairs: work “from the top down” in our last challenge to display a modal box after you sign up as a new doer.

1. Sign up as a new doer, do some things, and then log off

2. In the `App.js` file in `src` subdirectory:

    * Import the `ModalBox` component

    * In the constructor function, add `modal: false` property to the initial state

    * Add a callback method to update state when you click to close the modal dialog box:

        ```js
        onCloseModal() {
          this.setState({
            modal: false,
          });
        }
        ```

    * Bind the callback method in the constructor functions

    * Add `modal: true` property in the first `setState` method call under **onSignUp success**

    * To render the modal box, paste following `<Adder onAddItem={this.onAddItem} />`

        ```js
        {
          this.state.modal && (
            <ModalDialog onClick={this.onCloseModal}>
              <p>Before you can do what you signed up to do</p>
              <p>Here is what matters to me but not to you</p>
            </ModalDialog>
          )
        }
        ```

3. Sign up as a (different) new doer, be annoyed by the modal box, and then click button at lower right

## Homework

* Read [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)
* Read [Handling Events](https://reactjs.org/docs/handling-events.html)
* Read [Component State](https://reactjs.org/docs/faq-state.html)
* Read [Forms](https://reactjs.org/docs/forms.html)
* Read [Composition vs Inheritance](https://reactjs.org/docs/composition-vs-inheritance.html)
* View [When and how to bind callback methods](https://speakerdeck.com/pedrottimark/bind-callback-methods-at-triadjs) by pedrottimark
