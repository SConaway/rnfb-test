import React, {useState, useEffect} from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
	Button,
} from 'react-native';

import {connect} from 'react-redux';

import uuid from 'uuid';
import * as Crypto from 'expo-crypto';

import * as actionTypes from './store/actions/actions';

const mapStateToProps = (state) => {
	return {
		data: state.data,
		checksum: state.checksum,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setChecksum: (checksum) =>
			dispatch({type: actionTypes.setChecksum, checksum: checksum}),
		addMain: (data) => dispatch({type: actionTypes.addMain, data: data}),
		clear: () => dispatch({type: actionTypes.clear}),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)((props) => {
	const add = async () => {
		let string = '';

		for (let i = 0; i < 10000; i++) {
		    string = string + uuid.v4();
		}

		console.log(`before: ${props.data}`);
		props.addMain(string);
		console.log(`after: ${props.data}`);

		const digest = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA512,
			JSON.stringify(props.data),
		);

		props.setChecksum(digest);

		await check();
	};

	const check = async () => {
		const newDigestFromReduxData = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA512,
			JSON.stringify(props.data),
		);
        
        // This is always setting the error, even when it shouldn't be 
        // I think redux hasn't updated props.data and/or props.checksum by 
        // the time this code runs
		if (newDigestFromReduxData != props.checksum) setMatchError(true); 
		else setMatchError(false);
	};

	useEffect(() => {
		check();
		// add();
	}, []);

	const [matchError, setMatchError] = useState(false);

	return (
		<>
			<StatusBar barStyle="dark-content" />
			<View style={styles.container}>
				<Text style={styles.sizeText}>
					Size (in kilobytes):{' '}
					{JSON.stringify(props.data).length / 1024}
				</Text>
				<Text style={styles.sizeText}>Length: {props.data.length}</Text>
				<Text style={styles.sizeText}>
					Error: {matchError ? 'Yes' : 'No'}
				</Text>
				<Button
					onPress={() => {
						add();
					}}
					title="Add"
				/>
				<Button
					onPress={() => {
						props.clear();
						setMatchError(false);
					}}
					title="Clear"
				/>
			</View>
		</>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
});
