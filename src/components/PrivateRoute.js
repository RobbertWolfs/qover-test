import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import Logout from '../components/Logout';
import useUser from '../hooks/useUser';

export default function PrivateRoute({ children, ...rest }) {
    const loggedInUser = useUser();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                    loggedInUser.id ? (
                        <React.Fragment>
                            <Logout />
                            { children }
                        </React.Fragment>
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}
