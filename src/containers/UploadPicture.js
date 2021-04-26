import React, { useState } from 'react';
import { connect } from 'react-redux';
import { upload_picture } from '../actions/auth';

function UploadPicture({ isAuthenticated, user, upload_picture }) {
	console.log(isAuthenticated);
	console.log(user);
	const [URL, setURL] = useState({
        image_url: ""
    });

	const { image_url } = URL;

	function onChange(event) {
		setURL({ ...URL, [event.target.name]: event.target.value });
	}

	function onSubmit(event) {
		event.preventDefault();

		if (URL) {
			upload_picture(image_url)
		} else {
			console.log('something went wrong');
		}
	}

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					type='text'
					name='image_url'
					onChange={onChange}
					required></input>
				<button type='submit'>Click to Submit</button>
			</form>
		</div>
	);
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user,
});

export default connect(mapStateToProps, { upload_picture })(UploadPicture);
