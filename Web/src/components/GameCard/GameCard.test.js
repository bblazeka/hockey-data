import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import GameCard from './GameCard';

describe('GameCard component', () => {
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

  it('renders loading when no parameter', () => {

    act(() => {
      render(<GameCard />, container);
    });

    expect(container.textContent).toBe('Loading...');
  });
});