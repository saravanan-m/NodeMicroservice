const express = require('express')
const transactionService = require('../services/TransactionService')

const router = express.Router()

router.post('/create', async function (req, res) {
    var response = await transactionService.create(req.body)
    res.send(response)
})

router.get('/get/:id', async function (req, res) {
    var response = null
    if (req.params.id != undefined) {
        response = await transactionService.get(req.params.id)
    }
    res.send(response)
})

module.exports = router