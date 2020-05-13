import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/reducers/rootReducer.js';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

<<<<<<< HEAD
const store = createStore((rootReducer), applyMiddleware(thunk));
=======
const store = createStore(rootReducer, applyMiddleware(thunk));
>>>>>>> 961936151dd82a393a28dde495ca7f5376271918

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