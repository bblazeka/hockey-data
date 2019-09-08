import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import routes from './routes';

class App extends Component {

render() {
  return (
    <div className="App">
      <header className="App-header">
        <NavLink className="App-link" to={routes.teams}> Teams </NavLink>
        <NavLink className="App-link" to={routes.standings}> Standings </NavLink>
        <NavLink className="App-link" to={routes.schedule}> Schedule </NavLink>
      </header>
      {this.props.children}
    </div>
  );
}
}

const mapState = (state) => ({
});

const mapDispatch = (dispatch) => ({
  hide: () => dispatch(),
});

export default withRouter(connect(mapState,mapDispatch)(App));
