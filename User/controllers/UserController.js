const express = require('express')
const userService = require('../services/UserService')
const userValidation = require('../validation/UserValidation')
const userInputMapper = require('../mappers/UserInputMapper')

const router = express.Router()

router.post('/create', async function (req, res) {
    const { body } = req;
    try {
        await userValidation.validateUserInput(body);
    } catch (err) {
        return res.status(201).send(err);
    }
    const userDto = await userInputMapper.userToDtoMap(body)
    const response = await userService.create(userDto);

    res.status(response.code).send(response.data);
})

router.get('/get/:id', async function (req, res) {
    var response = null
    if (req.params.id != undefined) {
        response = await userService.get(req.params.id)
    }
    res.status(response.code).send(response.data)
})

router.get('/get-all', async function (req, res) {
    var response = await userService.getAll()
    res.status(response.code).send(response.data);
})

module.exports = router