import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/focus.scss'
import * as serviceWorker from './serviceWorker';
import './styles/index.scss';
import Content from './router';

ReactDOM.render(
  <Content/>,
  document.getElementById('root')
);

serviceWorker.unregister();

// export { default as Button } from './components/Button/button'

// export { default as PrizeWheel } from './components/PrizeWheel/prizeWheel'

// export { default as Popup } from './components/Dialog/popup'

// export { default as Dialog } from './components/Dialog/dialog'
