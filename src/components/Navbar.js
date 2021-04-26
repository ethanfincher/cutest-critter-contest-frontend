import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

function Navbar({ logout, isAuthenticated, user }) {
	const guestLinks = () => (
		<Fragment>
			<li>
				<Link to='/login'>Login</Link>
			</li>
			<li>
				<Link to='/signup'>Sign Up</Link>
			</li>
		</Fragment>
	);

	const authLinks = () => (
		<Fragment>
			<li>
				<a href='#!' onClick={logout}>
					Logout
				</a>
			</li>
			<li>
				<Link to='/upload-picture'>Upload Picture</Link>
			</li>
			<li>
				<Link to='/pictures'>Pictures Page</Link>
			</li>
			<li>
				<Link to='/winners'>Winners</Link>
			</li>
		</Fragment>
	);

	return (
		<div>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				{isAuthenticated ? authLinks() : guestLinks()}
			</ul>
			{console.log(user)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
