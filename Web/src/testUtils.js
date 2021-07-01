import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store';

export const renderWithState = (
  ui,
  { ...renderOptions } = {}
) => {
  const store = configureStore();
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <Router>{children}
      </Router></Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};