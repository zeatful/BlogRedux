import _ from 'lodash';
import {FETCH_POSTS, FETCH_POST} from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    case FETCH_POST:
      // use spread operator to keep current state use variable interpolation to
      // create new key:value pair in object [action.payload.data.id] is interpolation
      // to a key, not defining an array
      return {
        ...state,
        [action.payload.data.id]: action.payload.data
      };
    default:
      return state;
  }
}