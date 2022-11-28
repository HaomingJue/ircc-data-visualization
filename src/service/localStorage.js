import { handleRequest, HttpRequest } from "../model/http_request";

export const getLocal = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const setLocal = (key, object) => {
    localStorage.setItem(key, JSON.stringify(object));
}

export const clearLocal = (key) => {
    localStorage.removeItem(key);
}

export const updateLocal = () => {
    let user = getLocal('user');
    let request = new HttpRequest('Get', `/login/update/${user.userId}`);
    handleRequest(request).then((result) => updateUser(result.data)).catch((result) => alert('Login Error\n' + result.message + '\n' + result.request.response));
    return JSON.parse(localStorage.getItem('user'));
}

const updateUser = (data) => {
    const currentUser = getLocal('user');
    currentUser['firstName'] = data.first_name;
    currentUser['lastName'] = data.last_name;
    currentUser['email'] = data.email;
    currentUser['gender'] = data.user_gender;
    currentUser['address'] = data.user_address;
    currentUser['phone'] = data.user_phone;
    currentUser['icon'] = data.user_icon;
    currentUser['postcode'] = data.user_postcode;
    setLocal('user', currentUser);
}