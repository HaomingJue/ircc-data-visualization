import {  getLocal } from './localStorage';

export const checkLoginStatus = () => {
    let currentUser = getLocal('user');
    console.log(currentUser);
    if (currentUser?.token) {
        return true;
    }   
    return false;
}