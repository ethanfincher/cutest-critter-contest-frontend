import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED_SUCCESS,
	USER_LOADED_FAIL,
	AUTHENTICATION_SUCCESS,
	AUTHENTICATION_FAIL,
	LOGOUT,
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
} from '../actions/types';

const initialState = {
	access: localStorage.getItem('access'),
	refresh: localStorage.getItem('refesh'),
	isAuthenticated: null,
	user: null,
};

export default function auth(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case AUTHENTICATION_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
			};
		case LOGIN_SUCCESS:
			localStorage.setItem('access', payload.access);
			return {
				...state,
				isAuthenticated: true,
				access: payload.access,
				refresh: payload.refresh,
			};
		case SIGNUP_SUCCESS:
			return {
				...state,
				isAuthenticated: false,
			};
		case USER_LOADED_SUCCESS:
			return {
				...state,
				user: payload,
			};
		case AUTHENTICATION_FAIL:
			return {
				...state,
				isAuthenticated: false,
			};
		case USER_LOADED_FAIL:
			return {
				...state,
				user: null,
			};
		case LOGIN_FAIL:
		case SIGNUP_FAIL:
		case LOGOUT:
			localStorage.removeItem('access');
			localStorage.removeItem('refresh');
			return {
				...state,
				isAuthenticated: null,
				access: null,
				refresh: null,
				user: null,
			};
		case FILE_UPLOADED_SUCCESS:
		case FILE_UPLOADED_FAIL:
		case PASSWORD_RESET_SUCCESS:
		case PASSWORD_RESET_FAIL:
		case PASSWORD_RESET_CONFIRM_FAIL:
		case PASSWORD_RESET_CONFIRM_SUCCESS:
		case ACTIVATION_SUCCESS:
		case ACTIVATION_FAIL:
			return {
				...state,
			};
		default:
			return state;
	}
}
