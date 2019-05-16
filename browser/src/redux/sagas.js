import { call, put, takeLatest } from "redux-saga/effects";

import { history } from "../App";
import SessionsApi from "../api/sessions";
import {
  LOG_IN_SUCCESS,
  LOG_IN_ATTEMPT,
  LOG_IN_FAIL,
  LOG_OUT_ATTEMPT,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAIL
} from "./login";

function* attemptLogin(action) {
  try {
    yield call(SessionsApi.login, action.payload);
    yield put({ type: LOG_IN_SUCCESS });
    yield call(history.push, "/ideas");
  } catch (e) {
    yield put({ type: LOG_IN_FAIL, message: e.message });
  }
}

function* attemptLogout() {
  try {
    yield call(SessionsApi.logout);
    yield put({ type: LOG_OUT_SUCCESS });
  } catch (e) {
    yield put({ type: LOG_OUT_FAIL, message: e.message });
  }
}

function* mySaga() {
  yield takeLatest(LOG_IN_ATTEMPT, attemptLogin);
  yield takeLatest(LOG_OUT_ATTEMPT, attemptLogout);
}

export default mySaga;
