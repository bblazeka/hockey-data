import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './services/rootReducer';
import * as serviceWorker from './serviceWorker';
import {
    Schedule,
    Standings,
    Team,
    Home,
    Player,
    PlayerList,
    Prediction,
    Lineup,
    Game,
} from './views';
import routes from './routes';
import 'semantic-ui-css/semantic.min.css';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
ReactDOM.render(
    <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route exact path={routes.schedule} component={Schedule} />
          <Route exact path={routes.game} component={Game} />
          <Route exact path={routes.standings} component={Standings} />
          <Route exact path={routes.lineup} component={Lineup} />
          <Route exact path={routes.prediction} component={Prediction} />
          <Route exact path={routes.teams+"/:id"} component={Team} />
          <Route exact path={routes.players} component={PlayerList} />
          <Route exact path={routes.player+"/:id"} component={Player} />
          <Route component={Home} />
        </Switch>
      </App>
    </Router>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();