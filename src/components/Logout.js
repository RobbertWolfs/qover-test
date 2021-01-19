import React, { useEffect } from 'react';
import { useDispatch, useSelector } from  'react-redux';
import { useHistory } from 'react-router-dom';

import styles from './Logout.module.css';

import { logoutUser } from '../store/action-creators/app';

function Logout() {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.loggedOut) history.push('/login');
    }, [user, history]);

    function logout() {
        dispatch(logoutUser());
        localStorage.removeItem('qo-user');
    }

    return (
        <button className={`btn btn--white ${styles.logoutButton}`} onClick={logout}>
            Log out
            <i className="fas fa-sign-out-alt"></i>
        </button>
    );
}

export default Logout;
