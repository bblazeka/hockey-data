import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import routes from './routes';
import * as appActions from './actions/appActions';

class App extends Component {

  constructor(props) {
    super(props)
    this.props.getTeams()
  }

  render() {
    const { teams } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-menu">
          <NavLink className="App-link" to={routes.prediction}>
              Prediction
            </NavLink>
            <NavLink className="App-link" to={routes.news}>
              News
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
            <NavLink className="App-link" to={routes.settings}>
              Settings
            </NavLink>
          </div>
          <div className="App-menu">
            {teams && teams.map(team => {
              return (<NavLink className="App-link" to={routes.teams + "/" + team.id} key={"link" + team.id}><img className="small-logo" src={team.logo} alt={"img" + team.id}></img></NavLink>);
            })}
          </div>
        </header>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  teams: state.app.teams,
});

const mapDispatchToProps = (dispatch) => ({
  getTeams: () => dispatch(appActions.getTeams()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
