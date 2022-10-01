import React from "react";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import styled from "styled-components";

import { useInitIDB, ConfigurationContext } from "util/indexedDB";
import { ErrorFallback } from "components";
import AppFooter from "AppFooter";

import routes from "./routes";
import AppHeader from "AppHeader";

const AppDiv = styled.div`
margin: 1px;
`;

const AppContainer = styled.div`
margin: 1em 5em 1em 5em;
min-height: 80vh;
`;

function App({ children }) {
  const navigate = useNavigate();
  const {
    database,
    getSelectedPlayers,
    saveSelectedPlayers,
    selectPlayer,
    removePlayer,
  } = useInitIDB();
  const context = {
    database,
    getSelectedPlayers,
    saveSelectedPlayers,
    selectPlayer,
    removePlayer,
  };

  function setActiveRoute(name) {
    navigate(routes[name]);
  }

  function goHome() {
    navigate("/");
  }

  return (
    <AppDiv>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => goHome()}>
        <AppHeader setActiveRoute={setActiveRoute} />
        <ConfigurationContext.Provider value={context}>
          <AppContainer>{children}</AppContainer>
        </ConfigurationContext.Provider>
          <AppFooter />
      </ErrorBoundary>
    </AppDiv>
  );
}

export default App;
