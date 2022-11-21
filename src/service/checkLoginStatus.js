import {  getLocal } from './localStorage';

export const checkLoginStatus = () => {
    let currentUser = getLocal('user');
    if (currentUser?.token) {
        return true;
    }   
    return false;
}