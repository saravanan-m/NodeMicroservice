const { UserDto } = require('../dto/UserDto');
const userInputMapper = require('../mappers/UserInputMapper')
const { user } = require('../models')

/**
 * Check user exist or not
 * @param {String} userName - The username
 * @returns {Promise<boolean>} - status
 */
const isUserExist = async (userName) => {
    const persistedUser = await user.findOne({
        where: {
            name: userName
        }
    });
    return persistedUser !== null;
}

/**
 * Save user detail on DB
 * @param {UserDto} data - The user dto
 * @returns {Promise<UserDto>} - The user dto
 */
const create = async (data) => {
    const persistedUser = await user.create(data)
    return userInputMapper.userEntityToDtoMap(persistedUser);
}

/**
 * Check user exist or not
 * @param {String} mapperId - mapper id
 * @returns {Promise<UserDto>} - The user dto
 */
const getUserByMapperId = async (mapperId) => {
    const persistedUser = await user.findOne({
        where: {
            mapper_id: mapperId
        }
    });

    let userDto = undefined;
    if (persistedUser != undefined) {
        userDto = userInputMapper.userEntityToDtoMap(persistedUser);
    }
    return userDto;
}

/**
 * Get all users
 * @returns {Promise<Array<UserDto>>} - The user dto
 */
const getAllUsers = async () => {
    const allUsers = await user.findAll();
    let userDtos = []
    for (const userEntity of allUsers){
        const dto = await userInputMapper.userEntityToDtoMap(userEntity);
        userDtos.push(dto);
    };
    return userDtos;
}

module.exports = {
    isUserExist,
    create,
    getUserByMapperId,
    getAllUsers
}