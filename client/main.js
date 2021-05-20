import React from 'react';
import ReactDOM from 'react-dom';
import App from './shared/App';
import { Provider } from 'react-redux';

import './main.scss';
import store from './store';

let rootElement = document.getElementById('root_main');
ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>
   ,
   rootElement
);
