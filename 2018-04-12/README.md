# Lesson 20: Redux

## Create a React application with Redux

1. In a Command Prompt or Shell or Terminal window:

    * Only if you **did not already** install it: `npm install --global create-react-app`

    * Change to a directory which will be the **parent** of a new application directory

    * Create the new application directory: `create-react-app todo-redux`

    * Change to the **child** directory: `cd todo-redux`

    * Install dependencies. Is `yarn` installed on your computer?

        * No, or don’t know: `npm install classnames json-server react-redux redux redux-logger redux-thunk`
        * Yes: `yarn add classnames json-server react-redux redux redux-logger redux-thunk`

2. Copy files **from** your clone of the class repository **to** the new application:

    * In an Explorer or Finder window, copy the `db.json` file in the `db` subdirectory of the `2018-04-12` subdirectory in your clone of the class repository

        In another Explorer or Finder window, make a new `db` subdirectory in the new `todo-redux` directory, and then paste the `db.json` file in the `db` subdirectory

    * In the first Explorer or Finder window, copy all the files and directories in the `src` subdirectory in the `2018-04-12` subdirectory in your clone of the class repository

        In the second Explorer or Finder window, paste the files in the `src` subdirectory in the new `todo-redux` directory, and then confirm that you are replacing some of the existing files

3. In your code editor, open the `todo-redux` directory, open the `package.json` file, edit as follows, and then save your changes:

    * For the development server to pass requests to and responses from the data server, paste a property: `"proxy": "http://localhost:3001",` anywhere except at the end

    * To start a data server, paste a property at the beginning of the `"scripts"` object: `"server": "json-server --port 3001 --watch ./db/db.json",`

4. In the first Command Prompt, Shell, or Terminal window, start the data server: `npm run server`

5. In a second Command Prompt, Shell, or Terminal window, start the development server: `npm start`

6. After the application starts in a new tab of Chrome browser, to see “hot reloading” of changes, replace `React App` with `Todo Redux` in the `index.html` file in `public` subdirectory of the application, and then save your change

7. In the `Todo Redux` tab:

    * Open the Console pane to see actions and state via `redux-logger` package
    * You can log on as returning doers: `lesson14`, `lesson16`, `lesson20`
    * This version of the app waits to make `PUT` request to update `db.json` until you log off
    * The interactions related to items do nothing until you complete some challenges

## Questions to ask before you add a dependency to a project

What **problem** does it solve? Answers from [React Context](https://reactjs.org/docs/context.html)

> With React, it's easy to track the flow of data through your React components. When you look at a component, you can see which props are being passed, which makes your apps easy to reason about.

> In some cases, you want to pass data through the component tree without having to pass the props down manually at every level.

> State management libraries like [Redux](http://redux.js.org) or [MobX](https://mobx.js.org/) and their React bindings are a good choice for managing state that is relevant to many components.

How does it affect **people** who use the application? Answers from [Redux Read Me](http://redux.js.org/)

> Redux helps you write applications that behave consistently, run in different environments, and are easy to test.

> The beauty of this pattern is how well it scales to large and complex apps.

> It is possible to trace every mutation to the action that caused it. You can record user sessions and reproduce them just by replaying every action.

Why is it **better** than the alternatives? Answers from [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)

> Redux offers a tradeoff. It asks you to:

> Describe application state as plain objects and arrays.
> Describe changes in the system as plain objects.
> Describe the logic for handling changes as pure functions.

> But if you trade something off, make sure you get something in return.

> If you’re just learning React, don’t make Redux your first choice. Instead learn to think in React.

## Learning objectives

1. Move some application state from React components to Redux store.

2. Map action creator functions and state to props in “connected” components.

3. Write action creator functions.

4. Write cases of `switch` statement in reducer functions.

5. Read test for reducer function.

## Redux concepts

For diagrams of concepts, see [When do I know I’m ready for Redux?](https://medium.com/dailyjs/when-do-i-know-im-ready-for-redux-f34da253c85f)

### state

> In Redux, all the application **state** is stored as a single object. It’s a good idea to think of its shape before writing any code. What’s the minimal representation of your app’s state as an object?

Look at the “shape” of the state:

* for doers in `db/db.json`
* for properties of session in `src/reducers/index.js`

### actions

> **Actions** are payloads of information that send data from your application to your store. They are the *only* source of information for the store.

See `src/actions.js` for action creator functions

The asynchronous actions for session at the end are beyond the scope of this lesson.

### reducer

> The **reducer** takes the previous state and an action, and returns the next state.

> The reducer must be pure. **Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.**

See `src/reducers` subdirectory for reducer functions.

### store

> The **store** is the object that brings them together. The store has the following responsibilities:

* Holds application state
* Allows access to state via `getState()`
* Allows state to be updated via `dispatch(action)`
* Registers listeners via `subscribe(listener)`
* Handles unregistering of listeners via the function returned by `subscribe(listener)`

Instead of the calling store methods directly, we will use the `react-redux` package.

* Analogy for passing **props**: To withdraw small amount of cash from drive-up ATM machine, passenger hands card to driver.
* Analogy for passing through via **context**: To deposit large amount of cash from farthest drive-through lane, teller sends pneumatic tube (so people do not pass cash from car to car).

> You’ll only have a **single store** in a Redux application.

> When you want to split your data handling logic, you'll use **reducer composition** instead of many stores.

See `src/reducers/doer.js` for `combineReducers` function.

## Challenge 1 toggleCompleted

In pairs: work “from the bottom up” in our first challenge to toggle the `completed` property when you click the text of a todo item.

1. Click the text of a todo item. Nothing happens in browser window or Console pane.

2. In the `src/TodoItem.js` file:

    * See `onToggleCompleted` in object destructuring of props for function component.

    * See `onClick={onToggleCompleted.bind(null, id)}` prop in opening `<p>` tag.

3. In the `src/TodoList.js` file:

    * See `onToggleCompleted` in object destructuring of props for function component.

    * See `onToggleCompleted={onToggleCompleted}` prop in `TodoItem` element.

4. In the `src/App.js` file:

    * Add `toggleCompleted` to named imports `from './actions'` near the beginning of the file.

    * Add `toggleCompleted` to `mapDispatchToProps` object near the end of the file.

    * Replace `onToggleCompleted={() => {}}` with `onToggleCompleted={this.props.toggleCompleted}` prop of `TodoList` element in `render` method.

5. Click the text of a todo item. Style changes in browser window and Console pane displays action.

6. In the `src/actions.js` file, see the `toggleCompleted` function.

7. In the `src/reducers/list.js` file, see `case 'TOGGLE_COMPLETED':` in the `switch` statement.

    * Will a volunteer please explain how the `type` property of the action object relates to the `switch` statement.
    * Will a volunteer please explain why `map` method fits this action.
    * Will a volunteer please explain how the callback function works for this action.

Will a volunteer please explain what does `() => {}` mean generally, and then what did it mean specifically in the last bullet under step 4.

## Challenge 2 deleteItem

Change roles: work “from the bottom up” in our second challenge to delete a todo item when you click the `Delete` button.

1. Click the `Delete` button for a todo item. Nothing happens in browser window or Console pane.

2. In the `src/TodoItem.js` file:

    * See `onDeleteItem` in object destructuring of props for function component

    * See `onClick={onDeleteItem.bind(null, id)}` prop in opening `<button>` tag

3. In the `src/TodoList.js` file:

    * See `onDeleteItem` in object destructuring of props for function component

    * See `onDeleteItem={onDeleteItem}` prop in `TodoItem` element

4. In the `src/App.js` file:

    * Add `deleteItem` to named imports `from './actions'` near the beginning of the file

    * Add `deleteItem` to `mapDispatchToProps` object near the end of the file

    * Replace `onDeleteItem={() => {}}` with `onDeleteItem={this.props.deleteItem}` prop of `TodoList` element in `render` method

5. Click the `Delete` button for a todo item. Item disappears in browser window and Console pane displays action.

6. In the `src/actions.js` file, see the `deleteItem` function.

7. In the `src/reducers/list.js` file, see `case 'DELETE_ITEM':` in the `switch` statement.

    * Will a volunteer please explain why `filter` method fits this action.
    * Will a volunteer please explain how the callback function works for this action.

## Example test for reducer function

Here is code from the `src/reducers/list.js` file:

```js
const listDefault = [];

export default (list = listDefault, action) => {
  switch (action.type) {
    // cases
  }
};
```

Let’s look at code from the `src/reducers/list.test.js` file:

```js
import listReducer from './list';

it('reduces an array of actions', () => {
  const listPrev = [/* items before actions */];
  const listNext = [/* items after actions */];
  const actions = [/* action objects */];
  expect(actions.reduce(listReducer, listPrev)).toEqual(listNext);
};
```

Given the preceding code and the information on the page about array [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) method, will two volunteers each explain one of the following:

* What are the arguments of the `reduce` method?
* What are the arguments of the `listReducer` callback function?

In a third Command Prompt, Shell, or Terminal window:

1. Change to your `todo-redux` directory
2. To run the test file in watch mode: `npm test -- list`
3. To stop the test, press `q`

## Challenge 3 addItem

Change roles: work “from the top down” in our next challenge to add a todo item after you type text of new item in the box, and then either click the `Add` button (or press Enter or Return).

1. Type in the `text of new item` box, and then click the `Add` button. Nothing happens in browser window or Console pane.

2. In the `src/actions.js` file, add the following action creator function after the `Action creator functions for list` comment:

    ```js
    // Given text, return action to add a new item.
    export const addItem = (text) => ({
      type: 'ADD_ITEM',
      text,
      timeAdded: (new Date()).toISOString(), // impure
    });
    ```

    Will a volunteer please suggest why the impure comment about `timeAdded` property.

3. In the `src/reducers/list.js` file, see `case 'ADD_ITEM':` in the `switch` statement.

    * Will a volunteer please explain why array spread operator fits this action.
    * Will a volunteer please explain why the `idNext` function call is pure (see beginning of file).

4. In the `src/App.js` file:

    * Add `addItem` to named imports `from './actions'` near the beginning of the file.

    * Add `addItem` to `mapDispatchToProps` object near the end of the file.

    * Add `import ItemForm from './ItemForm';` following import of `Heading` near the beginning of the file.

    * Add `<ItemForm onAddItem={this.props.addItem}/>` following `Heading` element in `render` method.

5. Type in the `text of new item` box, and then click the `Add` button. Item appears in browser window and Console pane displays action.

## Challenge 4 changeSorting

Change roles: work “from the top down” in our next challenge to change the sorting order when you click a radio button.

1. In the `src/actions.js` file, add the following action creator function after the `Action creator functions for view` comment:

    ```js
    // Given option, return action to sort items.
    export const changeSorting = (sorting) => ({
      type: 'CHANGE_SORTING',
      sorting,
    });
    ```

2. In the `src/reducers/view.js` file, see `case 'CHANGE_SORTING':` in the `switch` statement.

    * Will a volunteer please explain why object spread operator fits this action.
    * Will a volunteer please say what is the default value of the `sorting` property.

3. In the `src/App.js` file:

    * Add `changeSorting` to named imports `from './actions'` near the beginning of the file.

    * Add `changeSorting` to `mapDispatchToProps` object near the end of the file.

    * Add the following element within empty `<div></div>` element preceding `<div><LogOffForm/></div>` in `render` method.

        ```js
        <RadioForm
          name="sorting"
          options={sortingOptions}
          checked={doer.view.sorting}
          onChange={this.props.changeSorting}
        />
        ```

        * Will a volunteer please explain why we did not need to add `import` statement for `RadioForm` component?
        * Will a volunteer please suggest the difference between `text` and `value` properties in `sortingOptions` array near the beginning of the file?

4. After you save all of your changes, the sorting options appear near the upper right of the `Todo Redux` application.

5. Click the `older first` option. Items change order in browser window and Console pane displays action.

## Challenge 5 changeMatching

Change roles: work as you want in our next challenge to change the matching filter when you type in the input box.

Here is the “shape” of the action object:

```js
{
  type: 'CHANGE_MATCHING',
  matching,
}
```

* In the `src/actions.js` file, add `changeMatching` function.

* In the `src/reducers/view.js` file, add `case 'CHANGE_MATCHING':` in the `switch` statement and imitate the `return` statement in the existing case.

* In the `src/App.js` file:

    * Add `changeMatching` to named imports `from './actions'` near the beginning of the file.

    * Add `changeMatching` to `mapDispatchToProps` object near the end of the file.

    * Replace `onChange={() => {}}` with `onChange={this.props.changeMatching}` prop of `TextForm` element in `render` method.

* In the `src/TextForm.js` file, see the `_onChange` method.

## Challenge 6 changeCompletedness

Change roles: work as you want in our next challenge to change the completedness filter when you click a radio button.

Here is the “shape” of the action object:

```js
{
  type: 'CHANGE_COMPLETEDNESS',
  completedness,
}
```

* In the `src/actions.js` file, add `changeCompletedness` function.

* In the `src/reducers/view.js` file, add `case 'CHANGE_COMPLETEDNESS':` in the `switch` statement and imitate the `return` statement in the existing cases.

* In the `src/App.js` file:

    * Add `changeCompletedness` to named imports `from './actions'` near the beginning of the file.

    * Add `changeCompletedness` to `mapDispatchToProps` object near the end of the file.

    * Replace `onChange={() => {}}` with `onChange={this.props.changeCompletedness}` prop of `<RadioForm name="completedness"/>` element in `render` method.


* In the `src/RadioForm.js` file, see the `_onChange` method.

## Prerequisite steps

Here are necessary steps that I did for you.

1. See in the `src/index.js` file:

    * Move some application state from React components to Redux store:

        ```js
        import {Provider} from 'react-redux';
        import {createStore} from 'redux';

        import reducer from './reducers';
        const store = createStore(reducer);

        ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
        ```

    * To make asynchronous requests with Redux:

        ```js
        import {applyMiddleware} from 'redux';
        import thunk from 'redux-thunk';

        const store = createStore(reducer, applyMiddleware(thunk));
        ```

    * To log redux actions in Console tab:

        ```js
        import {createLogger} from 'redux-logger';

        const logger = createLogger();
        const store = createStore(reducer, applyMiddleware(logger)); // logger must be last
        ```

        See how to do better than I did: [Log only in development](https://github.com/evgenyrodionov/redux-logger#log-only-in-development)

2. See in the `src/App.js` file:

    * To “connect” a component to Redux store:

        ```js
        import {connect} from 'react-redux';

        export default connect(mapStateToProps, mapDispatchToProps)(App);
        ```

    * To map state to props in “connected” component:

        ```js
        // A “connected” component subscribes to relevant parts of state in the Redux store.
        const mapStateToProps = ({doer, loggingOff, loggingOn, signingUp}) => ({
          doer,
          loggingOff,
          loggingOn,
          signingUp,
        });
        ```

    * To map action creator functions to props in “connected” component:

        ```js
        import {
          logOff,
          logOn,
          signUp,
          // and so on
        } from './actions';

        const mapDispatchToProps = {
          logOff,
          logOn,
          signUp,
          // and so on
        };
        ```

## Redux docs

* [Introduction](https://redux.js.org/introduction)
* [Basics](https://redux.js.org/basics)
* [Advanced](https://redux.js.org/advanced)
* [Recipes](https://redux.js.org/recipes)
* [Frequently Asked Questions](https://redux.js.org/faq)

## Homework

* [Resources for Learning React](http://blog.isquaredsoftware.com/2017/12/blogged-answers-learn-react/)
* [Resources for Learning Redux](http://blog.isquaredsoftware.com/2017/12/blogged-answers-learn-redux/)
* [When do I know I’m ready for Redux?](https://medium.com/dailyjs/when-do-i-know-im-ready-for-redux-f34da253c85f)

## Inspiration

* [Slim Redux in 99 lines](https://gist.github.com/gaearon/ffd88b0e4f00b22c3159)
* [Getting Started with Redux](https://egghead.io/courses/getting-started-with-redux) 30 free lessons in 121 minutes = 4 minute average
* [Building React Applications with Idiomatic Redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux) 27 free lessons in 137 minutes = 5 minute average
