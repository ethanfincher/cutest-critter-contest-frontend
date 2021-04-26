import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { verify } from '../actions/auth';

function Activate({ verify, match }) {
    const [verified, setVerified] = useState(false)

	function verify_account(event) {
		const uid = match.params.uid
        const token = match.params.token;

        verify(uid, token)
        setVerified(true)
	}

	if (verified) {
		return <Redirect to='/'></Redirect>;
	}

	return (
		<div className='container'>
			<div>
                <h1>Verify your Account:</h1>
                <button onClick={verify_account}>Verify</button>
            </div>
		</div>
	);
}

export default connect(null, { verify })(Activate);
