import axios from 'axios';

var BASE_URL = "https://irccdjangowebapp.azurewebsites.net"

class HttpRequest {

    constructor(type, url, object) {
        this.type = type;
        this.url = BASE_URL + url;
        this.object = object;
    }
};

const getLoginToken = (id) => {
    return localStorage.getItem(id);
}

const handleRequest = async (request) => {
    let token = await getLoginToken("");
    let requestHeaders = {
        'Authorization': token && 'Token ' + token
    };
    console.log("requestHeaders:", requestHeaders);
    try{
        let url = request.url;
        switch(request.type) {
            case 'Get':
                return await axios({method: 'get', url, data: request.object});
            case 'Post':
                return await axios({method: 'post', url, data: request.object, headers: requestHeaders});
            case 'Put':
                return await axios({method: 'put', url, data: request.object, headers: requestHeaders});
            case 'Delete':
                return await axios({method: 'delete', url, data: request.object, headers: requestHeaders});
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