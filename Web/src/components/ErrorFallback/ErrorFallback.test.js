import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';

import ErrorFallback from './ErrorFallback';

describe('ErrorFallback component', () => {
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

  it('renders error given as parameter', () => {
    const testErrorMessage = 'This is a funny error';
    act(() => {
      render(<ErrorFallback error={{ 'message': testErrorMessage }} />, container);
    });

    const defaultErrorText = screen.getByText(/Oops, there was an error:/i);
    const testErrorText = screen.getByText(testErrorMessage);
    expect(defaultErrorText).toBeInTheDocument();
    expect(testErrorText).toBeInTheDocument();
  });
});