const express = require('express')
const userService = require('../services/UserService')

const router = express.Router()

router.post('/create',async function(req,res){
    var response = await userService.create(req.body)
    res.send(response)
})

router.get('/get/:id',async function(req,res){
    var response = null
    if(req.params.id != undefined){
       response = await userService.get(req.params.id,req.query.withAccounts)
    }
    res.send(response)
})

router.get('/get-all',async function(req,res){
    var response = await userService.getAll()
    res.send(response)
})

module.exports = router