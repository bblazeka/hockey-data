import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import saga from "reducers/sagas";

import {
  Schedule,
  Standings,
  Team,
  TeamAnalysis,
  Home,
  Player,
  PlayerList,
  Analysis,
  Game,
  GameSelection,
} from "./pages";
import routes from "./routes";
import rootReducer from "./reducers/rootReducer";

// TODO: until https://github.com/facebook/create-react-app/issues/11773 is resolved
window.process = {};

const client = new ApolloClient({
  // eslint-disable-next-line no-undef
  uri: process?.env.REACT_APP_BACKEND_API,
  cache: new InMemoryCache(),
});

const sagaMiddleware = createSagaMiddleware();
const middleWares = [sagaMiddleware, thunk];
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWares)));
sagaMiddleware.run(saga);
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
            <Route
              exact
              path={`${routes.analysis}/:id`}
              component={TeamAnalysis}
            />
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
