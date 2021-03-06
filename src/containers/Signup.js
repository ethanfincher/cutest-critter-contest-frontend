import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { signup } from '../actions/auth';

function Signup({ signup, isAuthenticated }) {
	const [accountCreated, setAccountCreated] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		critters: '',
		password: '',
		re_password: '',
	});

	const { name, email, critters, password, re_password } = formData;

	function onChange(event) {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	}

	function onSubmit(event) {
		event.preventDefault();

		if (password === re_password) {
			signup(name, email, critters, password, re_password);
			setAccountCreated(true);
		}
	}

	if (isAuthenticated) {
		return <Redirect to='/'></Redirect>;
	}
	if (accountCreated) {
		return <Redirect to='/login'></Redirect>;
	}

	return (
		<div className='container mt-5'>
			<h1>Sign Up</h1>
			<p>Create your new account</p>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<input
						className='form-control'
						type='text'
						placeholder='Name'
						name='name'
						value={name}
						onChange={onChange}
						required
					/>
				</div>
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
					<div className='form-group'>
						<input
							className='form-control'
							type='text'
							placeholder='Pets'
							name='critters'
							value={critters}
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
					<div className='form-group'>
						<input
							className='form-control'
							type='password'
							placeholder='Confirm Password'
							name='re_password'
							value={re_password}
							onChange={onChange}
							minLength='6'
							required
						/>
					</div>
				</div>
				<button className='btn btn-primary' type='submit'>
					Register
				</button>
			</form>
			<p className='mt-3'>
				Already have an account? <Link to='/login'>Sign In</Link>
			</p>
		</div>
	);
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
