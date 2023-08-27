import axios from 'axios';
import { USER_REQUEST,USER_REQUEST_SUCCESS,USER_REQUEST_FAIL } from '../constants/userConstants';


//register action 
export const getData = (cityCode, domain) => async (dispatch) => {
    dispatch({ type: USER_REQUEST, payload: { cityCode, domain}});

    try{
        // use axios for http post request when user REGISTERg in 
        const { data } = await axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/hello', { cityCode, domain});
        // if success, dispatch success and set payload to data 
        dispatch({ type: USER_REQUEST_SUCCESS, payload:  data });
        //also dispatch SignIn_Success because userSignin.userInfo is what we use to valid user
        console.log(JSON.stringify(data));

    }catch(error) {
        // if error, dispatch FAIL, set payload to error message 
        dispatch({ type: USER_REQUEST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message});
    }
};