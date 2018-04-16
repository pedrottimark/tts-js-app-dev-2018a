import doerReducer from './doer';

const loggingOffDefault = {
  error: null,
  isSubmitting: false,
};

const loggingOnDefault = {
  id: '',
  error: null,
  isSubmitting: false,
};

const signingUpDefault = {
  ...loggingOnDefault,
};

const stateDefault = {
  doer: null,
  loggingOff: loggingOffDefault,
  loggingOn: loggingOnDefault,
  signingUp: signingUpDefault,
};

export default (state = stateDefault, action) => {
  switch (action.type) {
    case 'LOG_OFF_REQUEST':
      return {
        ...state,
        loggingOff: {
          error: null,
          isSubmitting: true,
        },
      };

    case 'LOG_OFF_FAILURE':
      return {
        ...state,
        loggingOff: {
          error: action.error,
          isSubmitting: false,
        },
      };

    case 'LOG_OFF_SUCCESS':
      return {
        ...state,
        doer: null,
        loggingOff: loggingOffDefault,
      };

    case 'LOG_ON_REQUEST':
      return {
        ...state,
        loggingOn: {
          id: action.id,
          error: null,
          isSubmitting: true,
        },
      };

    case 'LOG_ON_FAILURE':
      return {
        ...state,
        loggingOn: {
          ...state.loggingOn,
          error: action.error,
          isSubmitting: false,
        },
      };

    case 'LOG_ON_SUCCESS':
      return {
        ...state,
        doer: action.doer,
        loggingOn: loggingOnDefault,
      };

    case 'SIGN_UP_REQUEST':
      return {
        ...state,
        signingUp: {
          id: action.id,
          error: null,
          isSubmitting: true,
        },
      };

    case 'SIGN_UP_FAILURE':
      return {
        ...state,
        signingUp: {
          ...state.signingUp,
          error: action.error,
          isSubmitting: false,
        },
      };

    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        doer: action.doer,
        signingUp: signingUpDefault,
      };

    default: {
      const doer = state.doer && doerReducer(state.doer, action);
      return doer !== state.doer ? {...state, doer} : state;
    }
  }
};
