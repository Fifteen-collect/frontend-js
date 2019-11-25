import React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.css';

let preLastTouchStartAt = 0;
let lastTouchStartAt = 0;
const delay = 500;

document.addEventListener('touchstart', () => {
    preLastTouchStartAt = lastTouchStartAt;
    lastTouchStartAt = +new Date();
});
document.addEventListener('touchend', (event) => {
    const touchEndAt = +new Date();
    if (touchEndAt - preLastTouchStartAt < delay) {
        event.preventDefault();
        event.target.click();
    }
});

ReactDOM.render(<App/>, document.getElementById('root'));
