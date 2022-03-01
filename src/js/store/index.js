// src/js/store/index.js

import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import { forbiddenWordsMiddleware } from "../middleware";
import createSagaMiddleware from "redux-saga";
import apiSaga from "../sagas/api-saga";

const initialiseSagaMiddleware = createSagaMiddleware();

//const store = createStore(rootReducer);
const store = createStore(
    rootReducer,
    applyMiddleware(forbiddenWordsMiddleware, initialiseSagaMiddleware) //add the middleware
  );

initialiseSagaMiddleware.run(apiSaga);

export default store;