class User {
    constructor(username, password, address='', role, token) {
        this.username = username;
        this.password = password;
        this.address = address;
        this.role = role;
        this.token = token;
    }
}

export {User};