import React, { Fragment } from 'react';
import { connect } from 'react-redux';

function Home({ isAuthenticated, user }) {
    console.log(isAuthenticated)
    console.log(user)
	const guestLinks = () => <Fragment>not logged in</Fragment>;

	const authLinks = () => (
		<Fragment>
			<p>welcome back, {!user ? null : user.name}</p>
		</Fragment>
	);

	return <div>
        <h1>Home</h1>
        {isAuthenticated ? authLinks() : guestLinks()}
        </div>;
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user,
});

export default connect(mapStateToProps)(Home);
