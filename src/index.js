import React from 'react';
import * as ReactDOM from 'react-dom';
import App from './Components/App';
import 'bootstrap/dist/css/bootstrap.css';
import './Styles/main.css';
import 'core-js';
import 'raf/polyfill';
import 'intl';

if (!window.Intl) {
    require.ensure([], () => {
        require('intl');

        ReactDOM.render(<App/>, document.getElementById('root'))
    })
} else {
    ReactDOM.render(<App/>, document.getElementById('root'))
}
