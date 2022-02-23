import React, { useEffect, useState } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Dropdown, Menu } from "semantic-ui-react";
import { ErrorBoundary } from "react-error-boundary";

import "./App.scss";
import routes from "./routes";
import * as leagueActions from "./services/league/actions";
import { getLogo } from "./util/assets";
import { ErrorFallback } from "./components";
import AppFooter from "AppFooter";

import { useInitIDB, ConfigurationContext } from "util/indexedDB";
import { selectApp } from "services/selectors";
import Loader from "components/Loader/Loader";

function App({ children, history }) {
  const [activeItem, setActiveItem] = useState("home");
  const dispatch = useDispatch();
  const { divisionsWithTeams } = useSelector(selectApp);

  useEffect(() => {
    dispatch(leagueActions.getDivisionsWithTeams());
  }, []);
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

  function handleItemClick(e, { name }) {
    setActiveItem(name);
    history.push(routes[name]);
  }

  const headerButtons = [
    "home",
    "analysis",
    "games",
    "standings",
    "schedule",
    "players",
  ];

  function goHome() {
    window.location = "/";
  }

  if (!database) {
    return <Loader />;
  }

  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => goHome()}>
        <header>
          <Menu inverted stackable>
            {headerButtons.map((button) => {
              return (
                <Menu.Item
                  key={button}
                  name={button}
                  active={activeItem === button}
                  onClick={handleItemClick}
                />
              );
            })}
            ;
            <Dropdown pointing text="Teams" className="link item">
              <Dropdown.Menu>
                {divisionsWithTeams &&
                  divisionsWithTeams.map((division) => {
                    return [
                      <Dropdown.Header
                        key={`divheader${division.id}`}
                        className="dropdown-division-name"
                      >
                        {division.name}
                      </Dropdown.Header>,
                      <Dropdown.Item key={`divitems${division.id}`}>
                        {division.teams.map((team) => {
                          return (
                            <NavLink
                              className="App-link"
                              to={`${routes.teams}/${team.id}`}
                              key={`link${team.id}`}
                            >
                              <img
                                className="small-logo"
                                src={getLogo(team.id)}
                                alt={`img${team.id}`}
                              />
                            </NavLink>
                          );
                        })}
                      </Dropdown.Item>,
                    ];
                  })}
              </Dropdown.Menu>
            </Dropdown>
          </Menu>
        </header>
        <ConfigurationContext.Provider value={context}>
          <div className="App-container">{children}</div>
        </ConfigurationContext.Provider>
        <footer className="footer">
          <AppFooter />
        </footer>
      </ErrorBoundary>
    </div>
  );
}

export default withRouter(App);
