import { initialState } from '../initial-state';
import { SAVE_USER, SAVE_USER_ERRORS, RESET_USER, ADD_CARS, SET_QUOTE, SET_QUOTE_ERRORS } from '../action-types/app';

export const appReducer = function (state = initialState, action) {
    switch (action.type) {
        case SAVE_USER:
            return {
                ...state,
                user: action.user,
            };

        case SAVE_USER_ERRORS: 
            return {
                ...state,
                user: {
                    errors: action.errors,
                },
            };

        case RESET_USER:
            return {
                ...state,
                user: {
                    ...initialState.user,
                    loggedOut: true,
                },
            };

        case ADD_CARS: 
            return {
                ...state,
                cars: action.cars,
            };

        case SET_QUOTE:
            return {
                ...state,
                quote: {
                    accepted: true,
                    errors: {},
                    ...action.quote
                },
            };

        case SET_QUOTE_ERRORS: {
            return {
                ...state,
                quote: {
                    ...state.quote,
                    errors: action.errors,
                },
            };
        }

        default:
            return state;
    }
};


