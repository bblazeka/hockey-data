import React from 'react';

import logo from '../../logo.svg';
import './Loader.scss';

function Loader() {
    return (
        <div className="loader">
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    );
}

export default Loader;