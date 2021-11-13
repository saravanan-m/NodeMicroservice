const { UserDto } = require('../dto/UserDto')
const { User } = require('../models/user')

const { v4: uuidv4 } = require('uuid')

/**
 * Maps input user json into userdto
 * @param {JSON} user - The user
 * @returns {Promise<UserDto>}
 */
const userToDtoMap = async (user) => {
    let userDto = new UserDto(user.name, user.age);
    userDto.mapper_id = uuidv4();
    return userDto;
}

/**
 * User model to userdto map
 * @param {User} user - The user model
 * @returns {Promise<UserDto>}
 */
const userEntityToDtoMap = async (user) => {
    let userDto = new UserDto(user.name, user.age);
    userDto.id = user.id
    userDto.mapper_id = user.mapper_id;
    return userDto;
}

module.exports = {
    userToDtoMap,
    userEntityToDtoMap
}