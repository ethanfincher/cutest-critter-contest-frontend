import axios from 'axios';
import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED_SUCCESS,
	USER_LOADED_FAIL,
	AUTHENTICATION_SUCCESS,
	AUTHENTICATION_FAIL,
	PASSWORD_RESET_SUCCESS,
	PASSWORD_RESET_FAIL,
	PASSWORD_RESET_CONFIRM_FAIL,
	PASSWORD_RESET_CONFIRM_SUCCESS,
	SIGNUP_SUCCESS,
	SIGNUP_FAIL,
	ACTIVATION_SUCCESS,
	ACTIVATION_FAIL,
	FILE_UPLOADED_SUCCESS,
	FILE_UPLOADED_FAIL,
	LOGOUT,
} from './types';

export const checkAuthenticated = () => async (dispatch) => {
	if (localStorage.getItem('access')) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		};

		const body = JSON.stringify({ token: localStorage.getItem('access') });

		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
				body,
				config
			);

			if (res.data.code !== 'token_not_valid') {
				dispatch({
					type: AUTHENTICATION_SUCCESS,
				});
			} else {
				dispatch({
					type: AUTHENTICATION_FAIL,
				});
			}
		} catch (err) {
			dispatch({
				type: AUTHENTICATION_FAIL,
			});
		}
	} else {
		dispatch({
			type: AUTHENTICATION_FAIL,
		});
	}
};

export const load_user = () => async (dispatch) => {
	if (localStorage.getItem('access')) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `JWT ${localStorage.getItem('access')}`,
				Accept: 'application/json',
			},
		};

		try {
			const res = await axios.get(
				`${process.env.REACT_APP_API_URL}/auth/users/me/`,
				config
			);

			dispatch({
				type: USER_LOADED_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: USER_LOADED_FAIL,
			});
		}
	} else {
		dispatch({
			type: USER_LOADED_FAIL,
		});
	}
};

export const upload_picture = (image_url) => async (dispatch) => {
	if (localStorage.getItem('access')) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `JWT ${localStorage.getItem('access')}`,
				Accept: 'application/json',
			},
		};

		const body = JSON.stringify({ image_url });

		try {
			await axios.patch(
				`${process.env.REACT_APP_API_URL}/auth/users/me/`,
				body,
				config
			);

			dispatch({
				type: FILE_UPLOADED_SUCCESS,
			});
			dispatch(load_user());
		} catch (err) {
			console.log(err);
			dispatch({
				type: FILE_UPLOADED_FAIL,
			});
		}
	} else {
		dispatch({
			type: FILE_UPLOADED_FAIL,
		});
	}
};

export const reset_password_confirm = (
	uid,
	token,
	new_password,
	re_new_token
) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ uid, token, new_password, re_new_token });

	try {
		await axios.post(
			`${process.env.REACT_APP_API_URL}/auth/auth/users/reset_password_confirm/`,
			body,
			config
		);
		dispatch({
			type: PASSWORD_RESET_CONFIRM_SUCCESS,
		});
	} catch (err) {
		dispatch({
			type: PASSWORD_RESET_CONFIRM_FAIL,
		});
	}
};

export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
			body,
			config
		);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		dispatch(load_user());
	} catch (err) {
		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

export const signup = (name, email, critters, password, re_password) => async (
	dispatch
) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ name, email, critters, password, re_password });

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/auth/users/`,
			body,
			config
		);

		dispatch({
			type: SIGNUP_SUCCESS,
			payload: res.data,
		});

		dispatch(load_user());
	} catch (err) {
		dispatch({
			type: SIGNUP_FAIL,
		});
	}
};

export const verify = (uid, token) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ uid, token });

	try {
		await axios.post(
			`${process.env.REACT_APP_API_URL}/auth/users/activation/`,
			body,
			config
		);

		dispatch({
			type: ACTIVATION_SUCCESS,
		});

		dispatch(load_user());
	} catch (err) {
		dispatch({
			type: ACTIVATION_FAIL,
		});
	}
};

export const reset_password = (email) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ email });

	try {
		await axios.post(
			`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,
			body,
			config
		);
		dispatch({
			type: PASSWORD_RESET_SUCCESS,
		});
	} catch (err) {
		dispatch({
			type: PASSWORD_RESET_FAIL,
		});
	}
};

export const logout = () => (dispatch) => {
	dispatch({
		type: LOGOUT,
	});
};