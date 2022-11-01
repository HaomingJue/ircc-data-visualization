import axios from 'axios';

var BASE_URL = "http://127.0.0.1:8000"

class HttpRequest {

    constructor(type, url, object) {
        this.type = type;
        this.url = BASE_URL + url;
        this.object = object;
    }
};

const getLoginToken = async () => {
    return "test token";
}

const handleRequest = async (request) => {
    let token = await getLoginToken();
    console.log(token);
    let requestHeaders = {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        // 'Authorization': 'Bearer ' + token
    };
    try{
        // let url = requestHeaders.url;
        let url = request.url;
        // let url = "www.google.ca"
        switch(request.type) {
            case 'Get':
                return await axios.get(url, {headers: requestHeaders});
            case 'Post':
                return await axios.post(url, request.object, {headers: requestHeaders});
            case 'Put':
                return await axios.put(url, request.object, {headers: requestHeaders});
            case 'Delete':
                return await axios.delete(url, request.object, {headers: requestHeaders});
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