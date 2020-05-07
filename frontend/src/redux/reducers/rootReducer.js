import {combineReducers} from 'redux';
import userReducer from './userReducer';
import messageReducer from './messageReducer';
import itemReducer from './itemReducer';

export default combineReducers({
    userReducer,
    itemReducer,
    messageReducer,
});