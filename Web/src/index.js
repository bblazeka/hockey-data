import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { watcherSaga } from './sagas';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer';
import * as serviceWorker from './serviceWorker';
import {
    Schedule,
    Standings,
    Settings,
    Team,
    NoMatch,
    News,
    Player,
    PlayerList,
    Prediction,
    Lineup,
} from './components';
import routes from './routes';
import 'semantic-ui-css/semantic.min.css';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(watcherSaga)

ReactDOM.render(
    <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route exact path={routes.news} component={News} />
          <Route exact path={routes.schedule} component={Schedule} />
          <Route exact path={routes.standings} component={Standings} />
          <Route exact path={routes.settings} component={Settings} />
          <Route exact path={routes.lineup} component={Lineup} />
          <Route exact path={routes.prediction} component={Prediction} />
          <Route exact path={routes.teams+"/:id"} component={Team} />
          <Route exact path={routes.players} component={PlayerList} />
          <Route exact path={routes.player+"/:id"} component={Player} />
          <Route component={NoMatch} />
        </Switch>
      </App>
    </Router>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();