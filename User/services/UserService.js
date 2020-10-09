const db = require('../models')
const { v4: uuidv4 } = require('uuid')
const accountApiService = require('./AccountApiService')

const user = db.user


const { Kafka } = require('kafkajs')
 
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})
 
const producer = kafka.producer() 
async function sendCreateUser(payload) {
  // Producing
  await producer.connect()
  await producer.send({
    topic: 'test-topic',
    messages: [
        { value:JSON.stringify(payload)},
    ],
  })
}

exports.create = async (data) => {
    var usertmp = {
        name: data.name,
        age: data.age,
        mapper_id: uuidv4()
    }

    usertmp = await user.create(usertmp);
    try {
        await sendCreateUser({ user_mapper_id: usertmp.mapper_id})
        return usertmp;
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

