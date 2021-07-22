import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';

import Lineup from './Lineup';

describe('Lineup component', () => {

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

  it('renders loading without any parameters', () => {
    act(() => { render(<Lineup />, container); });

    expect(container.textContent).toBe('Loading...');
  });

  it('renders not found if object is empty', () => {
    act(() => { render(<Lineup lines={{}} />, container); });

    expect(container.textContent).toBe('Not found.');
  });

  it('renders not found if object is empty', () => {
    var testLines = {
      'lines': [
        {
          'leftDefender': 'Left defender',
          'rightDefender': 'Right defender',
          'leftWing': 'Left wing',
          'center': 'Center',
          'rightWing': 'Right wing'
        },
        {
          'leftWing': 'Left wing 2',
          'center': 'Center 2',
          'rightWing': 'Right wing 2'
        },
      ],
      'goalies': {
        'starter': 'Starter',
        'backup': 'Backup'
      }
    };
    act(() => { render(<Lineup lines={testLines} />, container); });

    const goalie = screen.getByText(/Starter/);
    const rightDefender = screen.getByText(/Right defender/);
    const leftWing2 = screen.getByText(/Left wing 2/);
    expect(goalie).toBeInTheDocument();
    expect(rightDefender).toBeInTheDocument();
    expect(leftWing2).toBeInTheDocument();
  });
});