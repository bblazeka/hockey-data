import React from 'react';

import logo from '../logo.svg';
import './Loader.css';

function Loader() {
    return (
        <div>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    );
}

export default Loader;