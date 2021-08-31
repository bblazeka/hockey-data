import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import GameCard from './GameCard';

describe('GameCard component', () => {
  let container = null;
  let baseGame = {
    teams: {
      home: {
        team: { id: 1, name: 'Test 1' },
        shotsOnGoal: 1,
        goals: 1
      },
      away: {
        team: { id: 2, name: 'Test 2' },
        shotsOnGoal: 2,
        goals: 2
      }
    }
  };
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

  it('renders ongoing game', () => {
    const currentTime = '10:00';
    const currentPeriod = '3rd';

    const game = Object.assign(baseGame, {
      ongoingGame: true,
      finished: false,
      currentPeriodOrdinal: currentPeriod,
      currentPeriodTimeRemaining: currentTime
    });

    act(() => {
      render(<GameCard game={game} />, container);
    });

    expect(container.textContent).toContain(currentTime);
    expect(container.textContent).toContain(currentPeriod);
  });

  it('renders planned game', () => {
    const gameTime = '10:00';
    const game = Object.assign(baseGame, {
      ongoingGame: false,
      finished: false,
      gameTime
    });
    
    act(() => {
      render(<GameCard game={game} />, container);
    });

    expect(container.textContent).toContain(gameTime);
  });

  it('renders finished game', () => {
    const finalLabel = 'Final';

    const game = Object.assign(baseGame, {
      ongoingGame: true,
      currentPeriodOrdinal: '3rd',
      currentPeriodTimeRemaining: finalLabel,
      finished: true
    });
    
    act(() => {
      render(<GameCard game={game} />, container);
    });

    expect(container.textContent).toContain(finalLabel);
  });
});