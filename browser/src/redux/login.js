export const LOG_IN_ATTEMPT = "IDEA_BOARD/LOGIN/LOG_IN_ATTEMPT";
export const LOG_IN_SUCCESS = "IDEA_BOARD/LOGIN/LOG_IN_SUCCESS";
export const LOG_IN_FAIL = "IDEA_BOARD/LOGIN/LOG_IN_FAIL";
export const LOG_OUT_ATTEMPT = "IDEA_BOARD/LOGIN/LOG_OUT_ATTEMPT";
export const LOG_OUT_SUCCESS = "IDEA_BOARD/LOGIN/LOG_OUT_SUCCESS";
export const LOG_OUT_FAIL = "IDEA_BOARD/LOGIN/LOG_OUT_FAIL";

const initialState = {
  hasSession: !!sessionStorage.jwt,
  loggingIn: false
};

export function login(credentials) {
  return {
    type: LOG_IN_ATTEMPT,
    payload: credentials
  };
}

export function logout() {
  return {
    type: LOG_OUT_ATTEMPT
  };
}

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_ATTEMPT:
      return {
        ...state,
        loggingIn: true
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        hasSession: true,
        loggingIn: false
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        hasSession: false
      };
    default:
      return {
        ...state,
        loggingIn: false
      };
  }
}
