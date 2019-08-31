import React from 'react';
import logo from './logo.svg';
import './App.css';
import Schedule from './components/Schedule';

function App() {
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
      <Schedule></Schedule>
    </div>
  );
}

export default App;
