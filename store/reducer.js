'use strict';

import * as actions from './actions/actions';

const initialState = {data: []};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.addMain:
			return {...state, data: [...state.data, action.data]};
		case actions.clear:
			return {...state, data: []};
		default:
			return {...state};
	}
};

export default reducer;
