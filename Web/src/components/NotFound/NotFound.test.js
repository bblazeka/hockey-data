import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import NotFound from './NotFound';

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

it('renders not found without text parameter', () => {
  act(() => { render(<NotFound />, container); });

  expect(container.textContent).toBe('Not found.');
});

it('renders text given as parameter', () => {
  const testingText = 'Testing text';

  act(() => {
    render(<NotFound text={testingText} />, container);
  });
  
  expect(container.textContent).toBe(testingText);
});