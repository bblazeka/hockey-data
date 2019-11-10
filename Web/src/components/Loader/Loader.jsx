import React from 'react';

import logo from '../../logo.svg';
import './Loader.css';

function Loader() {
    return (
        <div className="loader">
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    );
}

export default Loader;