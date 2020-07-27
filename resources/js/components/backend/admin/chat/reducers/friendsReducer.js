import { FETCH_FRIENDS, FILTER_FRIENDS } from './../actions/constants';


const initState = { items: [], filteredItems: [], name: ""};

export default function friendsReducer(state = initState, action){
  switch(action.type) {
  	 case FETCH_FRIENDS:
      return action.payload;
    case FILTER_FRIENDS:
      return action.payload;
    default:
      return state;
  }
}
