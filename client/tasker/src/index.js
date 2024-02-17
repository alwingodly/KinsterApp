import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/Store/storeConfig.js'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate persistor = {persistor}>
    <React.StrictMode>
    <App />
  </React.StrictMode>
    </PersistGate>
  </Provider>
);
