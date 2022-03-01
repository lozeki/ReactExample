// src/js/sagas/api-saga.js

import { takeEvery, call, put } from "redux-saga/effects";

export default function* watcherSaga() {
  yield takeEvery("DATA_REQUESTED", workerSaga);
}

function* workerSaga() {
  try {
    const payload = yield call(getData);
    yield put({ type: "DATA_LOADED", payload });
    //Action type: "DATA_LOADED" from saga
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
    //Action type: "API_ERRORED" from saga
  }
}

function getData() {
  return fetch("https://jsonplaceholder.typicode.com/posts").then(response =>
    response.json()
  );
}