const accountRepository = require('../repositories/AccountsRepository')
const accountInputMapper = require('../mappers/AccountInputMapper')
const accountOutputMapper = require('../mappers/AccountOutputMapper')
const { AccountDto } = require('../dto/AccountDto')

/**
 * Create account for an user
 * @param {String} userMapperId - mapper id
 * @returns {Promise<AccountDto>}
 */
const createAccount = async (userMapperId) => {
   let accountDto = await accountInputMapper.accountDtoMap(userMapperId);
   const accountResposne = await accountRepository.createAccountApi(accountDto);
   accountDto = await accountInputMapper.accountJsonToDtoMap(accountResposne.data);
   return accountDto
}


/**
 * Get account of an user
 * @param {String} userMapperId - mapper id
 * @returns {Promise<AccountDto>}
 */
const getAccount = async (userMapperId) => {
   const accountResposne = await accountRepository.getAccountApi(userMapperId);
   const accountDto = await accountInputMapper.accountJsonToDtoMap(accountResposne.data);
   return accountDto
}

module.exports = {
   createAccount,
   getAccount
}