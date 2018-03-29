export const getDoer = (id, callbackSuccess, callbackFailure) => {
  // To get an array of objects, url consists of plural noun:
  fetch(`/doers/${id.replace(/\W/g, '')}`)
    .then(function (response) {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    }).then(callbackSuccess)
      .catch(callbackFailure);
};

export const putDoer = (doer, callbackSuccess, callbackFailure) => {
  // To put item in array of objects, url consists of plural noun, and then id:
  fetch(`/doers/${doer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doer),
    }).then(callbackSuccess)
      .catch(callbackFailure);
};

export const postDoer = (doer, callbackSuccess, callbackFailure) => {
  // To add an object to an array, url consists of plural noun:
  fetch('/doers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(doer),
  }).then(callbackSuccess)
    .catch(callbackFailure);
};
