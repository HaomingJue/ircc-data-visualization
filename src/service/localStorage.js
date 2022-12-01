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
    currentUser['firstName'] = data['user']['first_name'];
    currentUser['lastName'] = data['user']['last_name'];
    currentUser['userEmail'] = data['user']['email'];
    currentUser['gender'] = data['user']['user_gender'];
    currentUser['address'] = data['user']['user_address'];
    currentUser['phone'] = data['user']['user_phone'];
    currentUser['icon'] = data['user']['user_icon'];
    currentUser['subId'] = data['subscription']['id'];
    currentUser['planId'] = data['subscription']['plan_id'];
    currentUser['expireDate'] = data['subscription']['expire_date'];
    setLocal('user', currentUser);
}