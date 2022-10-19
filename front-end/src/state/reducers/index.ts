import { combineReducers } from 'redux';
import logginReducer from './loginReducer';


const reducers = combineReducers({
        user: logginReducer,
});

export default reducers;