import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUserSuccess } from '../store/action-creators/app';

export default function useUser() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    const [loggedInUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("qo-user");

            return savedUser ? JSON.parse(savedUser) : user;
        } catch (error) {
            return user;
        }
    });

    useEffect(() => {
        // save into store when it came from localstorage
        if (loggedInUser && !user) dispatch(loginUserSuccess(loggedInUser));
    }, [loggedInUser, dispatch, user]);

    return loggedInUser;
}


