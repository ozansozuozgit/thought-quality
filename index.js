import {AppRegistry, LogBox} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';

import {store} from './app/store';

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

LogBox.ignoreLogs(['Require cycle: node_modules/victory']);
AppRegistry.registerComponent(appName, () => RNRedux);
