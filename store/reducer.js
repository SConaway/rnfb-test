'use strict';

import * as actions from './actions/actions';

const initialState = {data: '[]', checksum: 'b25b294cb4deb69ea00a4c3cf3113904801b6015e5956bd019a8570b1fe1d6040e944ef3cdee16d0a46503ca6e659a25f21cf9ceddc13f352a3c98138c15d6af'};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.addMain:
			return {...state, data: JSON.stringify([...(JSON.parse(state.data)), action.data])};
		case actions.setChecksum:
			return {...state, checksum: action.checksum};
		case actions.clear:
			return {...state, data: '[]', checksum: 'b25b294cb4deb69ea00a4c3cf3113904801b6015e5956bd019a8570b1fe1d6040e944ef3cdee16d0a46503ca6e659a25f21cf9ceddc13f352a3c98138c15d6af'};
		default:
			return {...state};
	}
};

export default reducer;
