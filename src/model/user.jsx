class User {
    constructor(uuid, username, password, address, role, token, phone, postCode, icon, expireDate) {
        this.userId = uuid;
        this.username = username;
        this.password = password;
        this.address = address;
        this.role = role;
        this.token = token;
        this.phone = phone;
        this.postcode = postCode;
        this.icon = icon;
        this.expireDate = expireDate;
    }
}

export {User};