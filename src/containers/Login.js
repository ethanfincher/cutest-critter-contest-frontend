import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from '../actions/auth';

function Login({ login, isAuthenticated }) {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	function onChange(event) {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	}

	function onSubmit(event) {
		event.preventDefault();

		login(email, password);
	}

	if (isAuthenticated){
		return <Redirect to='/'></Redirect>
	}

	return (
		<div className='container mt-5'>
			<h1>Sign In</h1>
			<p>Sign in to your Account</p>
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
				<div className='form-group'>
					<input
						className='form-control'
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={onChange}
						minLength='6'
						required
					/>
				</div>
				<button className='btn btn-primary' type='submit'>
					Login
				</button>
			</form>
			<p className='mt-3'>
				Sign up here! <Link to='/signup'>Sign Up</Link>
			</p>
			<p className='mt-3'>
				Forgot your password? <Link to='/reset-password'>Reset Here</Link>
			</p>
		</div>
	);
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
