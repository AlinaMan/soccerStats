import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import App from './App';
import RootStore from './stores/RootStore';

ReactDOM.render(
  <React.StrictMode>
    <Provider RootStore={RootStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);