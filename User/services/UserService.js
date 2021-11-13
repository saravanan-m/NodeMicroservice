const accountService = require('./AccountService')
const userRepositories = require('../repositories/UserRepository')
const userResponseMaapper = require('../mappers/UserOutputMapper')
const userInputMapper = require('../mappers/UserInputMapper')
const { UserDto } = require('../dto/UserDto')

/**
 * Save user
 * @param {UserDto} userDto - The user dto
 * @returns {Promise<UserDto>}
 */
const create = async (userDto) => {
    if (await userRepositories.isUserExist(userDto.name)) {
        return userResponseMaapper.errorResponse('user already exist')
    }

    let savedUserDto = await userRepositories.create(userDto);

    try {
        let accountResponse = await accountService.createAccount(savedUserDto.mapper_id);
        if (accountResponse !== undefined) {
            savedUserDto.account = accountResponse
        } else {
            //this should be gracefully handled using queue
        }
    } catch (exception) {
        return userResponseMaapper.errorResponse('account creation failed');
    }

    return userResponseMaapper.successResponse(savedUserDto)
}

const get = async (mapperId) => {
    let userDto = await userRepositories.getUserByMapperId(mapperId);
    if (userDto === undefined) {
        return userResponseMaapper.errorResponse('user does not exist');
    }

    try {
        let accountDto = await accountService.getAccount(mapperId);
        if (accountDto != undefined) {
            userDto.account = accountDto
        }

    } catch (e) {
        console.log(e)
    }

    return userResponseMaapper.successResponse(userDto);
}

const getAll = async () => {
    const userDtos = await userRepositories.getAllUsers();
    await Promise.all(userDtos.map(async (userDto) => {
        let accountDto = await accountService.getAccount(userDto.mapper_id);
        userDto.account = accountDto
    }));
    return userResponseMaapper.successResponse(userDtos);;
}

module.exports = {
    create,
    get,
    getAll
}

