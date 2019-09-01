import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {

render() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
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
