import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

function Pictures({ isAuthenticated, user }) {
	const [winners, setWinners] = useState([]);

	function getAllUsers() {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `JWT ${localStorage.getItem('access')}`,
				Accept: 'application/json',
			},
		};
		try {
			axios
				.get(`${process.env.REACT_APP_API_URL}/auth/users/`, config)
				.then(function (res) {
					setWinners(res.data.filter((item)=>{
                        return item.is_winner
                    }));
				});
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getAllUsers();
	}, []);

	return (
		<div>
			<p>pictures page</p>
			{winners.map((user) => {
				return <img src={user.image_url} alt='' key={user.id}/>;
			})}
		</div>
	);
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user,
});

export default connect(mapStateToProps)(Pictures);
