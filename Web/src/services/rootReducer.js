import { combineReducers } from 'redux';
import { leagueReducer } from './league';
import { playerReducer } from './player';
import { teamReducer } from './team';

export default combineReducers({
    league: leagueReducer,
    player: playerReducer,
    team: teamReducer,
});