import React from 'react';
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import saga from "reducers/sagas";
import rootReducer from "reducers/rootReducer";

export const renderWithState = (
  ui,
  { ...renderOptions } = {}
) => {
  const sagaMiddleware = createSagaMiddleware();
  const middleWares = [sagaMiddleware, thunk];
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWares)));
  sagaMiddleware.run(saga);
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <Router>{children}
      </Router></Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};