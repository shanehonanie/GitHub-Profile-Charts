import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (state, actions) => {
	switch (actions.type) {
		case SET_ALERT:
			return actions.payload;
		case REMOVE_ALERT:
			return null;
		default:
			return state;
	}
};
