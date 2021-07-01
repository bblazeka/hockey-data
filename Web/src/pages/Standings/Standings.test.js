import React from 'react';
import { screen } from '@testing-library/react';

import Standings from './Standings';
import { renderWithState } from '../../testUtils';

const testedDivision = 'Honda West';
const testedTeam = 'Tested Team';

jest.mock('../../services/league/actions', () => ({
  getStandings: () => ({
    type: 'STANDINGS_LOADED',
    payload: [{ 
      'division': { id: 27, name: testedDivision },
      'teamRecords': [
        {
          'divisionRank': 1,
          'gamesPlayed': 56,
          'goalsAgainst': 133,
          'goalsScored': 197,
          'points': 82,
          'leagueRecord': {
            'losses': 13,
            'ot': 4,
            'wins': 39
          },
          'team': {
            id: 21,
            name: testedTeam
          }
        }
      ]
    }] 
  })
}));

describe('Standings', () => {
  it('should display standings', async () => {
    renderWithState(<Standings />, { });

    const teamName = await screen.findByText(testedTeam);

    expect(teamName).toBeTruthy();
  });
});