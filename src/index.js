import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import resultsReducer from "./redux/resultsSlice";
import loginReducer from "./redux/loginSlice";

const rootReducer = combineReducers({
    searchResultsState : resultsReducer,
    loginState : loginReducer,
})

const store = configureStore({
    reducer: rootReducer,
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
);
