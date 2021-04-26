import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { reset_password } from '../actions/auth';

function ResetPassword({ reset_password }) {
	const [requestSent, setRequestSent] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
	});

	const { email } = formData;

	function onChange(event) {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	}

	function onSubmit(event) {
		event.preventDefault();

		reset_password(email);
		setRequestSent(true);
	}

	if (requestSent) {
		return <Redirect to='/'></Redirect>;
	}

	return (
		<div className='container mt-5'>
			<h1>Request Password Reset Email</h1>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<input
						className='form-control'
						type='email'
						placeholder='Email'
						name='email'
						value={email}
						onChange={onChange}
						required
					/>
				</div>

				<button className='btn btn-primary' type='submit'>
					Reset Now
				</button>
			</form>
		</div>
	);
}

export default connect(null, { reset_password })(ResetPassword);
