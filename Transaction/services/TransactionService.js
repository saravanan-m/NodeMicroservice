const db = require('../models')
const { v4: uuidv4 } = require('uuid')

const transaction = db.transaction

exports.create = async (data) => {
    data['uuid'] = uuidv4()
    return await transaction.create(data);
}

exports.get = async (id) => {
    return await transaction.findAll({
        where: {
            account_id: id
        }
    })
}

exports.getAll = async () => {
    return await transaction.findAll()
}

