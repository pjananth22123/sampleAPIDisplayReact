import { 
    USER_REQUEST,
    USER_REQUEST_SUCCESS,
    USER_REQUEST_FAIL
} from '../constants/userConstants';

export const getDataReducer = (state = {loading: true, response: []}, action) => {
    switch(action.type) {
        case USER_REQUEST:
            return { loading: true};
        case USER_REQUEST_SUCCESS:
            return { loading: false, responseData: action.payload};
        case USER_REQUEST_FAIL: 
            return { loading: false, error: action.payload};
        default:
            return state;
    }
};
