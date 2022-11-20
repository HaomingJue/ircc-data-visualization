export const getLocal = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const setLocal = (key, object) => {
    localStorage.setItem(key, JSON.stringify(object));
}

export const clearLocal = (key) => {
    localStorage.removeItem(key);
}