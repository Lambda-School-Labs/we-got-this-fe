import React from 'react';

const Error = ({ touched, message }) => {
    if (!touched) {
        return <div className='form-message invalid'>&nbsp;</div>
    }
    if (message) {
        return <div className='form-message invalid'>{message}</div>
    }
    return <div className='form-message invalid'>all good</div>
}

export default Error;