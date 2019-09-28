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
            <NavLink className="App-link" to={routes.standings}>
              standings
            </NavLink>
            <NavLink className="App-link" to={routes.schedule}>
              schedule
            </NavLink>
            <NavLink className="App-link" to={routes.players}>
              players
            </NavLink>
            {teams && teams.map(team => {
              return (<NavLink className="App-link" to={routes.teams + "/" + team.id} key={"link" + team.id}><img className="small-logo" src={team.logo} alt={"img" + team.id}></img></NavLink>);
            })}
            <NavLink to={routes.settings}>
              settings
            </NavLink>
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
