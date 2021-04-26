import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { reset_password_confirm } from '../actions/auth';

function ResetPasswordConfirm({ match, reset_password_confirm }) {
	const [requestSent, setRequestSent] = useState(false);
	const [formData, setFormData] = useState({
		new_password: '',
		re_new_password: '',
	});

	const { new_password, re_new_password } = formData;

	function onChange(event) {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	}

	function onSubmit(event) {
		event.preventDefault();

		const uid = match.params.uid;
		const token = match.params.token;

		reset_password_confirm(uid, token, new_password, re_new_password);
		setRequestSent(true);
	}

	if (requestSent) {
		return <Redirect to='/'></Redirect>;
	}

	return (
		<div className='container mt-5'>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<input
						className='form-control'
						type='password'
						placeholder='New Password'
						name='new_password'
						value={new_password}
						onChange={onChange}
						minLength='6'
						required
					/>
					<input
						className='form-control'
						type='password'
						placeholder='Confirm New Password'
						name='re_new_password'
						value={re_new_password}
						onChange={onChange}
						minLength='6'
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

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
