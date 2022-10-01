import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
      <BrowserRouter>
        <App>
          <Routes>
            <Route exact path={routes.schedule} element={<Schedule />} />
            <Route exact path={`${routes.game}/:id`} element={<Game />} />
            <Route exact path={routes.games} element={<GameSelection />} />
            <Route exact path={routes.standings} element={<Standings />} />
            <Route exact path={routes.analysis} element={<Analysis />} />
            <Route
              exact
              path={`${routes.analysis}/:id`}
              element={<TeamAnalysis />}
            />
            <Route exact path={`${routes.teams}/:id`} element={<Team />} />
            <Route exact path={routes.players} element={<PlayerList />} />
            <Route exact path={`${routes.player}/:id`} element={<Player />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </App>
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);
