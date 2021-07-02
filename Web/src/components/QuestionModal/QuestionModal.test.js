import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';

import QuestionModal from './QuestionModal';

describe('QuestionModal component', () => {
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

  it('does not render without open prop', () => {
    act(() => { render(<QuestionModal />, container); });

    expect(container.textContent).toBe('');
  });

  it('renders modal when open is true', () => {
    act(() => { render(<QuestionModal open={true} />, container); });

    const mainText = screen.getByText(/Are you sure/i);
    expect(mainText).toBeInTheDocument();
  });
});