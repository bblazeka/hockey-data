import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import routes from './routes';
import * as teamActions from './services/team/actions';
import { getLogo } from './util/assets';

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
            <NavLink className="App-link" to={`${routes.game}/0`}>
              Game
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
              return (
                <NavLink className="App-link" to={`${routes.teams}/${team.id}`} key={`link${team.id}`}>
                  <img className="small-logo" src={getLogo(team.id)} alt={`img${team.id}`} />
                </NavLink>);
            })}
          </div>
        </header>
        <div className="App-container">{this.props.children}</div>
        <footer className="footer">
          <div>Made using <a href="https://semantic-ui.com/">Semantic UI</a></div>
          <div>Logos: <a href="https://www.puckmarks.net/nhllogos">Puckmarks</a></div>
          <div>Icons made by <a href="https://www.flaticon.com/authors/prettycons" title="prettycons">prettycons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          <div>Mapbox for maps</div>
        </footer>
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
