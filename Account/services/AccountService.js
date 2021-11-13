const db = require('../models')
const transactionApi = require('./TransactionApiService')

const account = db.account

exports.create = async (data) => {
    const outputTmp = {
        ...data,
        balance: 0
    }
    var accountModel = await account.findOne({
        where: {
            user_mapper_id: data.user_mapper_id
        }
    })

    if (accountModel == null) {
        return await account.create(outputTmp);
    }

    return accountModel
}

exports.get = async (id, withTransaction) => {
    var accountTmp = await account.findOne({
        where: {
            user_mapper_id: id
        }
    })

    //console.log('account' +withTransaction)
    try {
        if (withTransaction) {
            var transResponse = await transactionApi.getTransactionApi(accountTmp.id);
            if (transResponse.status == 200) {
                accountTmp['transaction'] = transResponse.data
            }
        }
    } catch (e) {
        console.log(e)
    }

    return accountTmp
}

exports.update = async (amount, isCredit, userMapperId) => {

    var accountTmp = await account.findOne({
        where: {
            user_mapper_id: userMapperId
        }
    })

    if (accountTmp != null) {
        var balance = accountTmp.balance
        if (isCredit) {
            balance += amount
        } else {
            balance -= amount
        }
        accountTmp = await accountTmp.update({ balance: balance })
        try {
            var apiResposne = await transactionApi.makeTransactionApi(isCredit, amount, accountTmp.id)
            if (apiResposne.status == 200) {
                return accountTmp;
            }
        } catch (e) {
            console.log(e)
        }
    }

    return { 'status': 'no account found' }

}

exports.getAll = async () => {
    return await account.findAll()
}

