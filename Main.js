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
	const add = () => {
		let string = '';

		for (let i = 0; i < 100000; i++) {
			string = string + uuid.v4();
		}

		props.addMain(string);
	};

	const digest = async () => {
		const digest = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA512,
			props.data,
		);

		props.setChecksum(digest);
	};

	const check = async () => {
		const newDigestFromReduxData = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA512,
			props.data,
		);

		if (newDigestFromReduxData != props.checksum) setMatchError(true);
		else setMatchError(false);
	};

	useEffect(() => {
		check();
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
						check();
					}}
					title="Check"
				/>
				<Button
					onPress={() => {
						digest();
					}}
					title="Digest"
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
