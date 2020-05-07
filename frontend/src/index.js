import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import { createStore } from 'redux';
import rootReducer from './redux/reducers/rootReducer.js';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(rootReducer);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);