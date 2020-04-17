import FilesystemStorage from 'redux-persist-filesystem-storage';
import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import {composeWithDevTools} from 'redux-devtools-extension';

import reducer from './reducer';

const store = createStore(
	persistReducer(
		{
			key: 'reducer',
			storage: FilesystemStorage,
			stateReconciler: autoMergeLevel1,
		},
		reducer,
	),
	composeWithDevTools(),
	// put `applyMiddleware(whatever's)` in those parenthesis
);

let persistor = persistStore(store);

export {store, persistor};
