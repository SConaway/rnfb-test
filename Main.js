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

import * as actionTypes from './store/actions/actions';

const mapStateToProps = (state) => {
	return {
		data: state.data,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
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

		for (let i = 0; i < 10000; i++) {
            string = string + uuid.v4();
		}

		props.addMain(string);

		setNumber(number + 1);

		setSaved([...saved, string]);

		saved.forEach((item, index) => {
			if (props.data[index] != item) setMatchError(true);
		});
	};

	useEffect(() => {
		add();
	}, []);

	const [number, setNumber] = useState(0);
	const [saved, setSaved] = useState([]);
	const [matchError, setMatchError] = useState(false);

	return (
		<>
			<StatusBar barStyle="dark-content" />
			<View style={styles.container}>
				<Text style={styles.sizeText}>
					Size (in kilobytes): {JSON.stringify(props.data).length / 1024}
				</Text>
				<Text style={styles.sizeText}>Length: {props.data.length}</Text>
				<Text style={styles.sizeText}>
					Error: {matchError ? 'Yes' : 'No'}
				</Text>
				<Button onPress={add} title="Add" />
				<Button
					onPress={() => {
						props.clear();
						setNumber(0);
						setSaved([]);
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
