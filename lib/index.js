import React from 'react';
import ReactDOM from 'react-dom';
import './styles/focus.scss';
import * as serviceWorker from './serviceWorker';
import './styles/index.scss';
import Content from './router';
ReactDOM.render(React.createElement(Content, null), document.getElementById('root'));
serviceWorker.unregister();
// export { default as Button } from './components/Button/button'
// export { default as PrizeWheel } from './components/PrizeWheel/prizeWheel'
