import doerReducer from './reducers/doer';

// Action creator functions for list

// Given text, return action to add a new item.
export const addItem = (text) => ({
  type: 'ADD_ITEM',
  text,
  timeAdded: (new Date()).toISOString(), // impure
});

// Given id, return action to delete item with that id.
export const deleteItem = (id) => ({
  type: 'DELETE_ITEM',
  id,
});

// Given id and text, return action to replace text of item with that id.
export const replaceText = (id, text) => ({
  type: 'REPLACE_TEXT',
  id,
  text,
});

// Given id, return action to toggle completed property of item with that id.
export const toggleCompleted = (id) => ({
  type: 'TOGGLE_COMPLETED',
  id,
});

// Action creator functions for view

// Given option, return action to filter items by completed property.
export const changeCompletedness = (completedness) => ({
  type: 'CHANGE_COMPLETEDNESS',
  completedness,
});

// Given substring, return action to match items whose text string include it.
export const changeMatching = (matching) => ({
  type: 'CHANGE_MATCHING',
  matching,
});

// Given option, return action to sort items.
export const changeSorting = (sorting) => ({
  type: 'CHANGE_SORTING',
  sorting,
});

// Asynchronous action creator functions for session

export const logOff = () => (dispatch, getState) => {
  dispatch({
    type: 'LOG_OFF_REQUEST',
  });

  const doer = getState().doer;
  return fetch(`/doers/${doer.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(doer),
  }).then(
    (response) => {
      dispatch({
        type: 'LOG_OFF_SUCCESS',
      });
    },
    (error) => {
      dispatch({
        type: 'LOG_OFF_FAILURE',
        error,
      });
    }
  );
};

const getDoer = (id) =>
  fetch(`/doers/${id.replace(/\W/g, '')}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    }
  );

export const logOn = (id) => (dispatch) => {
  dispatch({
    type: 'LOG_ON_REQUEST',
  });

  getDoer(id).then(
    (doer) => {
      dispatch({
        type: 'LOG_ON_SUCCESS',
        doer,
      });
    },
    (error) => {
      dispatch({
        type: 'LOG_ON_FAILURE',
        error,
      });
    }
  );
};

export const signUp = (id) => (dispatch) => {
  dispatch({
    type: 'SIGN_UP_REQUEST',
  });

  getDoer(id).then(
    (doer) => {
      dispatch({
        type: 'SIGN_UP_FAILURE',
        error: new Error(`signUp doer already exists id=${id}`),
      });
    },
    () => {
      const doer = doerReducer(undefined, {
        type: 'SIGN_UP',
        id,
      });
      fetch('/doers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doer),
      }).then(
        (response) => {
          console.info(response);
          dispatch({
            type: 'SIGN_UP_SUCCESS',
            doer,
          });
        },
        (error) => {
          dispatch({
            type: 'SIGN_UP_FAILURE',
            error,
          });
        }
      );
    }
  );
};
