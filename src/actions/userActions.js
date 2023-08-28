import axios from 'axios';
import { USER_REQUEST,USER_REQUEST_SUCCESS,USER_REQUEST_FAIL } from '../constants/userConstants';


//register action 
export const getData = (cityCode, domain,country,type,subscriber_id) => async (dispatch) => {
    dispatch({ type: USER_REQUEST, payload: { cityCode, domain,country,type,subscriber_id}});

    try{
        // use axios for http post request when user REGISTERg in 
        //const { data } = await axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/hello', { cityCode, domain});
        //const { data } = await axios.get('http://localhost:3030/output');

        const parameters = {};
        if(cityCode){
            parameters.cityCode = cityCode;
        }
        if(domain){
            parameters.domain = domain;
        }
        if(country){
            parameters.country = country; 
        }
        if(type){
            parameters.type = type;
        }
        if(subscriber_id){
            parameters.subscriber_id = subscriber_id;
        }

        const { data } = await axios.post('http://34.93.242.206/registry/lookup', parameters)
        // if success, dispatch success and set payload to data 
        dispatch({ type: USER_REQUEST_SUCCESS, payload:  data });
        //also dispatch SignIn_Success because userSignin.userInfo is what we use to valid user
        console.log(JSON.stringify(data));

    }catch(error) {
        // if error, dispatch FAIL, set payload to error message 
        dispatch({ type: USER_REQUEST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message});
    }
};