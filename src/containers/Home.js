import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

function Home({ isAuthenticated, user }) {
	console.log(isAuthenticated);
	console.log(user);
	const guestLinks = () => <Fragment>not logged in</Fragment>;

	function theButton() {
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
					const users = res.data.filter((item) => {
						return !item.is_winner && item.image_url;
					});
					const winnerImage =
						users[Math.floor(Math.random() * users.length)].image_url;
						
						
					try {
						axios.patch(
							`${process.env.REACT_APP_API_URL}/auth/users/me/`,
							{image_url: winnerImage},
							config
						);
					} catch (err) {
						console.log(err);
					}
				});
		} catch (err) {
			console.log(err);
		}
	}

	const authLinks = () => (
		<div>
			{!user ? null : (
				<div>
					{user.email === 'cutestcrittercontest@gmail.com' ? (
						<button onClick={theButton}>THE BUTTON</button>
					) : (
						<p>Welcome Back, {user.name}</p>
					)}
				</div>
			)}
		</div>
	);

	return (
		<div>
			<h1>Home</h1>
			{isAuthenticated ? authLinks() : guestLinks()}
		</div>
	);
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user,
});

export default connect(mapStateToProps)(Home);
