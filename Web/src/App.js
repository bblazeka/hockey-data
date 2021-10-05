import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Dropdown, Menu } from "semantic-ui-react";
import { ErrorBoundary } from "react-error-boundary";

import "./App.scss";
import routes from "./routes";
import * as leagueActions from "./services/league/actions";
import { getLogo } from "./util/assets";
import { ErrorFallback } from "./components";
import AppFooter from "AppFooter";

class App extends Component {
  constructor(props) {
    super(props);
    this.props.getDivisionsWithTeams();
    this.state = {
      activeItem: "home",
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
    this.props.history.push(routes[name]);
  }

  render() {
    const { activeItem } = this.state;
    const { divisionsWithTeams } = this.props;
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

    return (
      <div className="App">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => goHome()}
        >
          <header>
            <Menu inverted stackable>
              {headerButtons.map((button) => {
                return (
                  <Menu.Item
                    key={button}
                    name={button}
                    active={activeItem === button}
                    onClick={this.handleItemClick}
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
          <div className="App-container">{this.props.children}</div>
          <footer className="footer">
            <AppFooter />
          </footer>
        </ErrorBoundary>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  teams: state.team.teams,
  divisionsWithTeams: state.league.divisionsWithTeams,
});

const mapDispatchToProps = (dispatch) => ({
  getDivisionsWithTeams: () => dispatch(leagueActions.getDivisionsWithTeams()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
