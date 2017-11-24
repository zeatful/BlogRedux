import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'; // reducer is too generic, should also alias it this way
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({form: formReducer, posts: PostsReducer});

export default rootReducer;