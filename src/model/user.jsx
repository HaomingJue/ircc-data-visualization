class User {
    constructor(response) {
        this.userId = response['user']['id'];
        this.username = response['user']['username'];
        this.password = response['user']['password'];
        this.address = response['user']['user_address'];
        this.postcode = response['user']['user_postcode'];
        this.role = response['user']['is_staff'];
        this.token = response['token'];
        this.phone = response['user']['user_phone'];
        this.icon = response['user']['user_icon'];
        this.expireDate = response['subscription']['expire_date'];
        this.userEmail = response['user']['email'];
        this.firstName = response['user']['first_name'];
        this.lastName = response['user']['last_name'];
        this.gender = response['user']['user_gender'];
        this.subId = response['subscription']['id'];
        this.planId = response['subscription']['plan_id'];
    }
}

export {User};