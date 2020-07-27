import { SET_ACTIVE_USER_PROFILE } from './../actions/constants';

export default function activeUserProfileReducer(state = 0, action){
  switch(action.type) {
      case SET_ACTIVE_USER_PROFILE:
      return action.payload;
    default:
      return state;
  }
}
