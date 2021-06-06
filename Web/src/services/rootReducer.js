import { combineReducers } from 'redux';

import { analysisReducer } from './analysis';
import { gameReducer } from './game';
import { leagueReducer } from './league';
import { playerReducer } from './player';
import { newsReducer } from './news';
import { teamReducer } from './team';
import { utilReducer } from './util';

export default combineReducers({
    analysis: analysisReducer,
    game: gameReducer,
    league: leagueReducer,
    news: newsReducer,
    player: playerReducer,
    team: teamReducer,
    util: utilReducer,
});