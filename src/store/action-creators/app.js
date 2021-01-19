import { SAVE_USER, SAVE_USER_ERRORS, RESET_USER, ADD_CARS, SET_QUOTE, SET_QUOTE_ERRORS } from '../action-types/app';

export function loginUserSuccess(user) {
    return {
        type: SAVE_USER,
        user,
    };
}

function loginUserFailed(errors) {
    return {
        type: SAVE_USER_ERRORS,
        errors,
    };
}

function logoutSuccess() {
    return {
        type: RESET_USER,
    };
}

export function loginUser(credentials) {
    return async (dispatch, getState, { AUTH_URI} ) => {
        try {
            const response = await fetch(`${AUTH_URI}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (!response.ok) {
                dispatch(loginUserFailed(data.errors));
                return;
            }

            dispatch(loginUserSuccess(data.user));
            localStorage.setItem('qo-user', JSON.stringify(data.user));
        } catch (error) {
            console.log('login user failed', error);
        }
    };
}

export function logoutUser() {
    return async (dispatch, getState, { AUTH_URI } ) => {
        try {
            await fetch(`${AUTH_URI}/logout`, {
                method: 'POST',
            });

            localStorage.removeItem('qo-user');
            dispatch(logoutSuccess());
        } catch (error) {
            console.log('logout user failed', error);
        }
    };
}

function addCarsSuccess(cars) {
    return {
        type: ADD_CARS,
        cars,
    };
}

export function addCars() {
    return async (dispatch, getState, { API_URI }) => {
        try {
            const response = await fetch(
                `${API_URI}/cars`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (!response.ok || response.status === 401) {
                dispatch(logoutUser());
                return;
            }

            const data = await response.json();
            dispatch(addCarsSuccess(data.cars));
        } catch(error) {
            console.log('failed to load cars', error);
        }
    };
}

function getQuoteSuccess(quote) {
    return {
        type: SET_QUOTE,
        quote,
    };
}

function getQuoteFailed(errors) {
    return {
        type: SET_QUOTE_ERRORS,
        errors,
    };
}

export function getQuote(quote) {
    return async (dispatch, getState, { API_URI }) => {
        try {
            const response = await fetch(
                `${API_URI}/quote`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(quote),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                dispatch(getQuoteFailed(data.errors));
                return;
            }
            
            dispatch(getQuoteSuccess(data.quote));
        } catch(error) {
            console.log('failed to get quote', error);
        }
    };
}
