import { combineReducers } from 'redux';

import analysisReducer from './analysisReducer';
import gameReducer from './gameReducer';
import leagueReducer from './leagueReducer';
import playerReducer from './playerReducer';
import miscReducer from './miscReducer';
import teamReducer from './teamReducer';

export default combineReducers({
    analysis: analysisReducer,
    game: gameReducer,
    league: leagueReducer,
    misc: miscReducer,
    player: playerReducer,
    team: teamReducer,
});