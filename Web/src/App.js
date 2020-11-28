import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import routes from './routes';
import * as teamActions from './services/team/actions';

class App extends Component {

  constructor(props) {
    super(props)
    this.props.getTeams();
    this.props.getDropdownTeams();
  }

  render() {
    const { teams } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-menu">
            <NavLink className="App-link" to={routes.home}>
              Home
            </NavLink>
            <NavLink className="App-link" to={routes.prediction}>
              Prediction
            </NavLink>
            <NavLink className="App-link" to={routes.socialFeed}>
              Social Feed
            </NavLink>
            <NavLink className="App-link" to={routes.game}>
              Game
            </NavLink>
            <NavLink className="App-link" to={routes.lineup}>
              Lineup
            </NavLink>
            <NavLink className="App-link" to={routes.standings}>
              Standings
            </NavLink>
            <NavLink className="App-link" to={routes.schedule}>
              Schedule
            </NavLink>
            <NavLink className="App-link" to={routes.players}>
              Players
            </NavLink>
          </div>
          <div className="App-menu">
            {teams && teams.map(team => {
              return (<NavLink className="App-link" to={routes.teams + "/" + team.Id} key={"link" + team.Id}><img className="small-logo" src={team.Logo} alt={"img" + team.Id}></img></NavLink>);
            })}
          </div>
        </header>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  teams: state.team.teams
});

const mapDispatchToProps = (dispatch) => ({
  getTeams: () => dispatch(teamActions.getTeams()),
  getDropdownTeams: () => dispatch(teamActions.getDropdownTeams())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
