import { combineReducers } from 'redux';
import { leagueReducer } from './league';
import { playerReducer } from './player';
import { newsReducer } from './news';
import { teamReducer } from './team';
import { utilReducer } from './util';

export default combineReducers({
    league: leagueReducer,
    news: newsReducer,
    player: playerReducer,
    team: teamReducer,
    util: utilReducer,
});