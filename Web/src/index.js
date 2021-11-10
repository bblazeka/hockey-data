import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import * as serviceWorker from "./serviceWorker";
import {
  Schedule,
  Standings,
  Team,
  Home,
  Player,
  PlayerList,
  Analysis,
  Game,
  GameSelection,
} from "./pages";
import routes from "./routes";
import configureStore from "./store";

const client = new ApolloClient({
  // eslint-disable-next-line no-undef
  uri: process.env.REACT_APP_BACKEND_API,
  cache: new InMemoryCache(),
});

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Router>
        <App>
          <Switch>
            <Route exact path={routes.schedule} component={Schedule} />
            <Route exact path={`${routes.game}/:id`} component={Game} />
            <Route exact path={routes.games} component={GameSelection} />
            <Route exact path={routes.standings} component={Standings} />
            <Route exact path={routes.analysis} component={Analysis} />
            <Route exact path={`${routes.teams}/:id`} component={Team} />
            <Route exact path={routes.players} component={PlayerList} />
            <Route exact path={`${routes.player}/:id`} component={Player} />
            <Route component={Home} />
          </Switch>
        </App>
      </Router>
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
