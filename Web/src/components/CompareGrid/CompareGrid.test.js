import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import CompareGrid from './CompareGrid';

fdescribe('CompareGrid component', () => {
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

  it('renders not found without players', () => {
    act(() => { render(<CompareGrid />, container); });

    expect(container.textContent).toBe('Not found.');
  });
});