import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.scss';
import routes from './routes';
import * as teamActions from './services/team/actions';
import { getLogo } from './util/assets';

import 'react-vis/dist/style.css';
import { Grid, Icon } from 'semantic-ui-react'

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
            <NavLink className="App-link" to={routes.games}>
              Games
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
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
              <div><a href="https://github.com/bblazeka/hockey-data.git" target="_blank" rel="noopener noreferrer"><Icon name="github" /></a></div>
                <div><Icon name="node" /> <Icon name="react" /> GraphQL, MongoDB
                </div>
              </Grid.Column>
              <Grid.Column>
                <div>Mapbox for maps</div>
                <div>Made using <a href="https://semantic-ui.com/">Semantic UI</a></div>
              </Grid.Column>
              <Grid.Column>
                <div>Logos: <a href="https://www.puckmarks.net/nhllogos">Puckmarks</a></div>
                <div>Icons made by <a href="https://www.flaticon.com/authors/prettycons" title="prettycons">prettycons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
