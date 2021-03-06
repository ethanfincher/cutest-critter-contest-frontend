import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Activate from './containers/Activate';
import Login from './containers/Login';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Signup from './containers/Signup';
import Pictures from './containers/Pictures'
import UploadPicture from './containers/UploadPicture';
import Winners from './containers/Winners'

import { Provider } from 'react-redux';
import store from './store';

import Layout from './hocs/Layouts';

export default function App() {
	return (
		<Provider store={store}>
			<Router>
				<Layout>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/login' component={Login} />
						<Route exact path='/signup' component={Signup} />
						<Route exact path='/reset-password' component={ResetPassword} />
						<Route
							exact
							path='/password/reset/confirm/:uid/:token'
							component={ResetPasswordConfirm}
						/>
						<Route
							exact
							path='/upload-picture'
							component={UploadPicture} />
						<Route exact path='/pictures' component={Pictures} />
						<Route exact path='/activate/:uid/:token' component={Activate} />
						<Route exact path='/winners' component={Winners} />
					</Switch>
				</Layout>
			</Router>
		</Provider>
	);
}
