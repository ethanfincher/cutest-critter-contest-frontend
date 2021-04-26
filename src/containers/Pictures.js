import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

function Pictures({ isAuthenticated, user }) {
	const [allUsers, setAllUsers] = useState([]);

	function getAllUsers() {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `JWT ${localStorage.getItem('access')}`,
				Accept: 'application/json',
			},
		};
		try {
			const res = axios.get(`${process.env.REACT_APP_API_URL}/auth/users/`, config);
			console.log(res.data);
			setAllUsers(res.data);
		} catch (err) {
			console.log(err);
		}
	}

    useEffect(() => {
			getAllUsers()
		}, []);

	return <div>pictures page</div>;
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user,
});

export default connect(mapStateToProps)(Pictures);
