const express = require('express')
const accountService = require('../services/AccountService')

const router = express.Router()

router.post('/create', async function (req, res) {
    var response = await accountService.create(req.body)
    res.send(response)
})

router.get('/get/:id', async function (req, res) {
    var response = null
    if (req.params.id != undefined) {
        console.log(req.query)
        response = await accountService.get(req.params.id, req.query.withTransaction)
    }
    res.send(response)
})

router.post('/credit', async function (req, res) {
    var response = await accountService.update(req.body.amount, true, req.body.user_mapper_id)
    res.send(response)
})

router.post('/debit', async function (req, res) {
    var response = await accountService.update(req.body.amount, false, req.body.user_mapper_id)
    res.send(response)
})

module.exports = router