class UserDto {
    id;
    mapper_id;
    AccountDto;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

module.exports = {
    UserDto
}