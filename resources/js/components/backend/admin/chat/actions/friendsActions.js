import { FETCH_FRIENDS } from './constants';
import { FILTER_FRIENDS } from './constants';

export const fetchFriends = () => (dispatch) =>
new Promise(function(resolve, reject) {
	axios.get('/api/friends').then(response => {
		dispatch({
			type: FETCH_FRIENDS,
			payload: response.data
		});
		resolve();
	});
});

export const filterFriends = (name) => (dispatch) => 
new Promise(function(resolve, reject) {
	axios.get('/api/friends?name='+name).then(response => {
		dispatch({
			type: FETCH_FRIENDS,
			payload: response.data
		});
		resolve();
	});
});