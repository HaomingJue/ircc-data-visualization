import axios from 'axios';
import { getLocal } from '../service/localStorage';

var BASE_URL = "https://irccdjangowebapp.azurewebsites.net"

class HttpRequest {

    constructor(type, url, object) {
        this.type = type;
        this.url = BASE_URL + url;
        this.object = object;
    }
};

const getLoginToken = () => {
    let user = getLocal('user');
    return user?.token;
}

const handleRequest = (request) => {
    let token = getLoginToken();
    let requestHeaders = {
        'Authorization': token && 'Token ' + token
    };
    try{
        let url = request.url;
        switch(request.type) {
            case 'Get':
                return axios({method: 'get', url, data: request.object, headers: requestHeaders});
            case 'Post':
                return axios({method: 'post', url, data: request.object, headers: requestHeaders});
            case 'Put':
                return axios({method: 'put', url, data: request.object, headers: requestHeaders});
            case 'Delete':
                return axios({method: 'delete', url, data: request.object, headers: requestHeaders});
            default:
                return null
        }
    } 
    catch (error) {
        console.log("An error occurs!")
        console.log(error)
        return error;
    }

}

export {HttpRequest, handleRequest};