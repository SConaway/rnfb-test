'use strict';

import * as actions from './actions/actions';

const initialState = {data: [], checksum: ''};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.addMain:
			return {...state, data: [...state.data, action.data]};
		case actions.setChecksum:
			console.warn(action.checksum);
			return {...state, checksum: action.checksum};
		case actions.clear:
			return {...state, data: [], checksum: ''};
		default:
			return {...state};
	}
};

export default reducer;
