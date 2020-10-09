const db = require('../models')
const transactionApi = require('./TransactionApiService')

const account = db.account
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
  })
   
const consumer = kafka.consumer({ groupId: 'test-group' })
// Consuming
consumer.connect()
consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      partition,
      offset: message.offset,
      value: message.value.toString(),
    })

    this.create(JSON.parse(message.value))
  },
})


exports.create = async (data) => {
    const accountTmp = {
        type: 'SAVINGS',
        balance: 0,
        user_mapper_id: data.user_mapper_id
    }

    var accountModel = await account.findOne({
        where: {
            user_mapper_id: data.user_mapper_id
        }
    })

    if (accountModel == null) {
        return await account.create(accountTmp);
    }

    return accountModel
}

exports.get = async (id, withTransaction) => {
    var accountTmp = await account.findOne({
        where: {
            user_mapper_id: id
        }
    })

    console.log('account' +withTransaction)

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

