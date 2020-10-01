const db = require('../models')
const { v4: uuidv4 } = require('uuid')
const accountApiService = require('./AccountApiService')

const user = db.user

exports.create = async (data) => {
    var usertmp = {
        name: data.name,
        age: data.age,
        mapper_id: uuidv4()
    }

    usertmp = await user.create(usertmp);
    try {
        var accountResponse = await accountApiService.createAccountApi(usertmp.mapper_id)
        if (accountResponse.status == 200) {
            return usertmp;
        }
    } catch (exception) {
        console.log(exception)
    }

    //this should be gracefully handled using queue
    return { 'status': 'account creation failed' }
}

exports.get = async (id, withAccounts) => {
    var userTmp = await user.findOne({
        where: {
            mapper_id: id
        }
    })

    try {
        if (withAccounts) {
            var accountResponse = await accountApiService.getAccountApi(id);
            if (accountResponse.status == 200) {
                userTmp['account'] = accountResponse.data
            }
        }
    } catch (e) {
        console.log(e)
    }

    return userTmp
}

exports.getAll = async () => {
    return user.findAll()
}

