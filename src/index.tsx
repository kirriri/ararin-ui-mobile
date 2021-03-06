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