import { combineReducers } from 'redux';

import gameReducer from './gameReducer';
import leagueReducer from './leagueReducer';
import playerReducer from './playerReducer';

export default combineReducers({
    game: gameReducer,
    league: leagueReducer,
    player: playerReducer,
});