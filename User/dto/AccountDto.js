class AccountDto {
    balance;
    constructor(mapperId, type) {
        this.user_mapper_id = mapperId;
        this.type = type;
    }
}

module.exports = {
    AccountDto
}