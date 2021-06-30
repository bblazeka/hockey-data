import React from 'react';
import { screen } from '@testing-library/react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import TeamSchedule from './TeamSchedule';

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

it('renders loading when games parameter is not given', () => {
  act(() => { render(<TeamSchedule />, container); });
  expect(container.textContent).toBe('Loading...');
});

it('renders no upcoming games when games parameter is empty', () => {
  act(() => { render(<TeamSchedule games={[]} />, container); });
  const linkElement = screen.getByText(/No upcoming games./i);
  expect(linkElement).toBeInTheDocument();
});