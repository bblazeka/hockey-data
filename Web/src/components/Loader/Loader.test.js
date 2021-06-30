import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Loader from './Loader';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders loading without parameters', () => {
  act(() => { render(<Loader />, container); });
  
  expect(container.textContent).toBe('Loading...');
});

it('renders text given as parameter', () => {
  const testingText = 'Testing text';

  act(() => {
    render(<Loader text={testingText} />, container);
  });

  expect(container.textContent).toBe(testingText);
});